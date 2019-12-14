package com.cqrs.event_sourcing.aggregats;

import com.cqrs.event_sourcing.commands.CreateLibraryCommand;
import com.cqrs.event_sourcing.commands.DeleteLibraryCommand;
import com.cqrs.event_sourcing.events.LibraryCreatedEvent;
import com.cqrs.event_sourcing.events.LibraryDeletedEvent;
import lombok.AllArgsConstructor;
import lombok.Getter;
import org.axonframework.commandhandling.CommandHandler;
import org.axonframework.common.Assert;
import org.axonframework.eventsourcing.EventSourcingHandler;
import org.axonframework.modelling.command.AggregateIdentifier;
import org.axonframework.spring.stereotype.Aggregate;

import static org.axonframework.modelling.command.AggregateLifecycle.apply;

@AllArgsConstructor
@Getter
@Aggregate
public class Library {

    @AggregateIdentifier
    private String id;
    private String name;
    private String address;

    @SuppressWarnings("UnusedDeclaration")
    private Library() {
        // Required by Axon Framework
    }

    @CommandHandler
    public Library(CreateLibraryCommand createLibraryCommand) {
        Assert.notNull(createLibraryCommand.getName(), () -> "Library name should not be null");
        Assert.notNull(createLibraryCommand.getAddress(), () -> "Library address should not be null");
        apply(new LibraryCreatedEvent(
                createLibraryCommand.getLibraryId(), createLibraryCommand.getName(), createLibraryCommand.getAddress()
        ));
    }

    @CommandHandler
    public void handle(DeleteLibraryCommand deleteLibraryCommand) {
        Assert.notNull(deleteLibraryCommand.getLibraryId(), () -> "Library Id should not be null");
        apply(new LibraryDeletedEvent(
                deleteLibraryCommand.getLibraryId()
        ));
    }


    @EventSourcingHandler
    protected void on(LibraryCreatedEvent libraryCreatedEvent) {
        this.id = libraryCreatedEvent.getLibraryId();
        this.name = libraryCreatedEvent.getName();
    }

    @EventSourcingHandler
    protected void on(LibraryDeletedEvent libraryDeletedEvent) {
        this.id = libraryDeletedEvent.getLibraryId();
    }
}
