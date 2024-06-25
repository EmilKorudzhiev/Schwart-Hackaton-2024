package dev.uktcteam.hackathon.entities.coordinates;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/coordinates")
public class CoordinateController {

    private final CoordinateService coordinateService;

    @Autowired
    public CoordinateController(CoordinateService coordinateService) {
        this.coordinateService = coordinateService;
    }

    @GetMapping
    public ResponseEntity<List<Coordinate>> getAllCoordinates() {
        List<Coordinate> coordinates = coordinateService.getAllCoordinates();
        return ResponseEntity.ok(coordinates);
    }

    @PostMapping
    public ResponseEntity<Coordinate> createCoordinate(@RequestBody Coordinate coordinate) {
        Coordinate createdCoordinate = coordinateService.saveCoordinate(coordinate);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdCoordinate);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCoordinate(@PathVariable("id") Long id) {
        coordinateService.deleteCoordinate(id);
        return ResponseEntity.noContent().build();
    }

    // Add more CRUD endpoints (PUT, GET by ID, etc.) as needed
}
