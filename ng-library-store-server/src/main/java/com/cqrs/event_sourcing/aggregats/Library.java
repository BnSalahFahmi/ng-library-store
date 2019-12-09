package com.cqrs.event_sourcing.aggregats;

import com.cqrs.event_sourcing.commands.CreateLibraryCommand;
import com.cqrs.event_sourcing.events.LibraryCreatedEvent;
import lombok.AllArgsConstructor;
import lombok.Getter;
import org.axonframework.commandhandling.CommandHandler;
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
        apply(new LibraryCreatedEvent(
                createLibraryCommand.getLibraryId(), createLibraryCommand.getName(), createLibraryCommand.getAddress()
        ));
    }

    @EventSourcingHandler
    protected void on(LibraryCreatedEvent libraryCreatedEvent) {
        this.id = libraryCreatedEvent.getLibraryId();
        this.name = libraryCreatedEvent.getName();
    }
}
