import React, {
  useEffect,
  useState,
} from 'react';

import {
  Image,
  Pressable,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
  Text,
} from 'react-native';

import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  withRepeat,
} from 'react-native-reanimated';
import * as Speech from 'expo-speech';


export const fetchPokemon = async (id) => {
  const responsePokemon = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${id}`
  );

  const pokemon = await responsePokemon.json();

  const responseDetails = await fetch(
    `https://pokeapi.co/api/v2/pokemon-species/${id}`
  );
  const pokemonDetails = await responseDetails.json();

  const name = pokemonDetails.name;

  const description =
    pokemonDetails.flavor_text_entries[0]
      .flavor_text;

  const image =
    pokemon.sprites.other['official-artwork']
      .front_default;

  return { name, description, image };
};


function Home({ navigation }) {
  const dimensions = useWindowDimensions();

  const translation = useSharedValue(0);
  const overlayOpacity = useSharedValue(1);
  const lightOpacity = useSharedValue(1);

  const [pokemon, setPokemon] = useState({
    name: '',
    description: '',
    image: null,
  });

  const updatePokemon = async () => {
    const pokemonID =
      Math.floor(Math.random() * 150) + 1;

    const pokemon = await fetchPokemon(pokemonID);

    setPokemon(pokemon);

  };

  const searchPokemon = async () => {

    const pokemon = await fetchPokemon(text);

    setPokemon(pokemon);

  };

  useEffect(() => {
    updatePokemon();
  }, []);

  const startFlashingLight = () => {
    lightOpacity.value = withRepeat(
      withTiming(0.5, { duration: 250 }),
      -1,
      true
    );
  };

  const stopFlashingLight = () => {
    lightOpacity.value = withTiming(1);
  };

  const sayPokemonName = () => {
    Speech.speak(
      `${pokemon.name}: ${pokemon.description}`,
      {
        language: 'en-US',
        pitch: 0.9,
        rate: 1.0,
        onStart: () => {
          overlayOpacity.value = withTiming(0, {
            duration: 500,
          });

          startFlashingLight();
        },
        onDone: stopFlashingLight,
        onStopped: stopFlashingLight,
      }
    );
  };

  const toggleCover = () => {
    if (translation.value === 0) {
      // Open
      translation.value = withTiming(
        dimensions.width,
        { duration: 500 },
        () => {
          runOnJS(sayPokemonName)();
        }
      );
    } else {
      // Close
      translation.value = withTiming(
        0,
        {
          duration: 500,
        },
        () => {
          overlayOpacity.value = 1;
          runOnJS(updatePokemon)();
        }
      );

      Speech.stop();
    }
  };

  const searchResult = () => {

    // Close
    translation.value = withTiming(
      0,
      {
        duration: 500,
      },
      () => {
        overlayOpacity.value = 1;
        runOnJS(searchPokemon)();
      }
    );
    Speech.stop();

    // Open
    translation.value = withTiming(
      dimensions.width,
      { duration: 500 },
      () => {
        runOnJS(sayPokemonName)();
      }


    );


  };

  const coverStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translation.value },
      ],
    };
  });

  const overlayStyle = useAnimatedStyle(() => {
    return {
      opacity: overlayOpacity.value,
    };
  });

  const lightStyle = useAnimatedStyle(() => {
    return {
      opacity: lightOpacity.value,
    };
  });



  const url = "http://localhost/api/api.php";

  const saveToFavorite = () => {

    var urlAksi = url + "/?op=create";

    fetch(urlAksi, {
      method: 'post',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: "nama=" + pokemon.name
    })
      .then((response) => response.json())

  }

  const [text, setText] = useState('raichu');

  const goToFavorite = () => {
    navigation.navigate('favorit');
    Speech.stop();
  }

  return (
    <>
      <StatusBar hidden />

      <Animated.View
        pointerEvents="none"
        style={[styles.cover, coverStyle]}
      >
        <View style={styles.coverHandle} />
        <View style={styles.coverBinding} />
      </Animated.View>


      <View style={styles.pokedex}>
        <SafeAreaView>
          <View style={styles.lights}>
            <View style={styles.mainLight}>
              <Animated.View
                style={[
                  styles.mainLightInner,
                  lightStyle,
                ]}
              />
            </View>

            <View style={styles.redLight} />
            <View style={styles.orangeLight} />
            <View style={styles.greenLight} />

          </View>

          <View style={{ flexDirection: 'row' }}>

            <View style={styles.searchView}>
              <TextInput
                style={{ height: 40, paddingLeft: 5, flex: 3, backgroundColor: 'white' }}
                placeholder="Type to search"
                onChangeText={
                  text => {
                    setText(text)
                  }
                }

              />

              <TouchableOpacity
                style={styles.buttonSearch}
                onPress={searchResult}
              >
                <Text>Find Pokemon</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={styles.buttonNavigation}
              onPress={goToFavorite}
            >
              <Text>My Favorites</Text>
            </TouchableOpacity>
          </View>


          <Pressable
            onPress={toggleCover}
            style={styles.pokedexTouchable}
          >

            <View style={styles.details}>
              <View style={styles.screen}>
                <View style={styles.screenHeader}>
                  <View
                    style={
                      styles.screenHeaderHole
                    }
                  />

                  <View
                    style={
                      styles.screenHeaderHole
                    }
                  />
                </View>

                <View
                  style={styles.screenPokemon}
                >
                  <Animated.View
                    style={[
                      styles.screenPokemonOverlay,
                      overlayStyle,
                    ]}
                  />

                  <Image
                    source={{
                      uri: pokemon.image,
                    }}
                    style={
                      styles.screenPokemonImage
                    }
                  />
                </View>

                <View style={{ flexDirection: 'row', alignSelf: 'flex-end' }}>

                  <TouchableOpacity
                    style={styles.buttonAddFavorit}
                    onPress={saveToFavorite} >
                    <Text> Add to Favorite</Text>
                  </TouchableOpacity>

                  <View
                    style={styles.screenSoundHoles}
                  >
                    <View
                      style={[
                        styles.screenSoundHole,
                        styles.screenSoundHoleLarge,
                      ]}
                    />

                    <View
                      style={[
                        styles.screenSoundHole,
                        styles.screenSoundHoleSmall,
                      ]}
                    />

                    <View
                      style={[
                        styles.screenSoundHole,
                        styles.screenSoundHoleMedium,
                      ]}

                    />

                    <View
                      style={[
                        styles.screenSoundHole,
                        styles.screenSoundHoleLarge,
                      ]}
                    />
                  </View>
                </View>


              </View>

              <View style={styles.detailView}>
                <View style={styles.pokeName}>{pokemon.name}</View>
                <View style={styles.pokeDesc}>{pokemon.description} </View>
              </View>

            </View>

          </Pressable>
        </SafeAreaView>
      </View>

    </>
  );
};

export default Home;


