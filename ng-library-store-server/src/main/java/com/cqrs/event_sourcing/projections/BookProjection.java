package com.cqrs.event_sourcing.projections;

import com.cqrs.event_sourcing.entities.Book;
import com.cqrs.event_sourcing.entities.Library;
import com.cqrs.event_sourcing.events.BookCreatedEvent;
import com.cqrs.event_sourcing.repositories.BookRepository;
import com.cqrs.event_sourcing.repositories.LibraryRepository;
import org.axonframework.eventhandling.EventHandler;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.HashSet;
import java.util.Set;

@Component
public class BookProjection {

    private static final Logger logger = LoggerFactory.getLogger(BookProjection.class);

    private BookRepository bookRepository;
    private LibraryRepository libraryRepository;


    @Autowired
    public BookProjection(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }

    @EventHandler
    void on(BookCreatedEvent event) {
        logger.debug("About to dispatch a new command to create a new book {}", event.getBookId());
        Book book = new Book(event.getBookId(), event.getName(), event.getDescription(), event.getUrlPath(), new HashSet<>());
        Set<Library> libraries = new HashSet<Library>();
        event.getLibraries().stream().forEach(library-> {
            Library lib = new Library(library.getId(), library.getName(), library.getAddress(), new HashSet<>());
            lib.getBooks().add(book);
            libraries.add(lib);
        });
        book.setLibraries(libraries);
        bookRepository.save(book);
    }
}
