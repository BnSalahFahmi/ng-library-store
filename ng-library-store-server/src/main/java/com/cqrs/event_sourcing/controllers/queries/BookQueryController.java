package com.cqrs.event_sourcing.controllers.queries;

import com.cqrs.event_sourcing.dto.BookDTO;
import com.cqrs.event_sourcing.entities.Book;
import com.cqrs.event_sourcing.entities.Library;
import com.cqrs.event_sourcing.services.queries.BookQueryService;
import com.cqrs.event_sourcing.services.queries.LibraryQueryService;
import io.swagger.annotations.Api;
import org.springframework.web.bind.annotation.*;

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
    public CompletableFuture<List<BookDTO>> fetchBooks() {
        return this.bookQueryService.getAllBooks();
    }

    @GetMapping("/{id}")
    public CompletableFuture<BookDTO> getBook(@PathVariable String id) { return this.bookQueryService.getBook(id); }
}
