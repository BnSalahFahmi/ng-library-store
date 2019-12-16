package com.cqrs.event_sourcing.services.commands;

import com.cqrs.event_sourcing.dto.BookDTO;

import java.util.concurrent.CompletableFuture;

public interface BookCommandService {

    public CompletableFuture<String> createBook(BookDTO bookDTO);
}
