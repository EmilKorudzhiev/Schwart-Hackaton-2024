package dev.uktcteam.hackathon.entities.product;

import dev.uktcteam.hackathon.entities.category.Category;
import dev.uktcteam.hackathon.entities.category.CategoryRepository;
import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVRecord;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import java.io.FileReader;
import java.io.Reader;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Component
@Order(1)
public class ProductsConfig implements CommandLineRunner {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Override
    public void run(String... args) throws Exception {
        List<Product> products = readProductsFromCsv("src/main/resources/csv-data/updated_product_master_data.csv");
        saveProductsToDatabase(products);
    }

    private List<Product> readProductsFromCsv(String fileName) throws Exception {
        List<Product> products = new ArrayList<>();
        Reader in = new FileReader(fileName);
        Iterable<CSVRecord> records = CSVFormat.DEFAULT
                .withHeader("product_id", "product_category", "product_name", "price")
                .withFirstRecordAsHeader() // This line ensures the first record is used as the header
                .parse(in);
        for (CSVRecord record : records) {
            Product product = new Product();
            product.setName(record.get("product_name"));

            Category category = new Category();
            category.setName(record.get("product_category"));
            product.setCategory(category);
            product.setIsGolden(false);

            // Remove the starting 'P' from the product ID
            String productId = record.get("product_id").substring(1);
            if (!productId.isEmpty()) {
                product.setId(Long.parseLong(productId));
            } else {
                product.setId(null);
            }

            try {
                product.setPrice(Double.parseDouble(record.get("price")));
            } catch (NumberFormatException e) {
                // Handle the exception
                // For example, set a default price or skip the current record
                product.setPrice(0.0);
            }

            products.add(product);
        }
        return products;
    }

    private void saveProductsToDatabase(List<Product> products) {
        Set<Category> uniqueCategories = new HashSet<>();
        for (Product product : products) {
            uniqueCategories.add(product.getCategory());
        }

        for (Category category : uniqueCategories) {
            categoryRepository.save(category);
        }

        for (Product product : products) {
            Category category = categoryRepository.findByName(product.getCategory().getName());
            product.setCategory(category);
            productRepository.save(product);
        }
    }
}