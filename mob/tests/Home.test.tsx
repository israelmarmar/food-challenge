import React from 'react';
import {render} from 'react-native-testing-library';
import ProductItem from '../src/components/ProductItem';
import Home from '../src/pages/HomeScreen';
import { AsyncStorage } from 'react-native';
import api from '../src/services/api';

async function login(){

    const response = await api("http://192.168.1.7:3333").post('session', {
        user: 'luiz',
        pwd: '123'
    });

    return await AsyncStorage.setItem(
        'token',
        response.data.token
    );

}

it('rendenrizar os produtos', async () => {
  await login();
  const result = render(<Home />).toJSON();

  expect(result).toMatchSnapshot();
});