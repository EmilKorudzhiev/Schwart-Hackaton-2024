package dev.uktcteam.hackathon.entities.checkout;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class CheckoutConfig implements CommandLineRunner {

    @Autowired
    private CheckoutRepository checkoutRepository;


    @Override
    public void run(String... args) throws Exception {
        Checkout checkout = Checkout.builder()
                .name("Normal Checkout")
                .build();
        checkoutRepository.save(checkout);

        Checkout checkout2 = Checkout.builder()
                .name("Self Checkout")
                .build();
        checkoutRepository.save(checkout2);
    }
}
