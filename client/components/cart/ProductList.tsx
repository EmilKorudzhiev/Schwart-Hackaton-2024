import { ScrollView } from 'react-native';
import Product from '@/classes/Product';
import ProductButton from './ProductButton';

interface ProductListProps {
    products: Product[],
    productData: Product[]
    setProductData: React.Dispatch<React.SetStateAction<Product[]>>,
}

export default function ProductList({products,productData, setProductData}: ProductListProps) {
    return (
        <ScrollView style={{ flex: 1 }}>
            {products.map((product) => (
                <ProductButton product={product} productData={productData} setProductData={setProductData}/>
            ))}
        </ScrollView>
    );
};
