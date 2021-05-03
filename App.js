import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './Home';
import Favorit from './Favorit';

const Stack = createStackNavigator();


const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}
      >
        <Stack.Screen
          name="home"
          component={Home}
        />

        <Stack.Screen
          name="favorit"
          component={Favorit}
        />
      </Stack.Navigator>
    </NavigationContainer>

  );
}

export default App;