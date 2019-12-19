package com.cqrs.event_sourcing.events;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.axonframework.modelling.command.TargetAggregateIdentifier;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BookDeletedEvent {

    @TargetAggregateIdentifier
    private String bookId;
}
