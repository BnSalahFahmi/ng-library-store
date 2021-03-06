package com.cqrs.event_sourcing.repositories;

import com.cqrs.event_sourcing.entities.Library;
import org.springframework.data.jpa.repository.JpaRepository;


public interface LibraryRepository extends JpaRepository<Library, String> {

}
