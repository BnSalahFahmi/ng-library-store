package com.cqrs.event_sourcing.entities;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.Stream;


@Data
@NoArgsConstructor
@EqualsAndHashCode(exclude = "books")
@Entity
public class Library {

    @Id
    @Column(name = "library_id")
    private String id;
    private String name;
    private String address;

    @ManyToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinTable(
            name = "Library_Book",
            joinColumns = {@JoinColumn(name = "library_id")},
            inverseJoinColumns = {@JoinColumn(name = "book_id")}
    )
    private Set<Book> books;

    public Library(String id, String name, String address, Book... books) {
        this.id = id;
        this.name = name;
        this.address = address;
        this.books = Stream.of(books).collect(Collectors.toSet());
        this.books.forEach(x -> x.getLibraries().add(this));
    }
}
