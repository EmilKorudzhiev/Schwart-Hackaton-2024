import Product from "@/classes/Product";
import { Button, TextInput, StyleSheet } from "react-native";
import { Text, View } from '@/components/Themed'; 

interface SearchBarProps {
    productData: Product[],
    setProducts: React.Dispatch<React.SetStateAction<Product[]>>
}


export default function SearchBar({productData, setProducts}: SearchBarProps) {
    const handleChange = (newText: string) => {
        if (newText === "") {
            setProducts(productData);
        } else {
            const regex = new RegExp(newText, 'i');
            const filteredProducts = productData.filter((product) => {
                return regex.test(product.name);
            });
            setProducts(filteredProducts);
        }
    };

    return (
        <View style={styles.searchBar}>
            <Text style={styles.searchBarLabel}>Name</Text>
            <TextInput style={styles.searchBar} onChangeText={handleChange}/>
        </View>
    )
}

const styles = StyleSheet.create({
    searchBar: {
        display: "flex",
        flexDirection: "row",
        margin: 3
    },
    searchBarInput: {
        width: "100%",
        borderColor: "black"
    },
    searchBarLabel: {
        textAlign: "center"
    }
});