package dev.uktcteam.hackathon.entities.checkouts;

import dev.uktcteam.hackathon.entities.coordinates.Coordinate;
import dev.uktcteam.hackathon.entities.coordinates.CoordinateRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CheckoutService {

    private final CheckoutRepository checkoutRepository;
    private final CoordinateRepository coordinateRepository;

    @Autowired
    public CheckoutService(CheckoutRepository checkoutRepository, CoordinateRepository coordinateRepository) {
        this.checkoutRepository = checkoutRepository;
        this.coordinateRepository = coordinateRepository;
    }

    public Checkout createCheckout(String checkoutId, Long coordinateId) {
        Coordinate coordinate = coordinateRepository.findById(coordinateId)
                .orElseThrow(() -> new RuntimeException("Coordinate not found"));

        Checkout checkout = Checkout.builder()
                .checkoutId(checkoutId)
                .coordinate(coordinate)
                .build();

        return checkoutRepository.save(checkout);
    }

    // Add more methods as per your application's requirements
}
