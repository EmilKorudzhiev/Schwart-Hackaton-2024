package dev.uktcteam.hackathon.entities.products;

import dev.uktcteam.hackathon.entities.category.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findByName(String name);
    List<Product> findByCategoryId(Long categoryId);
    List<Product> findByIsGolden(boolean isGolden);
}
