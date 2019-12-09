package com.cqrs.event_sourcing.services.commands;

import com.cqrs.event_sourcing.dto.LibraryDTO;

import java.util.concurrent.CompletableFuture;

public interface LibraryCommandService {

    public CompletableFuture<String> createLibrary(LibraryDTO libraryDTO);

}


