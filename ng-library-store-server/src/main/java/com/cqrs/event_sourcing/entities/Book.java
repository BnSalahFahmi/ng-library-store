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
public class Book {

    @Id
    @Column(name = "book_id")
    private String id;
    private String name;
    private String description;
    private String urlPhoto;

    @ManyToMany(fetch = FetchType.LAZY,
            cascade = {
                    CascadeType.PERSIST,
                    CascadeType.MERGE
            },
            mappedBy = "books")
    private Set<Library> libraries = new HashSet<>();
}
