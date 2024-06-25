package dev.uktcteam.hackathon.entities.product;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ProductDto {
    private String productId;
    private String name;
    private double price;
    private String image;
    private Long coordinateId;
    private Long categoryId;
    private boolean isGolden;

    // Generated constructor by Lombok or manually defined constructor
    public ProductDto(String productId, String name, double price, String image, Long coordinateId, Long categoryId, boolean isGolden) {
        this.productId = productId;
        this.name = name;
        this.price = price;
        this.image = image;
        this.coordinateId = coordinateId;
        this.categoryId = categoryId;
        this.isGolden = isGolden;
    }
}

