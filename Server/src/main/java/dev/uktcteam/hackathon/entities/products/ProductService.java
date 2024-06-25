package dev.uktcteam.hackathon.entities.products;

import dev.uktcteam.hackathon.entities.category.Category;
import dev.uktcteam.hackathon.entities.category.CategoryRepository;
import dev.uktcteam.hackathon.entities.coordinates.Coordinate;
import dev.uktcteam.hackathon.entities.coordinates.CoordinateRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private CoordinateRepository coordinateRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    public ProductDto createProduct(ProductDto productDto) {
        Coordinate coordinate = coordinateRepository.findById(productDto.getCoordinateId())
                .orElseThrow(() -> new RuntimeException("Coordinate not found"));
         Category category = categoryRepository.findById(productDto.getCategoryId())
                .orElseThrow(() -> new EntityNotFoundException("Category not found with ID: " + productDto.getCategoryId()));

        Product product = Product.builder()
                .productId(productDto.getProductId())
                .name(productDto.getName())
                .price(productDto.getPrice())
                .image(productDto.getImage())
                .coordinate(coordinate)
                .category(category)
                .isGolden(productDto.isGolden())
                .build();

        Product savedProduct = productRepository.save(product);
        productDto.setProductId(savedProduct.getProductId());
        return productDto;
    }
    public ProductDto getProductById(Long productId) {
    Product product = productRepository.findById(productId)
            .orElseThrow(() -> new RuntimeException("Product not found"));
    return convertToDto(product);
}
private ProductDto convertToDto(Product product) {
        return ProductDto.builder()
                .productId(product.getProductId())
                .name(product.getName())
                .price(product.getPrice())
                .image(product.getImage())
                .coordinateId(product.getCoordinate().getId())
                .categoryId(product.getCategory().getId())
                .isGolden(product.isGolden())
                .build();
    }
    public Product updateProduct(Long productId, ProductDto productDto) {
        Optional<Product> optionalProduct = productRepository.findById(productId);
        if (optionalProduct.isEmpty()) {
            throw new RuntimeException("Product not found");
        }

        Coordinate coordinate = coordinateRepository.findById(productDto.getCoordinateId())
                .orElseThrow(() -> new RuntimeException("Coordinate not found"));
        Category category = categoryRepository.findById(productDto.getCategoryId())
                .orElseThrow(() -> new RuntimeException("Category not found"));

        Product productToUpdate = optionalProduct.get();
        productToUpdate.setName(productDto.getName());
        productToUpdate.setPrice(productDto.getPrice());
        productToUpdate.setImage(productDto.getImage());
        productToUpdate.setCoordinate(coordinate);
        productToUpdate.setCategory(category);
        productToUpdate.setIsGolden(productDto.isGolden());

        return productRepository.save(productToUpdate);
    }
    public void deleteProduct(Long id) {
        productRepository.deleteById(id);
    }
    public List<Product> getAllProducts() {
    return productRepository.findAll();
}
}
