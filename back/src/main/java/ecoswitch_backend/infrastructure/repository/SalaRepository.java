package ecoswitch_backend.infrastructure.repository;


import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import ecoswitch_backend.infrastructure.Document.Sala;

@Repository
public interface SalaRepository extends MongoRepository<Sala, String> {
}