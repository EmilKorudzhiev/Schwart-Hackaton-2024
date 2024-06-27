package dev.uktcteam.hackathon.pathfinding.logic;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class RouteOptimizer {

    private final CoordinateMatrix coordinateMatrix;

    @Autowired
    public RouteOptimizer(CoordinateMatrix coordinateMatrix) {
        this.coordinateMatrix = coordinateMatrix;
    }

    //Presmqta kolko e obshata duljina na edin marshryt ot nachalo do krai
    public int calculateRouteDistance(ArrayList<String> route,
            HashMap<Pair, Integer> shortestDistances,
            HashMap<Pair, Integer> productToCheckoutDistances,
            HashMap<String, Integer> entranceToProductsDistances,
            HashMap<String, Integer> exitToCheckoutsDistances) {
        int totalDistance = 0;

        // Distance from entrance to first product/golden egg
        totalDistance += entranceToProductsDistances.get(route.get(1));

        // Distance between products and golden eggs
        for (int i = 1; i < route.size() - 3; i++) {
            Pair pair = new Pair(route.get(i), route.get(i + 1));
            totalDistance += shortestDistances.get(pair);
        }

        // Distance from last product/golden egg to checkout
        Pair lastProductToCheckout = new Pair(route.get(route.size() - 3), route.get(route.size() - 2));
        totalDistance += productToCheckoutDistances.get(lastProductToCheckout);

        // Distance from checkout to exit
        totalDistance += exitToCheckoutsDistances.get(route.get(route.size() - 2));

        return totalDistance;
    }

    //Vrushta nai-kyshtiq marshryt ot nachalo do krai
    //podredbata na putq kakto trqbva da e e: EN -> P1 -> P2 -> P38 -> P50 -> P141 -> P107 -> P310 -> P204 -> P19 -> P279 -> CH1 -> EX
    //ne se gledat zlatnite qica
    public ArrayList<String> findShortestRoute(String entrance, String exit, String[] products,
            List<String> checkouts,
            HashMap<Pair, Integer> shortestDistances,
            HashMap<Pair, Integer> productToCheckoutDistances,
            HashMap<String, Integer> entranceToProductsDistances,
            HashMap<String, Integer> exitToCheckoutsDistances) {

        ArrayList<String> route = new ArrayList<>();
        route.add(entrance);

        Set<String> remainingProducts = new HashSet<String>(Arrays.asList(products));

        // Start from the entrance
        String currentLocation = entrance;

        while (!remainingProducts.isEmpty()) {
            String nearestProduct = null;
            int shortestDistance = Integer.MAX_VALUE;

            for (String product : remainingProducts) {
                int distance = entranceToProductsDistances.getOrDefault(product, Integer.MAX_VALUE);
                if (distance < shortestDistance) {
                    nearestProduct = product;
                    shortestDistance = distance;
                }
            }

            route.add(nearestProduct);
            remainingProducts.remove(nearestProduct);
            currentLocation = nearestProduct;
        }

        // Find the nearest checkout from the last product
        String nearestCheckout = null;
        int shortestCheckoutDistance = Integer.MAX_VALUE;

        for (String checkout : checkouts) {
            Pair pair = new Pair(currentLocation, checkout);
            int distance = productToCheckoutDistances.getOrDefault(pair, Integer.MAX_VALUE);
            if (distance < shortestCheckoutDistance) {
                nearestCheckout = checkout;
                shortestCheckoutDistance = distance;
            }
        }

        route.add(nearestCheckout);

        // Add the exit
        route.add(exit);

        return route;
    }

    //Vrushta nai-dobrata poziciq za da se vloji nai-dobriq zlaten qicek
    public ArrayList<String> insertBestGoldenEgg(ArrayList<String> route, String[] goldenEggs,
            HashMap<Pair, Integer> shortestDistances) {
        int minimalIncrease = Integer.MAX_VALUE;
        String bestGoldenEgg = null;
        int bestPosition = -1;

        for (String goldenEgg : goldenEggs) {
            for (int i = 1; i < route.size() - 2; i++) {
                String current = route.get(i);
                String next = route.get(i + 1);
                Pair currentToGoldenEgg = new Pair(current, goldenEgg);
                Pair goldenEggToNext = new Pair(goldenEgg, next);
                Pair currentToNext = new Pair(current, next);

                if (!shortestDistances.containsKey(currentToGoldenEgg)
                        || !shortestDistances.containsKey(goldenEggToNext)) {
                    continue;
                }
                int increase = shortestDistances.get(currentToGoldenEgg) + shortestDistances.get(goldenEggToNext)
                        - shortestDistances.get(currentToNext);

                if (increase < minimalIncrease) {
                    minimalIncrease = increase;
                    bestGoldenEgg = goldenEgg;
                    bestPosition = i + 1;
                }
            }
        }

        if (bestGoldenEgg != null && bestPosition != -1) {
            route.add(bestPosition, bestGoldenEgg);
        }

        return route;
    }

    //Vrushta vsichki koordinati na nai-kyshtiq marshryt ot nachalo do krai
    public ArrayList<List<int[]>> getShortestRoutePath(String[][] matrix, ArrayList<String> shortestRoute) {

        Set<String> elementsSet = new HashSet<>(shortestRoute);

        HashMap<String, int[]> elementCoords = new HashMap<>();

        for (int i = 0; i < matrix.length; i++) {
            for (int j = 0; j < matrix[i].length; j++) {
                if (elementsSet.contains(matrix[i][j])) {
                    elementCoords.put(matrix[i][j], new int[] { i, j });
                }
            }
        }

        ArrayList<List<int[]>> shortestRoutePath = new ArrayList<>();

        for (int index = 0; index < shortestRoute.size() - 1; index++) {
            List<int[]> path = coordinateMatrix.bfsWithPath(matrix, elementCoords.get(shortestRoute.get(index)),
                    elementCoords.get(shortestRoute.get(index + 1)));
            shortestRoutePath.add(path);
        }
        return shortestRoutePath;
    }

    //razmenq prodykti i se nadqva putq da stane po kus (vodi se che optimizira)
    public ArrayList<String> twoOpt(ArrayList<String> route,
            HashMap<Pair, Integer> shortestDistances,
            HashMap<Pair, Integer> productToCheckoutDistances,
            HashMap<String, Integer> entranceToProductsDistances,
            HashMap<String, Integer> exitToCheckoutsDistances) {
        boolean improved = true;
        while (improved) {
            improved = false;
            for (int i = 1; i < route.size() - 3; i++) {
                for (int j = i + 1; j < route.size() - 2; j++) {
                    ArrayList<String> newRoute = twoOptSwap(route, i, j);
                    int currentDistance = calculateRouteDistance(route, shortestDistances, productToCheckoutDistances,
                            entranceToProductsDistances, exitToCheckoutsDistances);
                    int newDistance = calculateRouteDistance(newRoute, shortestDistances, productToCheckoutDistances,
                            entranceToProductsDistances, exitToCheckoutsDistances);
                    if (newDistance < currentDistance) {
                        route = newRoute;
                        improved = true;
                    }
                }
            }
        }
        return route;
    }


    //pomoshen metod za twoOpt
    public ArrayList<String> twoOptSwap(ArrayList<String> route, int i, int j) {
        ArrayList<String> newRoute = new ArrayList<>(route.subList(0, i));
        ArrayList<String> subList = new ArrayList<>(route.subList(i, j + 1));
        java.util.Collections.reverse(subList);
        newRoute.addAll(subList);
        newRoute.addAll(route.subList(j + 1, route.size()));
        return newRoute;
    }

    //KRAEN METOD VRUSHA TO DETO E ZA FRONTENDA
    public ArrayList<List<int[]>> optimiseRoute(String[] products) {

        HashMap<Pair, Integer> shortestDistances = HashMapUtils
                .extractDistancePairHashMapFromFile("shortestDistances.json");

        HashMap<Pair, Integer> productToCheckoutDistances = HashMapUtils
                .extractDistancePairHashMapFromFile("productToCheckoutDistances.json");

        HashMap<String, Integer> entranceToProductsDistances = HashMapUtils
                .extractDistanceHashMapFromFile("entranceToProductsDistances.json");

        HashMap<String, Integer> exitToCheckoutsDistances = HashMapUtils
                .extractDistanceHashMapFromFile("exitToCheckoutsDistances.json");

        String entrance = "EN";

        String[] goldenEggs = { "P107", "P310", "P204", "P19", "P279" };

        List<String> checkouts = new ArrayList<String>(exitToCheckoutsDistances.keySet());

        String exit = "EX";

        // Find the shortest route using the nearest neighbor algorithm
        ArrayList<String> shortestRoute = findShortestRoute(entrance, exit, products, checkouts,
                shortestDistances, productToCheckoutDistances, entranceToProductsDistances, exitToCheckoutsDistances);

        // Insert the best golden egg that increases the route distance minimally
        shortestRoute = insertBestGoldenEgg(shortestRoute, goldenEggs, shortestDistances);

        // Optimize the route using 2-opt algorithm
        shortestRoute = twoOpt(shortestRoute, shortestDistances, productToCheckoutDistances,
                entranceToProductsDistances, exitToCheckoutsDistances);

        // Calculate the total distance of the optimized route
        int totalDistance = calculateRouteDistance(shortestRoute, shortestDistances, productToCheckoutDistances,
                entranceToProductsDistances, exitToCheckoutsDistances);

        // Print the optimized route and the total distance
        System.out.println("Optimized Route: " + shortestRoute);
        System.out.println("Total Distance: " + totalDistance);

        return getShortestRoutePath(coordinateMatrix.extractMatrix(),
                shortestRoute);

    }

}
