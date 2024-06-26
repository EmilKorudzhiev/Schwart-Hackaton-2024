import React from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Image,
  StyleSheet,
  Button,
} from "react-native";
import { WebView } from "react-native-webview";

const products = [
  {
    id: 1,
    name: "Product 1",
    price: "$10.00",
    image: "https://via.placeholder.com/50",
  },
  {
    id: 2,
    name: "Product 2",
    price: "$20.00",
    image: "https://via.placeholder.com/50",
  },
  {
    id: 3,
    name: "Product 1",
    price: "$10.00",
    image: "https://via.placeholder.com/50",
  },
  {
    id: 4,
    name: "Product 2",
    price: "$20.00",
    image: "https://via.placeholder.com/50",
  },
  {
    id: 5,
    name: "Product 1",
    price: "$10.00",
    image: "https://via.placeholder.com/50",
  },
  {
    id: 6,
    name: "Product 2",
    price: "$20.00",
    image: "https://via.placeholder.com/50",
  },
  {
    id: 7,
    name: "Product 1",
    price: "$10.00",
    image: "https://via.placeholder.com/50",
  },
  {
    id: 8,
    name: "Product 2",
    price: "$20.00",
    image: "https://via.placeholder.com/50",
  },
];

const MapPage = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.map}>
        <WebView
          source={{
            uri: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2922.9588958201534!2d23.90545937596034!3d42.89481397114823!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40aa501bf6a08c81%3A0xe4f50f5955f4a188!2z0J3Qn9CTINC_0L4g0LrQvtC80L_RjtGC0YrRgNC90Lgg0YLQtdGF0L3QvtC70L7Qs9C40Lgg0Lgg0YHQuNGB0YLQtdC80Lg!5e0!3m2!1sbg!2sbg!4v1719346961126!5m2!1sbg!2sbg",
          }}
          style={styles.webview}
        />
      </View>
      <ScrollView style={styles.products}>
        <View style={styles.productList}>
          {products.map((product) => (
            <View key={product.id} style={styles.product}>
              <Image
                source={{ uri: product.image }}
                style={styles.productImage}
              />
              <View style={styles.productInfo}>
                <Text style={styles.productName}>{product.name}</Text>
                <Text style={styles.productPrice}>{product.price}</Text>
              </View>
              <View style={styles.productActions}>
                <Button
                  title="Done"
                  color="lightgreen"
                  onPress={() => alert("Done pressed")}
                />
                <Button
                  title="Delete"
                  color="lightcoral"
                  onPress={() => alert("Delete pressed")}
                />
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "aqua",
  },
  map: {
    height: "50%",
    width: "100%",
    backgroundColor: "blue",
  },
  webview: {
    height: "100%",
    width: "100%",
  },
  products: {
    height: "50%",
    width: "100%",
    backgroundColor: "burlywood",
  },
  productList: {
    width: "80%",
    alignSelf: "center",
  },
  product: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    marginBottom: 10,
    backgroundColor: "white",
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  productImage: {
    width: 50,
    height: 50,
    borderRadius: 5,
    marginRight: 10,
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
    marginBottom: 5,
  },
  productPrice: {
    fontSize: 14,
    color: "gray",
  },
  productActions: {
    flexDirection: "row",
  },
});

export default MapPage;
