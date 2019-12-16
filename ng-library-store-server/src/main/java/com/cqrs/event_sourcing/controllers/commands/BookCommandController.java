package com.cqrs.event_sourcing.controllers.commands;

import com.cqrs.event_sourcing.dto.BookDTO;
import com.cqrs.event_sourcing.services.commands.BookCommandService;
import io.swagger.annotations.Api;
import org.springframework.web.bind.annotation.*;

import java.util.concurrent.CompletableFuture;

@RestController
@RequestMapping(value = "/books")
@CrossOrigin(origins = "*")
@Api(value = "Book Commands", description = "Book Commands Related Endpoints", tags = "Book Commands")
public class BookCommandController {

    private final BookCommandService bookCommandService;

    public BookCommandController(BookCommandService bookCommandService) {
        this.bookCommandService = bookCommandService;
    }

    @PostMapping
    public CompletableFuture<String> createBook(@RequestBody BookDTO bookDTO){
        return bookCommandService.createBook(bookDTO);
    }
}
