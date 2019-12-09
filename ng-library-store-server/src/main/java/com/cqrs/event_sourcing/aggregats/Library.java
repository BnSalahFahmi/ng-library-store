package com.cqrs.event_sourcing.aggregats;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.axonframework.modelling.command.AggregateIdentifier;
import org.axonframework.spring.stereotype.Aggregate;

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
}
