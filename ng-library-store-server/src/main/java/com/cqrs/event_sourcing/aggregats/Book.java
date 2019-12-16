package com.cqrs.event_sourcing.aggregats;

import com.cqrs.event_sourcing.commands.CreateBookCommand;
import com.cqrs.event_sourcing.dto.LibraryDTO;
import com.cqrs.event_sourcing.events.BookCreatedEvent;
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
        Assert.notNull(createBookCommand.getUrlPhoto(), () -> "Book photo should not be null");
        apply(new BookCreatedEvent(
                createBookCommand.getBookId(), createBookCommand.getName(), createBookCommand.getDescription(), createBookCommand.getUrlPhoto(), createBookCommand.getLibraries()
        ));
    }

    @EventSourcingHandler
    protected void on(BookCreatedEvent bookCreatedEvent) {
        this.id = bookCreatedEvent.getBookId();
        this.name = bookCreatedEvent.getName();
        this.description = bookCreatedEvent.getDescription();
        this.urlPath = bookCreatedEvent.getUrlPath();
        this.libraries = bookCreatedEvent.getLibraries();
    }
}
