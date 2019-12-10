package com.cqrs.event_sourcing.services.queries;

import com.cqrs.event_sourcing.entities.Library;

import java.util.List;
import java.util.concurrent.CompletableFuture;

public interface LibraryQueryService {
    public CompletableFuture<List<Library>> getAllLibraries();
}
