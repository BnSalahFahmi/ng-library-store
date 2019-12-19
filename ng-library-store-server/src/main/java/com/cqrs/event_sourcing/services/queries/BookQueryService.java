package com.cqrs.event_sourcing.services.queries;

import com.cqrs.event_sourcing.dto.BookDTO;

import java.util.List;
import java.util.concurrent.CompletableFuture;

public interface BookQueryService {

    CompletableFuture<List<BookDTO>> getAllBooks();
}
