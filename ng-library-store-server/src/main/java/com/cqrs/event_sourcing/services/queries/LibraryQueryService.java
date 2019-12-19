package com.cqrs.event_sourcing.services.queries;

import com.cqrs.event_sourcing.dto.LibraryDTO;

import java.util.List;
import java.util.concurrent.CompletableFuture;

public interface LibraryQueryService {
    CompletableFuture<List<LibraryDTO>> getAllLibraries();
}
