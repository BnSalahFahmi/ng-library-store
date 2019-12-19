package com.cqrs.event_sourcing.controllers.queries;

import com.cqrs.event_sourcing.dto.LibraryDTO;
import com.cqrs.event_sourcing.entities.Library;
import com.cqrs.event_sourcing.services.queries.LibraryQueryService;
import io.swagger.annotations.Api;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.concurrent.CompletableFuture;

@RestController
@RequestMapping(value = "/libraries")
@CrossOrigin(origins = "*")
@Api(value = "Library Queries", description = "Library Query Events Endpoint", tags = "Library Queries")
public class LibraryQueryController {

    private final LibraryQueryService libraryQueryService;

    public LibraryQueryController(LibraryQueryService libraryQueryService) {
        this.libraryQueryService = libraryQueryService;
    }

    @GetMapping("")
    public CompletableFuture<List<LibraryDTO>> fetchLibraries() {
        return this.libraryQueryService.getAllLibraries();
    }
}
