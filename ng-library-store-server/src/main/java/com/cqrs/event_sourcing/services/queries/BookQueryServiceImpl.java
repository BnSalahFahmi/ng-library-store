package com.cqrs.event_sourcing.services.queries;

import com.cqrs.event_sourcing.entities.Book;
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
    public CompletableFuture<List<Book>> getAllBooks() {
        return queryGateway.query(new GetBooksQuery(), ResponseTypes.multipleInstancesOf(Book.class));
    }
}
