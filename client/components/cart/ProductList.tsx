import { Button, ScrollView, StyleSheet, TextInput } from 'react-native';
import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed'; 
import * as fs from 'node:fs/promises';
import { useEffect, useState } from 'react';
import Product from '@/classes/Product';
import ProductButton from './ProductButton';

interface ProductListProps {
    products: Product[],
    addedProducts?: Product[]
    setAddedProducts?: React.Dispatch<React.SetStateAction<Product[]>>,
    addable?: boolean,
    removable?: boolean
}

export default function ProductList({products, addedProducts, setAddedProducts, addable, removable}: ProductListProps) {
    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            {products.map((product) => (
                <ProductButton product={product} 
                setAddedProducts={setAddedProducts} 
                addable={addable} removable={removable}
                addedProducts={addedProducts}
                />
            ))}
        </ScrollView>
    )
}

