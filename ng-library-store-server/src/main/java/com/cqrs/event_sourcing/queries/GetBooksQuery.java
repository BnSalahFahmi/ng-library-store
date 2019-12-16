package com.cqrs.event_sourcing.queries;

import lombok.Data;

@Data
public class GetBooksQuery {
    private int pageNumber;
    private int pageSize;
}
