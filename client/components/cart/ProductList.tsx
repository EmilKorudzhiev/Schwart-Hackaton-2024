import { ScrollView } from 'react-native';
import Product from '@/classes/Product';
import ProductButton from './ProductButton';

interface ProductListProps {
    products: Product[],
    cart?: Product[]
    setCart?: React.Dispatch<React.SetStateAction<Product[]>>,
}

export default function ProductList({products, cart, setCart}: ProductListProps) {
    return (
        <ScrollView style={{flex: 1}}>
            {products.map((product) => (
                <ProductButton product={product} />
            ))}
        </ScrollView>
    )
}

