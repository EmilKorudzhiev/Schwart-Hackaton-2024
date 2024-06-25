package dev.uktcteam.hackathon.entities.checkouts;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CheckoutRepository extends JpaRepository<Checkout, String> {
    // Add custom query methods if needed
}
