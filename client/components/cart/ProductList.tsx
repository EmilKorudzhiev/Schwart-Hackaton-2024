import { ScrollView } from 'react-native';
import Product from '@/classes/Product';
import ProductButton from './ProductButton';

interface ProductListProps {
    products: Product[],
    onAdd: () => void
}

export default function ProductList({products, onAdd}: ProductListProps) {
    return (
        <ScrollView style={{flex: 1}}>
            {products.map((product) => (
                <ProductButton product={product} onAdd={onAdd}/>
            ))}
        </ScrollView>
    )
}

