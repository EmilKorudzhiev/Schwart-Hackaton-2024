package dev.uktcteam.hackathon.entities.products;

import dev.uktcteam.hackathon.entities.category.Category;
import dev.uktcteam.hackathon.entities.coordinates.Coordinate;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(
    name = "product",
    indexes = {
        @Index(name = "idx_is_golden", columnList = "is_golden")
    }
)
public class Product {

    @Id
    @Column(name = "product_id", nullable = false)
    private String productId;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "price", nullable = false)
    private double price;

    @Column(name = "image")
    private String image;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "coordinate_id", nullable = false)
    private Coordinate coordinate;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id", nullable = false)
    private Category category;

    @Column(name = "is_golden", nullable = false)
    private Boolean isGolden;

    public String getId() {
        return this.productId;
    }

    public boolean isGolden() {
        return this.isGolden;
    }
}