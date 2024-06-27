import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { ExpoRouter } from '@/.expo/types/router';
import Product from '@/classes/Product';
import ProductList from '@/components/cart/ProductList';
import SearchBar from '@/components/cart/SearchBar';

async function readCSV(): Promise<Product[]> {
  const response = await fetch("/resources/product_master_data.csv");
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const csvData = await response.text();
  let splitCSVData = csvData.split("\n");
  splitCSVData.shift();
  let productArray: Product[] = [];
  splitCSVData.forEach(line => {
    productArray.push(new Product(line));
  });
  return productArray;
}

export default function CartScreen() {
  const params = useLocalSearchParams();
  const [rawProductData, setProductData] = useState<Product[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function fetchData() {
      console.log(typeof params.cart);
      if (typeof params.cart === "string") {
        let cart: string = params.cart;
        let productIdArray: string[] = cart.split(",");
        await readCSV().then((res) => {
          const cartResult = res.filter(prod => productIdArray.includes(prod.id));
          cartResult.forEach(product => {
            product.added = true;
          });
          setProductData(cartResult);
        })
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    setProducts(rawProductData);
  }, [rawProductData]);

  const calculateRoute = () => {
    const cart = rawProductData.filter(prod => prod.added);
    let stringRep: string = "";
    cart.forEach((product, index) => {
      stringRep += product.id;
      if (index !== cart.length - 1) stringRep += ",";
    });
    const params: ExpoRouter.UnknownInputParams = {
      "cart": stringRep
    };
    router.push({ pathname: "Map", params: params });
  };

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <SearchBar setProducts={setProducts} productData={rawProductData} />
        <Button title="Calculate Route" onPress={calculateRoute} />
      </View>
      <View style={styles.productListContainer}>
        <ProductList products={products} productData={rawProductData} setProductData={setProductData} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  productListContainer: {
    flex: 1,
    padding: 10,
  },
});

