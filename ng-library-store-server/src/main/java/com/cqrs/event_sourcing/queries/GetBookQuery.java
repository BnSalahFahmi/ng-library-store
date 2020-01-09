package com.cqrs.event_sourcing.queries;

import lombok.Data;
import lombok.Getter;

@Data
@Getter
public class GetBookQuery {
    private String bookId;
}
