package com.cqrs.event_sourcing.services.commands;

import com.cqrs.event_sourcing.commands.CreateBookCommand;
import com.cqrs.event_sourcing.commands.DeleteBookCommand;
import com.cqrs.event_sourcing.dto.BookDTO;
import com.cqrs.event_sourcing.providers.RandomIdProvider;
import org.axonframework.commandhandling.gateway.CommandGateway;
import org.springframework.stereotype.Service;

import java.util.concurrent.CompletableFuture;

@Service
public class BookCommandServiceImpl implements BookCommandService {

    private final CommandGateway commandGateway;

    public BookCommandServiceImpl(CommandGateway commandGateway) {
        this.commandGateway = commandGateway;
    }

    @Override
    public CompletableFuture<String> createBook(BookDTO bookDTO) {
        CreateBookCommand command = new CreateBookCommand(RandomIdProvider.generateRandomUUID().toString(), bookDTO.getName(), bookDTO.getDescription(), bookDTO.getAuthor(), bookDTO.getUrlPhoto(), bookDTO.getLibraries());
        return commandGateway.send(command);
    }

    @Override
    public CompletableFuture<String> deleteBook(String bookId) {
        DeleteBookCommand command = new DeleteBookCommand(bookId);
        return commandGateway.send(command);
    }
}
