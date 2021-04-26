import React from 'react';

import Home from './views/home';
import Fases from './views/fases';
import Partidas from './views/partidas';


import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="home" screenOptions={{ headerShown: false }} >
        <Stack.Screen name="home" component={Home} />
        <Stack.Screen name="fases" component={Fases} />   
        <Stack.Screen name="partidas" component={Partidas} />  
      </Stack.Navigator>
    </NavigationContainer>
  );
}
