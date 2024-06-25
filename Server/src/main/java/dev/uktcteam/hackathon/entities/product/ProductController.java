//package dev.uktcteam.hackathon.entities.product;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.List;
//
//@RestController
//@RequestMapping("/api/ж1/products")
//public class ProductController {
//
//    private final ProductService productService;
//
//    @Autowired
//    public ProductController(ProductService productService) {
//        this.productService = productService;
//    }
//
//    @GetMapping
//    public ResponseEntity<List<Product>> getAllProducts() {
//        List<Product> products = productService.getAllProducts();
//        return ResponseEntity.ok(products);
//    }
//
//    @PostMapping
//    public ResponseEntity<ProductDto> createProduct(@RequestBody ProductDto productDto) {
//        ProductDto createdProduct = productService.createProduct(productDto);
//        return ResponseEntity.status(HttpStatus.CREATED).body(createdProduct);
//    }
//
//    @PutMapping("/{productId}")
//    public ResponseEntity<Product> updateProduct(@PathVariable Long productId, @RequestBody ProductDto productDto) {
//        Product updatedProduct = productService.updateProduct(productId, productDto);
//        return ResponseEntity.ok(updatedProduct);
//    }
//
//    @DeleteMapping("/{productId}")
//    public ResponseEntity<Void> deleteProduct(@PathVariable Long productId) {
//        productService.deleteProduct(productId);
//        return ResponseEntity.noContent().build();
//    }
//
//    // Add more endpoints as per your application's requirements
//
//}