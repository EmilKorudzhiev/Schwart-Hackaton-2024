import { Button, ScrollView, StyleSheet, TextInput } from 'react-native';
import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed'; 
import * as fs from 'node:fs/promises';
import { useEffect, useState } from 'react';
import Product from '@/classes/Product';
import ProductButton from './ProductButton';

interface ProductListProps {
    products: Product[]
}

export default function ProductList({products}: {products: Product[]}) {
    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            {products.map((product) => (<ProductButton product={product}/>))}
        </ScrollView>
    )
}

