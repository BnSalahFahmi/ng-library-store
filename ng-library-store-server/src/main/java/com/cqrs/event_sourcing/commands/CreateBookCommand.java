package com.cqrs.event_sourcing.commands;

import com.cqrs.event_sourcing.dto.LibraryDTO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.axonframework.modelling.command.TargetAggregateIdentifier;

import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CreateBookCommand {

    @TargetAggregateIdentifier
    private String bookId;
    private String name;
    private String description;
    private String urlPhoto;
    private Set<LibraryDTO> libraries;
}
