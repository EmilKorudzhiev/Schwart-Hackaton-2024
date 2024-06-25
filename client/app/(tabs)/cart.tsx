import { Text, View } from '@/components/Themed'; 
import { useEffect, useState } from 'react';
import Product from '@/classes/Product';
import ProductList from '@/components/cart/ProductList';
import SearchBar from '@/components/cart/SearchBar';
import { Button } from 'react-native';


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
    const [products, setProducts] = useState<Product[]>([]);
    const [rawProductData, setProductData] = useState<Product[]>([]);
    const [cartScreenToggle, setCartScreenToggle] = useState(false);

    const handleToggle = () => {
        setCartScreenToggle(!cartScreenToggle);
    };

    useEffect(() => {
        async function fetchData() {
            setProductData(await readCSV());
        }
        fetchData();
    }, []);

    const [addedProducts, setAddedProducts] = useState<Product[]>([]);

    const allProductsScreen = (
        <View style={{flex: 1}}>
            <SearchBar products={rawProductData} setProducts={setProducts}/>
            <ProductList products={products} addable={true} addedProducts={addedProducts} setAddedProducts={setAddedProducts}/>
        </View>
    );

    const cartScreen = (
        <View style={{flex: 1}}>
            <ProductList products={addedProducts} removable={true} addedProducts={addedProducts} setAddedProducts={setAddedProducts}/>
        </View>
    );
    
    return (
        <View>
            <Button title={cartScreenToggle ? "Open All Products" : `Open My Cart (${addedProducts.length})`} onPress={handleToggle}/>
            {cartScreenToggle ?  cartScreen : allProductsScreen}
        </View>
    )
}