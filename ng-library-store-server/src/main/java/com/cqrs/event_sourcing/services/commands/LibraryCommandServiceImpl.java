package com.cqrs.event_sourcing.services.commands;

import com.cqrs.event_sourcing.commands.CreateLibraryCommand;
import com.cqrs.event_sourcing.dto.LibraryDTO;
import org.axonframework.commandhandling.gateway.CommandGateway;
import org.springframework.stereotype.Service;

import java.util.UUID;
import java.util.concurrent.CompletableFuture;

@Service
public class LibraryCommandServiceImpl implements LibraryCommandService {

    private final CommandGateway commandGateway;

    public LibraryCommandServiceImpl(CommandGateway commandGateway) {
        this.commandGateway = commandGateway;
    }

    @Override
    public CompletableFuture<String> createLibrary(LibraryDTO libraryDTO) {
        CreateLibraryCommand command = new CreateLibraryCommand(UUID.randomUUID().toString(), libraryDTO.getName(), libraryDTO.getAddress());
        return commandGateway.send(command);
    }
}
