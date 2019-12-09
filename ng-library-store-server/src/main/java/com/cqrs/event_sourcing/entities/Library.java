package com.cqrs.event_sourcing.entities;

import lombok.*;

import javax.persistence.Entity;
import javax.persistence.Id;


@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
@EqualsAndHashCode
@Entity
public class Library {

    @Id
    private String id;
    private String name;
    private String address;
}
