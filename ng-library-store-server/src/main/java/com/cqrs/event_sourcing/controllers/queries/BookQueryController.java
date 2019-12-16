package com.cqrs.event_sourcing.controllers.queries;

import com.cqrs.event_sourcing.entities.Book;
import com.cqrs.event_sourcing.entities.Library;
import com.cqrs.event_sourcing.services.queries.BookQueryService;
import com.cqrs.event_sourcing.services.queries.LibraryQueryService;
import io.swagger.annotations.Api;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.concurrent.CompletableFuture;

@RestController
@RequestMapping(value = "/books")
@CrossOrigin(origins = "*")
@Api(value = "Book Queries", description = "Book Query Events Endpoint", tags = "Book Queries")
public class BookQueryController {

    private final BookQueryService bookQueryService;

    public BookQueryController(BookQueryService bookQueryService) {
        this.bookQueryService = bookQueryService;
    }

    @GetMapping("")
    public CompletableFuture<List<Book>> fetchLibraries() {
        return this.bookQueryService.getAllBooks();
    }
}
