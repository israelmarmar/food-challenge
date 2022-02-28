import React, { useState } from 'react'
import { Image, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Container, Input, Item, Label, Form, Button, Text } from "native-base";
import { useNavigation } from '@react-navigation/native';
import api from '../../services/api';
import { AsyncStorage } from 'react-native';
import styles from './styles';

export default function LoginScreen() {
    const [server, setServer] = useState('http://192.168.1.7:3333');
    const [user, setuser] = useState('');
    const [password, setPassword] = useState('');
    const [loadUser, setLoadUser] = useState(false);

    const { navigate } = useNavigation();

    const onLoginPress = async () => {
        setLoadUser(true);

        try {
            var response = await api(server).post('session', {
                user: user,
                pwd: password
            });
            console.log(response.data.token);
            try {
                await AsyncStorage.setItem(
                    'token',
                    response.data.token
                );
                await AsyncStorage.setItem(
                    'server',
                    server
                );
            } catch (error) {
                // Error saving data
            }

            navigate('Home');
        } catch (error) {
            console.log(error.message);
            alert("usuário ou senha inválidos");
        }

        setLoadUser(false);
    }

    return (
        <Container style={styles.container}>
            <KeyboardAwareScrollView
                style={{ flex: 1, width: '100%' }}
                keyboardShouldPersistTaps="always">
                <Image
                    style={styles.logo}
                    source={require('../../../assets/icon.png')}
                />

                <Form>
                    <Item floatingLabel>
                        <Label>Servidor</Label>
                        <Input
                            onChangeText={(text) => setServer(text)}
                            value={server}
                        />
                    </Item>
                    <Item floatingLabel>
                        <Label>Usuário</Label>
                        <Input
                            onChangeText={(text) => setuser(text)}
                            value={user}
                        />
                    </Item>
                    <Item floatingLabel>
                        <Label>Senha</Label>
                        <Input
                            secureTextEntry
                            onChangeText={(text) => setPassword(text)}
                            value={password}
                        />
                    </Item>
                </Form>
                <Button block
                    style={[styles.button, loadUser ? styles.buttonDisabled : {}]}
                    onPress={() => onLoginPress()}
                    disabled={loadUser}>

                    {loadUser ? <Text style={styles.buttonTitle}>...</Text> :
                        <Text style={styles.buttonTitle}>Log in</Text>}
                </Button>

            </KeyboardAwareScrollView>
        </Container>
    )
}