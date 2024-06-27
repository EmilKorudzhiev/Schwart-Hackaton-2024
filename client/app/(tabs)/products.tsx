import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView, SafeAreaView } from 'react-native';
import axios from 'axios';
import Product from '../../classes/Product';
import ProductList from '../../components/cart/ProductList';
import { useAuth } from '@/providers/AuthProvider'; // Adjust the path if necessary

const ProductPage = () => {
    const [groupedProducts, setGroupedProducts] = useState<{ [key: string]: Product[] }>({});
    const { accessToken } = useAuth();

    useEffect(() => {
        if (accessToken) {
            console.log('Access Token in ProductPage:', accessToken); // Debug log
            fetchProducts();
        } else {
            console.error('No access token available in ProductPage');
        }
    }, [accessToken]);

    const fetchProducts = async () => {
        const apiUrl = `${process.env.EXPO_PUBLIC_HOST}/api/v1/products/grouped-by-categories`;

        console.log('Fetching products from:', apiUrl);
        console.log('Using access token:', accessToken);

        try {
            const response = await axios.get(apiUrl, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            if (response.status === 200) {
                console.log('Products fetched successfully:', response.data);
                setGroupedProducts(response.data);
            } else {
                console.error('Failed to fetch products: Non-200 status code', response);
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error('Axios error:', error.response?.data || error.message);
            } else {
                console.error('Unexpected error:', error);
            }
        }
    };

    const handleAdd = (product: Product) => {
        console.log(`Added ${product.name} to cart`);
    };

    return (
        <SafeAreaView style={styles.screen}>
            <View style={styles.searchField}>
                <View style={styles.searchBar}>
                    <TextInput placeholder="Search..." style={styles.searchInput} />
                </View>
            </View>
            <View style={styles.name}>
                <Text style={styles.heading}>Products</Text>
            </View>
            <ScrollView style={styles.scrollView}>
                {Object.keys(groupedProducts).map((category) => (
                    <View key={category} style={styles.category}>
                        <Text style={styles.subHeading}>{category}</Text>
                        <ProductList
                            products={groupedProducts[category]}
                            onAdd={handleAdd}
                        />
                    </View>
                ))}
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: '#FCF7F8',
    },
    searchField: {
        height: 100,
        width: '100%',
        backgroundColor: '#FCF7F8',
        justifyContent: 'center',
        alignItems: 'center',
    },
    searchBar: {
        height: 50,
        width: '80%',
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        paddingHorizontal: 10,
        borderBottomColor: 'red',
        borderWidth: 2,
    },
    searchInput: {
        width: '100%',
        height: '100%',
        fontSize: 18,
    },
    name: {
        width: '100%',
        alignItems: 'flex-start',
        backgroundColor: '#FCF7F8',
    },
    heading: {
        margin: 30,
        fontSize: 28,
        fontWeight: 'bold',
        backgroundColor: '#FCF7F8',
    },
    scrollView: {
        width: '100%',
    },
    subHeading: {
        marginVertical: 20,
        marginLeft: 30,
        fontSize: 22,
        fontWeight: 'bold',
        backgroundColor: '#FCF7F8',
    },
    category: {
        width: '100%',
    },
});

export default ProductPage;
