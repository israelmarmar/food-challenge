import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './src/pages/LoginScreen'
import HomeScreen from './src/pages/HomeScreen';
import { ActivityIndicator, ScrollView } from 'react-native';
import Edit from './src/pages/Edit';
import * as Font from 'expo-font';
import { Archivo_400Regular, Archivo_700Bold, useFonts} from '@expo-google-fonts/archivo';
import { Poppins_400Regular, Poppins_600SemiBold } from '@expo-google-fonts/poppins';

const Stack = createStackNavigator();

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    async function setFonts(){
      console.log("set fonts");
      await Font.loadAsync({
        Roboto: require('native-base/Fonts/Roboto.ttf'),
        Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      });
      setLoading(false);
    }
    setFonts();
  },[]);

  let [fontsLoaded] = useFonts({
    Archivo_400Regular,
    Archivo_700Bold,
    Poppins_400Regular, 
    Poppins_600SemiBold,
  });

  if (loading) {
    return <ActivityIndicator />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Edit">
          {props => <Edit  {...props.route.params} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
