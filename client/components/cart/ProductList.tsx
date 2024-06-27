import { ScrollView } from 'react-native';
import Product from '@/classes/Product';
import ProductButton from './ProductButton';

interface ProductListProps {
    products: Product[],
    onAdd: (product: Product) => void
}

const ProductList: React.FC<ProductListProps> = ({ products, onAdd }) => {
    return (
        <ScrollView style={{ flex: 1 }}>
            {products.map((product) => (
                <ProductButton
                    key={product.id}
                    product={product}
                    onAdd={() => onAdd(product)}
                />
            ))}
        </ScrollView>
    );
};

export default ProductList;

