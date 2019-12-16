package com.cqrs.event_sourcing.repositories;

import com.cqrs.event_sourcing.entities.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BookRepository extends JpaRepository<Book, String> {

}
