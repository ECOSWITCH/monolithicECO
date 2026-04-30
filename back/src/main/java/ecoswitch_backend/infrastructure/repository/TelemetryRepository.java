package ecoswitch_backend.infrastructure.repository;


import org.springframework.data.mongodb.repository.MongoRepository;

import ecoswitch_backend.infrastructure.Document.Telemetry;

public interface TelemetryRepository extends MongoRepository<Telemetry, String> {
}