import Product from "@/classes/Product";
import { Text, View } from "../Themed";
import { StyleSheet, TouchableHighlight } from "react-native";
import { useState } from "react";

interface ProductProps {
    product: Product,
    productData: Product[],
    setProductData: React.Dispatch<React.SetStateAction<Product[]>>
}

export default function ProductButton({product,productData,setProductData}: ProductProps ) {
    const handlePress = () => {
        if (product.added) {
            const mappedProducts: Product[] = productData.map(curProduct => {
                return curProduct.id === product.id ? { ...curProduct, added: false} : curProduct
            });
            setProductData(mappedProducts);
        } else {
            const mappedProducts: Product[] = productData.map(curProduct => {
                return curProduct.id === product.id ? { ...curProduct, added: true} : curProduct
            });
            setProductData(mappedProducts);

        }
    };

    return (
        <TouchableHighlight onPress={handlePress} key={product.id}>
            <View style={styles.productButton}>
                <Text style={styles.productButtonText}>{product.name}</Text>
                {product.added ? <Text>Added</Text> : null}
            </View>
        </TouchableHighlight>
    )
}

const styles =  StyleSheet.create({
    productButton: {
        display: "flex",
        flexDirection: "row",
        margin: 3
    },
    productButtonText: {
        width: "100%"
    }
});