package com.cqrs.event_sourcing.dto;

import lombok.Data;
import lombok.Getter;

@Data
@Getter
public class LibraryDTO {
    private String id;
    private String name;
    private String address;
}
