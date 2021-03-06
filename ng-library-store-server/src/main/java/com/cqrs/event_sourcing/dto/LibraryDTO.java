package com.cqrs.event_sourcing.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;

import java.util.Set;

@Data
@AllArgsConstructor
@Getter
public class LibraryDTO {
    private String id;
    private String name;
    private String address;
    private Set<BookDTO> books;
}
