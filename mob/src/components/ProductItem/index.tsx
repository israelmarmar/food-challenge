import React, { useState } from 'react';
import { View, Image, Linking, TouchableOpacity } from 'react-native';
import Stars from 'react-native-stars';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Container, Card, Title, CardItem, Text, Body } from "native-base";
import { FontAwesome } from '@expo/vector-icons';
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';
import isoToDate from '../../utils/isoToDate';
import { AsyncStorage } from 'react-native';
import api from '../../services/api';
import Spinner from 'react-native-loading-spinner-overlay';
import { ConfirmDialog } from 'react-native-simple-dialogs';

export interface Product {
    id: number;
    title: string;
    type: string;
    description: string;
    filename: string;
    height: number;
    width: number;
    rating: number;
    price: number;
    createdAt: string;
}

interface ProductItemProps {
    product: Product;
    editProduct: Function;
    deleteProduct: Function;
    server: string;
}

const ProductItem: React.FC<ProductItemProps> = ({ product, editProduct, deleteProduct, server }) => {
    const [dialog, setDialog] = useState(false);
    const [loading, setLoading] = useState(false);
    
    let _menu = null;

    const setMenuRef = (ref) => {
        _menu = ref;
    };

    const showMenu = () => {
        _menu.show();
    };

    const hideMenu = () => {
        _menu.hide();
    };

    const { navigate } = useNavigation();

    function edit() {
        _menu.hide();
        navigate("Edit", {editProduct,...product});
    }

    async function remove() {
        setDialog(false);
        setLoading(true);

        const token = await AsyncStorage.getItem('token');

        try {
            const response = await api(server).delete(`products/${product.id}`, {
                headers: {
                    "x-access-token": token
                }
            });
            navigate('Home');
            setLoading(false);
            deleteProduct(product.id);
            alert("Produto excluído com sucesso");
        } catch (e) {
            alert(e.message);
            setLoading(false);
        }
    }

    return (
        <>
            <Spinner
                visible={loading}
                textContent={'Excluindo...'}
                textStyle={styles.spinnerTextStyle}
            />
            <ConfirmDialog
                title="Confirma exclusão"
                message={`Você deseja excluir ${product.title} ?`}
                visible={dialog}
                onTouchOutside={() => setDialog(false)}
                positiveButton={{
                    title: "Sim",
                    onPress: () => remove()
                }}
                negativeButton={{
                    title: "Não",
                    onPress: () => setDialog(false)
                }}
            />
            <Card>
                <CardItem style={styles.profile} button onPress={() => edit()}>
                    <Image
                        style={styles.avatar}
                        source={{ uri: server + "/images/" + product.filename }}
                    />

                    <View style={styles.profileInfo}>
                        <View style={styles.title}>
                            <Title style={styles.name}>{product.title}</Title>

                            <View>
                                <Menu
                                    ref={setMenuRef}
                                    button={
                                        <TouchableOpacity onPress={showMenu}>
                                            <FontAwesome name={'ellipsis-h'} style={styles.more} />
                                        </TouchableOpacity>
                                    }>
                                    <MenuItem onPress={() => { edit() }}>Editar</MenuItem>
                                    <MenuItem onPress={() => { hideMenu(); setDialog(true) }}>Excluir</MenuItem>
                                </Menu>
                            </View>
                        </View>
                        <Text style={styles.subject}>{product.type}</Text>
                        <Text style={styles.subject}>{isoToDate(product.createdAt)}</Text>
                        <View style={styles.footer}>
                            <Stars
                                default={product.rating}
                                count={5}
                                half={true}
                                starSize={100}
                                fullStar={<Icon name={'star'} style={[styles.myStarStyle]} />}
                                emptyStar={<Icon name={'star-outline'} style={[styles.myStarStyle, styles.myEmptyStarStyle]} />}
                                halfStar={<Icon name={'star-half'} style={[styles.myStarStyle]} />}
                            />
                            <Text style={styles.price}>
                                <Text style={styles.priceValue}>{'R$ ' + product.price}</Text>
                            </Text>
                        </View>
                    </View>
                </CardItem>

            </Card>
        </>
    );

}

export default ProductItem;