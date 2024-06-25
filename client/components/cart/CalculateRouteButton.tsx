import Product from "@/classes/Product";
import { Button } from "react-native";

interface CalculateRouteProps {
    products: Product[]
}

export default function CalculateRouteButton({products}: CalculateRouteProps) {
    const calculate = () => {
        console.log(products.filter(prod => prod.added));
    };

    return (
        <Button title="Calculate Route" onPress={calculate}/>
    )
}