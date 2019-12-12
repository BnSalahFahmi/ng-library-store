package com.cqrs.event_sourcing.providers;

import java.util.UUID;

public class RandomIdProvider {

    public static UUID generateRandomUUID() {
        return UUID.randomUUID();
    }
}
