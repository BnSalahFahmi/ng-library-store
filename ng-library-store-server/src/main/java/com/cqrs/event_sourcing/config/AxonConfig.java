/*package com.cqrs.event_sourcing.config;

import com.cqrs.event_sourcing.aggregats.Library;
import org.axonframework.commandhandling.CommandBus;
import org.axonframework.eventsourcing.EventSourcingRepository;
import org.axonframework.eventsourcing.eventstore.EventStorageEngine;
import org.axonframework.eventsourcing.eventstore.EventStore;
import org.axonframework.eventsourcing.eventstore.inmemory.InMemoryEventStorageEngine;
import org.axonframework.modelling.command.AggregateAnnotationCommandHandler;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class AxonConfig {

    @Bean
    public EventStorageEngine eventStorageEngine(){
        return new InMemoryEventStorageEngine();
    }

    @Bean
    public EventSourcingRepository<Library> taskRepository(EventStore eventStore) {
        return EventSourcingRepository.builder(Library.class).eventStore(eventStore).build();
    }

    @Bean
    public AggregateAnnotationCommandHandler<Library> taskCommandHandler(CommandBus commandBus, EventSourcingRepository<Library> libraryRepository) {
        AggregateAnnotationCommandHandler<Library> libraryCommandHandler = AggregateAnnotationCommandHandler.builder().repository(libraryRepository).build();
        libraryCommandHandler.subscribe(commandBus);
        return libraryCommandHandler;
    }

}*/
