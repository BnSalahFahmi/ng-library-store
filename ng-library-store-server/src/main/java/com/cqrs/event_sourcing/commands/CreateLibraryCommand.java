package com.cqrs.event_sourcing.commands;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.axonframework.modelling.command.TargetAggregateIdentifier;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CreateLibraryCommand {

    @TargetAggregateIdentifier
    private String libraryId;
    private String name;
    private String address;

}
