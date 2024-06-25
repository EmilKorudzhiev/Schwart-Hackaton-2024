import { ScrollView } from 'react-native';
import Product from '@/classes/Product';
import ProductButton from './ProductButton';

interface ProductListProps {
    products: Product[]
}

export default function ProductList({products}: ProductListProps) {
    return (
        <ScrollView style={{flex: 1}}>
            {products.map((product) => (
                <ProductButton product={product} />
            ))}
        </ScrollView>
    )
}

