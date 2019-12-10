package com.cqrs.event_sourcing.queries;

import lombok.Data;

@Data
public class GetLibrariesQuery {
    private int pageNumber;
    private int pageSize;
}
