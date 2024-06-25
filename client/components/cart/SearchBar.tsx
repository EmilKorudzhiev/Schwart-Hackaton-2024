import Product from "@/classes/Product";
import { Button, TextInput, StyleSheet } from "react-native";
import { Text, View } from '@/components/Themed'; 

interface SearchBarProps {
    products: Product[],
    setProducts: React.Dispatch<React.SetStateAction<Product[]>>
}


export default function SearchBar({products, setProducts}: SearchBarProps) {
    const handleChange = (newText: string) => {
        if (newText === "") {
            setProducts([]);
        } else {
            const regex = new RegExp(newText, 'i');
            const filteredProducts = products.filter((product) => {
                return regex.test(product.name);
            });
            setProducts(filteredProducts);
        }
    };

    return (
        <View style={styles.searchBar}>
            <Text style={styles.searchBarLabel}>Name</Text>
            <TextInput style={styles.searchBar} onChangeText={handleChange}/>
            <Button title="Search" />
        </View>
    )
}

const styles = StyleSheet.create({
    searchBar: {
        display: "flex",
        flexDirection: "row",
        width: "100%"
    },
    searchBarInput: {
        width: "100%",
        borderColor: "black"
    },
    searchBarLabel: {
        textAlign: "center"
    }
});