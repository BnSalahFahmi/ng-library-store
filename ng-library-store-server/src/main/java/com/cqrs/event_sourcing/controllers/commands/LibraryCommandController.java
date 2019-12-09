package com.cqrs.event_sourcing.controllers.commands;

import com.cqrs.event_sourcing.dto.LibraryDTO;
import com.cqrs.event_sourcing.services.commands.LibraryCommandService;
import io.swagger.annotations.Api;
import org.springframework.web.bind.annotation.*;

import java.util.concurrent.CompletableFuture;

@RestController
@RequestMapping(value = "/libraries")
@CrossOrigin(origins = "*")
@Api(value = "Library Commands", description = "Library Commands Related Endpoints", tags = "Library Commands")
public class LibraryCommandController {

    private final LibraryCommandService libraryCommandService;

    public LibraryCommandController(LibraryCommandService libraryCommandService) {
        this.libraryCommandService = libraryCommandService;
    }

    @PostMapping
    public CompletableFuture<String> createLibrary(@RequestBody LibraryDTO libraryDTO){
        return libraryCommandService.createLibrary(libraryDTO);
    }

}
