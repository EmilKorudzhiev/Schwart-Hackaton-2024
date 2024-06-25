package dev.uktcteam.hackathon.entities.coordinates;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CoordinateService {

    private final CoordinateRepository coordinateRepository;

    @Autowired
    public CoordinateService(CoordinateRepository coordinateRepository) {
        this.coordinateRepository = coordinateRepository;
    }

    public List<Coordinate> getAllCoordinates() {
        return coordinateRepository.findAll();
    }

    public Coordinate saveCoordinate(Coordinate coordinate) {
        return coordinateRepository.save(coordinate);
    }

    public void deleteCoordinate(Long id) {
        coordinateRepository.deleteById(id);
    }

    // Add more methods as per your application's requirements
}
