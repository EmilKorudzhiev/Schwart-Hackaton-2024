package dev.uktcteam.hackathon.entities.coordinates;

import dev.uktcteam.hackathon.entities.coordinates.Coordinate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CoordinateRepository extends JpaRepository<Coordinate, Long> {
    // You can add custom query methods here if needed
}
