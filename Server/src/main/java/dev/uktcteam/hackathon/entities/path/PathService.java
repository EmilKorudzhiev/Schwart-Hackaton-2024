//package dev.uktcteam.hackathon.entities.path;
//
//import dev.uktcteam.hackathon.entities.itemcoordinate.ItemCoordinateDto;
//import dev.uktcteam.hackathon.entities.product.Product;
//import dev.uktcteam.hackathon.entities.product.ProductRepository;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//
//import java.util.ArrayList;
//import java.util.List;
//
//@Service
//public class PathService {
//
//    private final ProductRepository productRepository;
//
//    @Autowired
//    public PathService(ProductRepository productRepository) {
//        this.productRepository = productRepository;
//    }
//
//    public PathResponse getOptimalPathResponse(List<Long> productIds) {
//        List<PathItemDto> pathItems = new ArrayList<>();
//
//        for (int i = 0; i < productIds.size() - 1; i++) {
//            Product startProduct = productRepository.findById(productIds.get(i)).orElseThrow(() -> new RuntimeException("Product not found"));
//            Product endProduct = productRepository.findById(productIds.get(i + 1)).orElseThrow(() -> new RuntimeException("Product not found"));
//
//            ItemCoordinateDto startCoordinate = new ItemCoordinateDto(
//                    startProduct.getId(),
//                    startProduct.getItemCoordinates().get(i).getX(),
//                    startProduct.getItemCoordinates().get(i).getX(),
//
//            );
//
//            ItemCoordinateDto endCoordinate = new ItemCoordinateDto(
//                    endProduct.getProductId(),
//                    endProduct.getCoordinate().getX(),
//                    endProduct.getCoordinate().getY()
//            );
//
//            // Create a list of intermediate path coordinates (for example purposes)
//            List<ItemCoordinateDto> path = new ArrayList<>();
//            path.add(new ItemCoordinateDto(null, (startProduct.getCoordinate().getX() + endProduct.getCoordinate().getX()) / 2 - 5, (startProduct.getCoordinate().getY() + endProduct.getCoordinate().getY()) / 2 - 5));
//            path.add(new ItemCoordinateDto(null, (startProduct.getCoordinate().getX() + endProduct.getCoordinate().getX()) / 2 + 5, (startProduct.getCoordinate().getY() + endProduct.getCoordinate().getY()) / 2 + 5));
//
//            PathItemDto pathItem = new PathItemDto(startCoordinate, path, endCoordinate);
//            pathItems.add(pathItem);
//        }
//
//        return new PathResponse(pathItems);
//    }
//}
