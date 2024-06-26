import React from 'react';
import { StyleSheet, Text, View, TextInput, Image, ScrollView } from 'react-native';

const ProductPage = () => {
  return (
    <View style={styles.screen}>
      <View style={styles.searchField}>
        <View style={styles.searchBar}>
          <Text>SearchIt</Text>
        </View>
      </View>
      <View style={styles.name}>
        <Text style={styles.heading}>Products</Text>
      </View>
      <ScrollView style={styles.category}>
        <Text style={styles.subHeading}>Fruits</Text>
        <View style={styles.products}>
          {['Apple', 'Banana', 'Apple', 'Banana', 'Apple', 'Banana', 'Apple'].map((item, index) => (
            <View style={styles.product} key={index}>
              <Image source={{ uri: 'https://via.placeholder.com/50' }} style={styles.productImage} />
              <Text>{item}</Text>
              <Text>{item.toLowerCase()}@example.com</Text>
            </View>
          ))}
        </View>
      </ScrollView>
      <ScrollView style={styles.category}>
        <Text style={styles.subHeading}>Meat</Text>
        <View style={styles.products}>
          {['Chicken', 'Beef', 'Beef', 'Beef', 'Beef', 'Beef', 'Beef'].map((item, index) => (
            <View style={styles.product} key={index}>
              <Image source={{ uri: 'https://via.placeholder.com/50' }} style={styles.productImage} />
              <Text>{item}</Text>
              <Text>{item.toLowerCase()}@example.com</Text>
            </View>
          ))}
        </View>
      </ScrollView>
      <View style={styles.cart}>
        <Image source={{ uri: 'https://via.placeholder.com/50' }} style={styles.cartImage} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: 'aqua',
    padding: 0,
    margin: 0,
  },
  searchField: {
    height: 100,
    width: '100%',
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchBar: {
    height: 50,
    width: '80%',
    backgroundColor: 'bisque',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  name: {
    width: '100%',
    alignItems: 'flex-start',
  },
  heading: {
    margin: 30,
    fontSize: 24,
    fontWeight: 'bold',
  },
  subHeading: {
    margin: 40,
    fontSize: 20,
    fontWeight: 'bold',
  },
  category: {
    width: '100%',
  },
  products: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    gap: 20,
    padding: 10,
  },
  product: {
    width: '30%',
    padding: 5,
    gap: 2,
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  productImage: {
    width: '100%',
    height: undefined,
    aspectRatio: 1,
  },
  cart: {
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
  cartImage: {
    width: 50,
    height: 50,
  },
});

export default ProductPage;
