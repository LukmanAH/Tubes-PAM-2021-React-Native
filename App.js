import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './Home';
import Home2 from './Home2';
import Favorit from './Favorit';
import Login from './Login';
import Profil from './Profil';
import Daftar from './Daftar';
import RN1 from './AllPokemon';

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
          name="home2"
          component={Home2}
        />

        <Stack.Screen
          name="favorit"
          component={Favorit}
        />

        <Stack.Screen
          name="profil"
          component={Profil}
        />

        <Stack.Screen
          name="allpokemon"
          component={RN1}
        />


        <Stack.Screen
          name="login"
          component={Login}
        />

        <Stack.Screen
          name="daftar"
          component={Daftar}
        />


      </Stack.Navigator>
    </NavigationContainer>

  );
}

export default App;