package com.cqrs.event_sourcing.services.queries;

import com.cqrs.event_sourcing.entities.Book;

import java.util.List;
import java.util.concurrent.CompletableFuture;

public interface BookQueryService {

    public CompletableFuture<List<Book>> getAllBooks();
}
