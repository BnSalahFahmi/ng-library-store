package com.cqrs.event_sourcing.events;

import com.cqrs.event_sourcing.dto.BookDTO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.axonframework.modelling.command.TargetAggregateIdentifier;

import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class LibraryCreatedEvent {

    @TargetAggregateIdentifier
    private String libraryId;
    private String name;
    private String address;
    private Set<BookDTO> books;
}
