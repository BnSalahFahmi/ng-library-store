package com.cqrs.event_sourcing.entities;

import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Data
@NoArgsConstructor
@Entity
@Getter
public class Book {

    @Id
    @Column(name = "book_id")
    private String id;
    private String name;
    private String description;
    private String author;
    private String urlPhoto;

    @ManyToMany(mappedBy = "books")
    private Set<Library> libraries = new HashSet<>();

    public Book(String id, String name, String description, String author, String urlPhoto) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.author = author;
        this.urlPhoto = urlPhoto;
    }
}
