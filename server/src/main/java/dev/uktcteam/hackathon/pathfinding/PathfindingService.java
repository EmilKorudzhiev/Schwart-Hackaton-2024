package dev.uktcteam.hackathon.pathfinding;

import dev.uktcteam.hackathon.pathfinding.logic.CoordinateMatrix;
import dev.uktcteam.hackathon.pathfinding.logic.HashMapUtils;
import dev.uktcteam.hackathon.pathfinding.logic.Pair;
import dev.uktcteam.hackathon.pathfinding.logic.RouteOptimizer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.awt.*;
import java.util.*;
import java.util.List;

@Service
public class PathfindingService {

    @Autowired
    private RouteOptimizer routeOptimizer;

    @Autowired
    private CoordinateMatrix coordinateMatrix;

    public PathfindDto findPath(String[] products) {

        HashMap<Pair, Integer> shortestDistances = HashMapUtils
                .extractDistancePairHashMapFromFile("src/main/resources/algorithm-caches/shortestDistances.json");

        HashMap<Pair, Integer> productToCheckoutDistances = HashMapUtils
                .extractDistancePairHashMapFromFile("src/main/resources/algorithm-caches/productToCheckoutDistances.json");

        HashMap<String, Integer> entranceToProductsDistances = HashMapUtils
                .extractDistanceHashMapFromFile("src/main/resources/algorithm-caches/entranceToProductsDistances.json");

        HashMap<String, Integer> exitToCheckoutsDistances = HashMapUtils
                .extractDistanceHashMapFromFile("src/main/resources/algorithm-caches/exitToCheckoutsDistances.json");

        String entrance = "EN";

        String[] goldenEggs = { "P107", "P310", "P204", "P19", "P279" };

        List<String> checkouts = new ArrayList<String>(exitToCheckoutsDistances.keySet());

        String exit = "EX";

        // Find the shortest route using the nearest neighbor algorithm
        ArrayList<String> shortestRoute = routeOptimizer.findShortestRoute(entrance, exit, products, checkouts,
                shortestDistances, productToCheckoutDistances, entranceToProductsDistances, exitToCheckoutsDistances);

        // Get the shortest route path
        ArrayList<List<int[]>> shortestRoutePath = routeOptimizer.getShortestRoutePath(coordinateMatrix.extractMatrix(), shortestRoute);

        // Convert the shortest route path to an array of TwoPointPathDto objects
        TwoPointPathDto[] pathfind = new TwoPointPathDto[shortestRoutePath.size()];
        for (int i = 0; i < shortestRoutePath.size(); i++) {
            List<int[]> path = shortestRoutePath.get(i);

            // Create a new TwoPointPathDto object
            TwoPointPathDto twoPointPathDto = new TwoPointPathDto();

            // Set the start point
            PointDto startPoint = new PointDto();
            startPoint.setX(path.get(0)[0]);
            startPoint.setY(path.get(0)[1]);
            startPoint.setId(shortestRoute.get(i)); // Set the ID
            twoPointPathDto.setStart(startPoint);

            // Set the end point
            PointDto endPoint = new PointDto();
            endPoint.setX(path.get(path.size() - 1)[0]);
            endPoint.setY(path.get(path.size() - 1)[1]);
            endPoint.setId(shortestRoute.get(i + 1)); // Set the ID
            twoPointPathDto.setEnd(endPoint);

            // Set the path
            Point[] points = new Point[path.size() - 2];
            for (int j = 1; j < path.size() - 1; j++) {
                points[j - 1] = new Point(path.get(j)[0], path.get(j)[1]);
            }
            twoPointPathDto.setPath(points);

            // Add the TwoPointPathDto object to the array
            pathfind[i] = twoPointPathDto;
        }

        // Create a PathfindDto object and set the pathfind field
        PathfindDto pathfindDto = new PathfindDto();
        pathfindDto.setPathfind(pathfind);

        return pathfindDto;
    }


}