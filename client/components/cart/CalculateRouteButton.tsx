import { ExpoRouter } from "@/.expo/types/router";
import Product from "@/classes/Product";
import { Link } from "expo-router";
import { Button } from "react-native";

interface CalculateRouteProps {
    products: Product[]
}

export default function CalculateRouteButton({products}: CalculateRouteProps) {

    

    const params: ExpoRouter.UnknownInputParams = {
        "products": products.filter(prod => prod.added).toString()
    };
    return (
        <Link href={{pathname: "Map", params: params}}>
            <Button title="Calculate Route"/>
        </Link>
    )
}