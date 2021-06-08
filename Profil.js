import { Assets } from '@react-navigation/stack';
import React, { Component, createContext, useState, useEffect, useContext, } from 'react';
import { View, Text, Button, TouchableOpacity, FlatList, Dimensions, Image, ScrollView, } from 'react-native';
import { StyleSheet } from 'react-native';
import { color } from 'react-native-reanimated';
//import { UsernameContext } from './UsernameContext';

const Profil = ({ navigation }) => {



  const logout = () => {
    navigation.navigate('home')
  }

  const goToHome = () => {
    navigation.navigate('home2')
  }

  const gotoFavorites = () => {
    navigation.navigate('favorit')
  }


  return (

    <ScrollView style={{ backgroundColor: '#FFEB66', }}>
      <View style={styles.viewWrapper}>
        <View style={styles.viewList}>
          <Text style={styles.textListNama} onPress={goToHome}> Home </Text>
        </View>
        <View style={styles.viewList}>
          <Text style={styles.textListNama} onPress={gotoFavorites}> Favorite </Text>
        </View>
        <View style={styles.viewListOut}>
          <Text style={styles.textListNama} onPress={logout}> Logout </Text>
        </View>

      </View >
    </ScrollView >

  );
}



export default Profil;


const WindowHeight = Dimensions.get('window').height;


const styles = StyleSheet.create({
  viewWrapper: {
    flex: 3,
    flexDirection: 'column',
    marginTop: WindowHeight / 3,
    justifyContent: 'center'
  },

  viewList: {
    height: 50,
    alignItems: 'center',
    padding: 10,
    marginVertical: 15,
    marginHorizontal: 10,
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 5,
    backgroundColor: '#2196f3',
  },

  viewListOut: {
    height: 50,
    alignItems: 'center',
    padding: 10,
    marginVertical: 15,
    marginHorizontal: 10,
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 5,
    backgroundColor: 'red',
  },


  textListNama: {
    flex: 3,
    fontSize: 20,
    fontWeight: 'bold',
    alignItems: 'Center',
    color: 'white',
  },


})
