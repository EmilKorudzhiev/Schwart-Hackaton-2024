import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Pressable,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const ProductList = ({ category, products }) => (
  <View style={styles.category}>
    <Text style={styles.subHeading}>{category}</Text>
    <View style={styles.products}>
      {products.map((item, index) => (
        <View style={styles.product} key={index}>
          <Image source={{ uri: item.imageUri }} style={styles.productImage} />
          <Text style={styles.productText}>{item.name}</Text>
          <TouchableOpacity style={styles.addButton}>
            <Icon name="plus" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      ))}
    </View>
  </View>
);

const goToCart = () => {
  const params = {
    message: "Hello World!",
  };
  router.push({ pathname: "Cart", params: params });
};

const App = () => {
  const [fruits, setFruits] = useState([]);
  const [meats, setMeats] = useState([]);

  useEffect(() => {
    // Replace with actual data fetching logic
    fetchFruits();
    fetchMeats();
  }, []);

  const fetchFruits = async () => {
    // Fetch fruits from the database
    const fruitData = [
      { name: "Apple", imageUri: "https://via.placeholder.com/50" },
      { name: "Banana", imageUri: "https://via.placeholder.com/50" },
      { name: "Orange", imageUri: "https://via.placeholder.com/50" },
      { name: "Grapes", imageUri: "https://via.placeholder.com/50" },
      { name: "Pineapple", imageUri: "https://via.placeholder.com/50" },
      { name: "Mango", imageUri: "https://via.placeholder.com/50" },
      { name: "Peach", imageUri: "https://via.placeholder.com/50" },
    ];
    setFruits(fruitData);
  };

  const fetchMeats = async () => {
    // Fetch meats from the database
    const meatData = [
      { name: "Chicken", imageUri: "https://via.placeholder.com/50" },
      { name: "Beef", imageUri: "https://via.placeholder.com/50" },
      { name: "Pork", imageUri: "https://via.placeholder.com/50" },
      { name: "Lamb", imageUri: "https://via.placeholder.com/50" },
      { name: "Turkey", imageUri: "https://via.placeholder.com/50" },
      { name: "Fish", imageUri: "https://via.placeholder.com/50" },
      { name: "Duck", imageUri: "https://via.placeholder.com/50" },
    ];
    setMeats(meatData);
  };

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.searchField}>
        <View style={styles.searchBar}>
          <TextInput
            placeholder="Search..."
            placeholderTextColor="#009FB7"
            style={styles.searchInput}
          />
        </View>
      </View>
      <View style={styles.name}>
        <Text style={styles.heading}>Products</Text>
      </View>
      <ScrollView style={styles.scrollView}>
        <ProductList category="Fruits" products={fruits} />
        <ProductList category="Meat" products={meats} />
      </ScrollView>
      <Pressable onPress={goToCart}>
        <View style={styles.cart}>
          <Icon name="shopping-cart" size={30} color={'#FCF7F8'} style={styles.cartButton}  />
        </View>
      </Pressable>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#FCF7F8",
  },
  
  searchField: {
    height: 70,
    width: "100%",
    backgroundColor: "#FCF7F8",
    justifyContent: "center",
    alignItems: "center",
  },
  searchBar: {
    height: 50,
    width: "90%",
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    paddingHorizontal: 10,

    borderBottomColor: "#009FB7",
    borderWidth: 2,
    borderColor: "transparent",
  },
  searchInput: {
    width: "100%",
    height: "100%",
    fontSize: 18,
    color: "#009FB7",
  },
  placeholderStyle: {
    color: "#009FB7",
  },
  name: {
    width: "100%",
    alignItems: "flex-start",
    backgroundColor: "#FCF7F8",
  },
  heading: {
    margin: 20,
    fontSize: 28,
    fontWeight: "bold",
    backgroundColor: "#FCF7F8",
  },
  scrollView: {
    width: "100%",
  },
  subHeading: {
    marginVertical: 20,
    marginLeft: 30,
    fontSize: 22,
    fontWeight: "bold",
    backgroundColor: "#FCF7F8",
  },
  category: {
    width: "100%",
  },
  products: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    paddingHorizontal: 10,
    backgroundColor: "#FCF7F8",
  },
  product: {
    width: "30%",
    backgroundColor: "#F1F2EB",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    borderRadius: 20,
    borderBottomColor: "#009FB7",
    borderWidth: 1,
    borderColor: "transparent",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.45,
    shadowRadius: 3.84,
    elevation: 5,
  },
  productImage: {
    width: "100%",
    height: 100,
    borderRadius: 20,
  },
  productText: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 5,
  },
  addButton: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#009FB7",
    borderRadius: 10,
    marginBottom: 5,
    width: 30,
    height: 30,
  },
  cart: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: '#009FB7',
    width: 60,
    height: 60,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10
  },
  cartImage: {
    width: 50,
    height: 50,
  },
});

export default App;
