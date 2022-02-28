import React from 'react';
import { ActivityIndicator, ScrollView } from 'react-native';
import styles from './styles';
import ProductItem, { Product } from '../../components/ProductItem';
import { Container } from "native-base";
import { useState } from 'react';
import PageHeader from '../../components/PageHeader';
import api from '../../services/api';
import { AsyncStorage } from 'react-native';
import { useEffect } from 'react';

declare var server: string;

function productList(){

    const [products, setProducts] = useState<Product[]>([]);
    
    async function getProducts() {
        const token = await AsyncStorage.getItem('token');
        server = await AsyncStorage.getItem('server');
        try {
            const response = await api(server).get('products', {
                headers: {
                    "x-access-token": token
                }
            });
            setProducts(response.data);
        } catch (e) {
            console.log(e);
            alert(e.message);
        }
    }

    function editProduct(p: Product){
        let array = [...products];
        let productIndex = products.findIndex(x => x.id === p.id );
        if (productIndex !== -1) {
            array[productIndex] = { ...array[productIndex], ...p};
            setProducts(array);
        }
    }

    function deleteProduct(id: number){
        let array = [...products];
        let productIndex = products.findIndex(x => x.id === id );
        if (productIndex !== -1) {
            array.splice(productIndex, 1);
            setProducts(array);
        }
    }


    useEffect(() => {
        getProducts();
    },[]);

    return (

        <Container>

            <PageHeader title="Produtos disponíveis" />

            <ScrollView
                style={styles.productList}
                contentContainerStyle={{
                    paddingHorizontal: 16,
                    paddingBottom: 16
                }}
            >

                {products.length > 0 ? products.map((product: Product) => {
                    return <ProductItem
                        server={server}
                        key={product.id}
                        product={product}
                        editProduct={editProduct}
                        deleteProduct={deleteProduct}
                    />
                }) : <ActivityIndicator size="large" color="#00ff00" />}
            </ScrollView>

        </Container>
    );
}

export default productList;