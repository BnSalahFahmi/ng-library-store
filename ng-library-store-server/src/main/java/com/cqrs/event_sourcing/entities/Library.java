package com.cqrs.event_sourcing.entities;

import lombok.*;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;


@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
public class Library {

    @Id
    @Column(name = "library_id")
    private String id;
    private String name;
    private String address;

    @ManyToMany(cascade = { CascadeType.ALL })
    @JoinTable(
            name = "Library_Book",
            joinColumns = { @JoinColumn(name = "library_id") },
            inverseJoinColumns = { @JoinColumn(name = "book_id") }
    )
    private Set<Book> books = new HashSet<>();
}
