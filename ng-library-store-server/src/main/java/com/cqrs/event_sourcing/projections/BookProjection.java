package com.cqrs.event_sourcing.projections;

import com.cqrs.event_sourcing.dto.BookDTO;
import com.cqrs.event_sourcing.entities.Book;
import com.cqrs.event_sourcing.entities.Library;
import com.cqrs.event_sourcing.events.BookCreatedEvent;
import com.cqrs.event_sourcing.events.BookDeletedEvent;
import com.cqrs.event_sourcing.queries.GetBooksQuery;
import com.cqrs.event_sourcing.repositories.BookRepository;
import com.cqrs.event_sourcing.repositories.LibraryRepository;
import org.axonframework.eventhandling.EventHandler;
import org.axonframework.queryhandling.QueryHandler;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Component
public class BookProjection {

    private static final Logger logger = LoggerFactory.getLogger(BookProjection.class);

    private BookRepository bookRepository;
    private LibraryRepository libraryRepository;

    @Autowired
    public BookProjection(BookRepository bookRepository, LibraryRepository libraryRepository) {
        this.bookRepository = bookRepository;
        this.libraryRepository = libraryRepository;
    }

    @EventHandler
    void on(BookCreatedEvent event) {
        logger.debug("About to dispatch a new command to create a new book {}", event.getBookId());
        Book book = new Book(event.getBookId(), event.getName(), event.getDescription(), event.getUrlPath());
        event.getLibraries().stream().forEach(library-> {
            Library lib = new Library(library.getId(), library.getName(), library.getAddress());
            libraryRepository.save(new Library(lib.getId(), lib.getName(),lib.getAddress(), book));
        });
        bookRepository.save(book);
    }

    @EventHandler
    void on(BookDeletedEvent event) {
        logger.debug("About to dispatch a new command to delete a book {}", event.getBookId());
        Optional<Book> book = bookRepository.findById(event.getBookId());
        if(book.isPresent()) {
            for(Library library: book.get().getLibraries()) {
                library.getBooks().removeIf(b -> event.getBookId().equals(b.getId()));
                libraryRepository.saveAndFlush(library);
            }
            bookRepository.deleteById(event.getBookId());
        }
    }

    @QueryHandler
    public List<BookDTO> on(GetBooksQuery query){
        logger.debug("[Query][Books] Handle query: {}", query);
        List <BookDTO> books = bookRepository.findAll().stream().map(book -> {
            return new BookDTO(book.getId(), book.getName(), book.getDescription(), book.getUrlPhoto(), new HashSet<>());
        }).collect(Collectors.toList());
        return books;
    }
}
