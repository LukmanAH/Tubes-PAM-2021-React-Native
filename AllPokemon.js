import React, { Component } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity } from 'react-native';
import { StyleSheet } from 'react-native';

const AllPokemon = ({ navigation }) => {

  const Back = () => {
    navigation.navigate('profil')
  }

  return (
    <View style={{ flexDirection: 'column', flex: 1 }}>
      <View style={styles.navView}>

        <TouchableOpacity
          style={styles.buttonNavigation}
          onPress={Back}
        >
          <Text>Back</Text>
        </TouchableOpacity>

        <View style={styles.titlePageView}>
          <Text>All Pokemon</Text>
        </View>

      </View>
      <ListAllPokemon />
    </View >
  );
}

class ListAllPokemon extends Component {
  constructor(props) {
    super(props)
    this.state = {
      active: false,
      text: '123',
      pokemons: [],
    }
  }
  onPress = () => {
    this.setState({ active: !this.state.active });
  }

  fetchPokemons = () => {
    const url = 'http://pokeapi.co/api/v2/pokemon/?limit=11&offset=0'
    fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        this.setState({ pokemons: responseJson });
        console.log('------', this.state.pokemons)
        return responseJson.movies;
      })
      .catch((error) => {
        console.error(error);
      });
  }



  render() {
    return (
      <View style={styles.viewWrapper}>
        <View style={{ flex: 1, backgroundColor: 'lightgreen' }} >
          <Text onPress={this.fetchPokemons}>
            Welcome to React Native!
          </Text>
        </View>



        <View style={styles.viewData}>
          {
            this.state.pokemons.map((val, index) => (
              <View style={styles.viewList} key={index}>
                <Text style={styles.textListNama}> {val.name}</Text>
              </View>
            ))
          }
        </View>
      </View>


    );
  }
}

export default AllPokemon;


const styles = StyleSheet.create({
  viewWrapper: {
    flex: 11,
    backgroundColor: 'lightblue'
  },
  viewForm: {
    flex: 2,
    padding: 10
  },
  viewData: {
    flex: 4
  },
  textInput: {
    padding: 10,
    fontSize: 15,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    marginBottom: 10,
    backgroundColor: '#dedede'
  },
  viewList: {
    flexDirection: 'row',
    padding: 10,
    marginVertical: 5,
    marginHorizontal: 5,
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 5,
    backgroundColor: 'white',

  },
  textListNama: {
    flex: 3,
    fontSize: 20,
    fontWeight: 'bold'
  },

  textListDelete: {
    marginHorizontal: 5,
    color: 'white',
    borderWidth: 1,
    borderRadius: 3,
    borderColor: 'black',
    backgroundColor: 'red',
  },


  navView: {
    flexDirection: 'row',
    flex: 1,
    backgroundColor: 'red',
    borderBottomWidth: 2,
    borderBottomColor: 'white',
  },
  buttonNavigation: {
    backgroundColor: 'yellow',
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    marginHorizontal: 10,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: 'black',
    fontWeight: 'bold',
  },

  titlePageView: {
    flex: 5,
    backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    marginRight: 10,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: 'white',
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
})
