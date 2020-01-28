package com.cqrs.event_sourcing.events;

import com.cqrs.event_sourcing.dto.LibraryDTO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.axonframework.modelling.command.TargetAggregateIdentifier;

import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BookCreatedEvent {

    @TargetAggregateIdentifier
    private String bookId;
    private String name;
    private String description;
    private String author;
    private String urlPath;
    private Set<LibraryDTO> libraries;
}
