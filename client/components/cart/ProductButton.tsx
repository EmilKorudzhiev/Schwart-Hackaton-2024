import Product from "@/classes/Product";
import { Text } from "../Themed";

interface ProductProps {
    product: Product,
    setAddedProducts?: React.Dispatch<React.SetStateAction<Product[]>>,
    addable?: boolean
}

export default function ProductButton({product, setAddedProducts, addable}: ProductProps ) {
    return (
        <Text>{product.name}</Text>
    )
}