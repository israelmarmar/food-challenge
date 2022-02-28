import React, { useState, useEffect } from 'react'
import { View, ScrollView } from 'react-native'
import { Container, Input, Item, Label, Form, Button, Text } from "native-base";
import { useNavigation } from '@react-navigation/native'
import PageHeader from '../../components/PageHeader'
import { AsyncStorage } from 'react-native'
import api from '../../services/api'
import styles from './styles'

export interface EditProps {
    title: string,
    type: string,
    price: number,
    description: string,
    height: number,
    width: number,
    id: number,
    rating: number,
    editProduct: Function
}

const Edit: React.FC<EditProps> = ({ title, type, price, description, rating, height, width, id, editProduct}) => {

    const [titleState, setTitle] = useState(title);
    const [typeState, setType] = useState(type);
    const [descriptionState, setDescription] = useState(description);
    const [heightState, setHeight] = useState(height);
    const [widthState, setWidth] = useState(width);
    const [ratingState, setRating] = useState(rating);
    const [priceState, setPrice] = useState(price);
    const [loadSave, setLoadSave] = useState(false);

    const { navigate } = useNavigation();

    async function save(id: number) {
        setLoadSave(true);
        const token = await AsyncStorage.getItem('token');
        const server: string = await AsyncStorage.getItem('server');

        try {
            const response = await api(server).put(`products/${id}`, {
                title: titleState,
                type: typeState,
                price: priceState,
                height: heightState,
                width: widthState,
                description: descriptionState,
                rating: ratingState
            }, {
                headers: {
                    "x-access-token": token
                }
            });

            editProduct({
                id: id,
                title: titleState,
                type: typeState,
                price: priceState,
                height: heightState,
                width: widthState,
                description: descriptionState,
                rating: ratingState
            });

            navigate("Home");
        } catch (e) {
            console.log(e);
            alert(e.message);
        }
        
        setLoadSave(false);
    }

    return (
        <>
            <Container>
                <PageHeader title="Editar produto" />

                <ScrollView>
                
                <View style={styles.profile}>

                    <Form style={styles.profileInfo}>

                        <Item floatingLabel>
                            <Label>Título</Label>
                            <Input
                                onChangeText={(text: string) => setTitle(text)}
                                value={titleState}
                            />
                        </Item>

                        <Item floatingLabel>
                            <Label>Tipo</Label>
                            <Input
                                onChangeText={(text: string) => setType(text)}
                                value={typeState}
                            />
                        </Item>

                        <Item floatingLabel>
                            <Label>Preço</Label>
                            <Input
                                onChangeText={(text: string) => setPrice(Number(text))}
                                keyboardType={'numeric'}
                                value={priceState.toString()}
                            />
                        </Item>

                        <Item floatingLabel>
                            <Label>Descrição</Label>
                            <Input
                                onChangeText={(text: string) => setDescription(text)}
                                value={descriptionState}
                            />
                        </Item>

                        <Item floatingLabel>
                            <Label>Altura</Label>
                            <Input
                                onChangeText={(text: string) => setHeight(Number(text))}
                                keyboardType={'numeric'}
                                value={height.toString()}
                            />
                        </Item>

                        <Item floatingLabel>
                            <Label>Largura</Label>
                            <Input
                                onChangeText={(text: string) => setWidth(Number(text))}
                                keyboardType={'numeric'}
                                value={widthState.toString()}
                            />
                        </Item>

                        <Item floatingLabel>
                            <Label>Nota</Label>
                            <Input
                                onChangeText={(text: string) => setRating(Number(text))}
                                keyboardType={'numeric'}
                                value={ratingState.toString()}
                            />
                        </Item>
                        
                            <Button block
                                style={[loadSave ? styles.buttonDisabled : {}]}
                                onPress={() => { save(id) }}
                                disabled={loadSave}>

                                {loadSave ? <Text style={styles.buttonTitle}>...</Text> :
                                    <Text style={styles.buttonTitle}>Salvar</Text>}
                            </Button>
                    </Form>

                </View>

                </ScrollView>

            </Container>
            

        </>
    )
}

export default Edit;