package com.cqrs.event_sourcing.services.queries;

import com.cqrs.event_sourcing.dto.BookDTO;
import com.cqrs.event_sourcing.queries.GetBooksQuery;
import org.axonframework.messaging.responsetypes.ResponseTypes;
import org.axonframework.queryhandling.QueryGateway;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.concurrent.CompletableFuture;

@Service
public class BookQueryServiceImpl implements BookQueryService {

    private final QueryGateway queryGateway;

    public BookQueryServiceImpl(QueryGateway queryGateway) {
        this.queryGateway = queryGateway;
    }

    @Override
    public CompletableFuture<List<BookDTO>> getAllBooks() {
        return queryGateway.query(new GetBooksQuery(), ResponseTypes.multipleInstancesOf(BookDTO.class));
    }
}
