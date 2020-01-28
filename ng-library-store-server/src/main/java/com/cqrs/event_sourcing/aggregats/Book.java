package com.cqrs.event_sourcing.aggregats;

import com.cqrs.event_sourcing.commands.CreateBookCommand;
import com.cqrs.event_sourcing.commands.DeleteBookCommand;
import com.cqrs.event_sourcing.dto.LibraryDTO;
import com.cqrs.event_sourcing.events.BookCreatedEvent;
import com.cqrs.event_sourcing.events.BookDeletedEvent;
import com.cqrs.event_sourcing.events.LibraryDeletedEvent;
import lombok.AllArgsConstructor;
import lombok.Getter;
import org.axonframework.commandhandling.CommandHandler;
import org.axonframework.common.Assert;
import org.axonframework.eventsourcing.EventSourcingHandler;
import org.axonframework.modelling.command.AggregateIdentifier;
import org.axonframework.spring.stereotype.Aggregate;

import java.util.Set;

import static org.axonframework.modelling.command.AggregateLifecycle.apply;

@AllArgsConstructor
@Getter
@Aggregate
public class Book {

    @AggregateIdentifier
    private String id;
    private String name;
    private String description;
    private String author;
    private String urlPath;
    private Set<LibraryDTO> libraries;

    @SuppressWarnings("UnusedDeclaration")
    private Book() {
        // Required by Axon Framework
    }

    @CommandHandler
    public Book(CreateBookCommand createBookCommand) {
        Assert.notNull(createBookCommand.getName(), () -> "Book name should not be null");
        Assert.notNull(createBookCommand.getDescription(), () -> "Book description should not be null");
        Assert.notNull(createBookCommand.getAuthor(), () -> "Book author should be not null");
        Assert.notNull(createBookCommand.getUrlPhoto(), () -> "Book photo should not be null");
        apply(new BookCreatedEvent(
                createBookCommand.getBookId(), createBookCommand.getName(), createBookCommand.getDescription(), createBookCommand.getAuthor(), createBookCommand.getUrlPhoto(), createBookCommand.getLibraries()
        ));
    }

    @CommandHandler
    public void handle(DeleteBookCommand deleteBookCommand) {
        Assert.notNull(deleteBookCommand.getBookId(), () -> "Book Id should not be null");
        apply(new BookDeletedEvent(
                deleteBookCommand.getBookId()
        ));
    }


    @EventSourcingHandler
    protected void on(BookCreatedEvent bookCreatedEvent) {
        this.id = bookCreatedEvent.getBookId();
        this.name = bookCreatedEvent.getName();
        this.description = bookCreatedEvent.getDescription();
        this.author = bookCreatedEvent.getAuthor();
        this.urlPath = bookCreatedEvent.getUrlPath();
        this.libraries = bookCreatedEvent.getLibraries();
    }

    @EventSourcingHandler
    protected void on(BookDeletedEvent bookDeletedEvent) {
        this.id = bookDeletedEvent.getBookId();
    }

}
