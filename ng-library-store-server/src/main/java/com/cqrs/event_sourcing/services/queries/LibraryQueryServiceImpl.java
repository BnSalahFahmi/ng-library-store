package com.cqrs.event_sourcing.services.queries;

import com.cqrs.event_sourcing.entities.Library;
import com.cqrs.event_sourcing.queries.GetLibrariesQuery;
import org.axonframework.messaging.responsetypes.ResponseTypes;
import org.axonframework.queryhandling.QueryGateway;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.concurrent.CompletableFuture;

@Service
public class LibraryQueryServiceImpl implements LibraryQueryService {

    private final QueryGateway queryGateway;

    public LibraryQueryServiceImpl(QueryGateway queryGateway) {
        this.queryGateway = queryGateway;
    }


    @Override
    public CompletableFuture<List<Library>> getAllLibraries() {
        return queryGateway.query(new GetLibrariesQuery(), ResponseTypes.multipleInstancesOf(Library.class));
    }
}
