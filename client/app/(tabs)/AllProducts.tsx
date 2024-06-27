import { Text, View } from '@/components/Themed'; 
import { useEffect, useState } from 'react';
import Product from '@/classes/Product';
import ProductList from '@/components/cart/ProductList';
import SearchBar from '@/components/cart/SearchBar';
import { Button, StyleSheet } from 'react-native';
import { Link, useLocalSearchParams } from 'expo-router';
import { ExpoRouter } from '@/.expo/types/router';
import { router } from 'expo-router';

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
    const [rawProductData, setProductData] = useState<Product[]>([]);
    const [products, setProducts] = useState<Product[]>([]);
    useEffect(() => {
        async function fetchData() {
            await readCSV().then((res) => {
                setProductData(res);
            })
        }
        fetchData();
    }, []);

    useEffect(() => {
        setProducts(rawProductData);
    }, [rawProductData]);
    


    const goToCart = () => {
        const cart = products.filter(prod => prod.added);
        let stringRep: string = "";
        cart.forEach((product, index) => {
            stringRep += product.id;
            if (index != cart.length-1) stringRep += ",";
        });
        const params: ExpoRouter.UnknownInputParams = {
            "cart": stringRep
        };
        //cart.toString не работи!!!!!!
        router.push({pathname: "Cart", params: params});
    };
    
    return (
        <View style={{flex:1}}>
            <View style={styles.topBar}>
                <SearchBar setProducts={setProducts} productData={rawProductData}/>
                <Button title="Go to Cart" onPress={goToCart}/>
            </View>
            <View style={{flex: 1}}>
                <ProductList products={products} productData={rawProductData} setProductData={setProductData}/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    topBar: {
        display: "flex",
        flexDirection: "row"
    }
});