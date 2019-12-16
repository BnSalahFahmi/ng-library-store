package com.cqrs.event_sourcing.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;

import java.util.Set;

@Data
@AllArgsConstructor
@Getter
public class BookDTO {
    private String id;
    private String name;
    private String description;
    private String urlPhoto;
    private Set<LibraryDTO> libraries;
}
