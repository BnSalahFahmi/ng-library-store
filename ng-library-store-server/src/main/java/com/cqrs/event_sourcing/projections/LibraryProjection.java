package com.cqrs.event_sourcing.projections;

import com.cqrs.event_sourcing.dto.BookDTO;
import com.cqrs.event_sourcing.dto.LibraryDTO;
import com.cqrs.event_sourcing.entities.Library;
import com.cqrs.event_sourcing.events.LibraryCreatedEvent;
import com.cqrs.event_sourcing.events.LibraryDeletedEvent;
import com.cqrs.event_sourcing.queries.GetLibrariesQuery;
import com.cqrs.event_sourcing.repositories.LibraryRepository;
import org.axonframework.eventhandling.EventHandler;
import org.axonframework.queryhandling.QueryHandler;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.HashSet;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class LibraryProjection {

    private static final Logger logger = LoggerFactory.getLogger(LibraryProjection.class);

    private LibraryRepository libraryRepository;

    @Autowired
    public LibraryProjection(LibraryRepository libraryRepository) {
        this.libraryRepository = libraryRepository;
    }

    @EventHandler
    void on(LibraryCreatedEvent event) {
        logger.debug("About to dispatch a new command to create a new library {}", event.getLibraryId());
        Library library = new Library(event.getLibraryId(), event.getName(), event.getAddress());
        libraryRepository.save(library);
    }

    @EventHandler
    void on(LibraryDeletedEvent event) {
        logger.debug("About to dispatch a new command to delete a library {}", event.getLibraryId());
        libraryRepository.deleteById(event.getLibraryId());
    }

    @QueryHandler
    public List<LibraryDTO> on(GetLibrariesQuery query) {
        logger.debug("[Query][Libraries] Handle query: {}", query);
        List<LibraryDTO> libraries = libraryRepository.findAll().stream().map(lib -> {
            return new LibraryDTO(lib.getId(), lib.getName(), lib.getAddress(), new HashSet<>());
        }).collect(Collectors.toList());
        return libraries;
    }

}
