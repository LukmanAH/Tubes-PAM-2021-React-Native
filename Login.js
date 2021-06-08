import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  TextInput,
  Button,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
  }



  render() {
    const { navigation } = this.props;

    const Back = () => {
      navigation.navigate('home');
    };

    return (
      <ScrollView style={{ backgroundColor: '#FFEB66', }}>
        <KeyboardAvoidingView style={styles.container} enabled>
          <Text style={styles.heading}>Login POKEDEX</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Username</Text>
            <TextInput
              style={styles.textinput}
              onChangeText={username => this.setState({ username })}
            />
          </View>


          <View style={styles.row}>
            <Text style={styles.label}>Password</Text>
            <TextInput
              secureTextEntry={true}
              style={styles.textinput}
              onChangeText={password => this.setState({ password })}
            />
          </View>

          <View
            style={{ paddingTop: 20, width: WindowWidth - 40, borderRadius: 10 }}>
            <Button title="Masuk" onPress={this._login} />
          </View>

          <Text style={{ paddingTop: 5 }}>
            Belum punya akun ?{' '}
            <Text
              style={styles.highlight}
              onPress={() => navigation.navigate('daftar')}
            >
              Daftar
            </Text>
          </Text>

        </KeyboardAvoidingView>
        <TouchableOpacity
          style={styles.buttonNavigation}
          onPress={Back}
        >
          <Text style={{ color: 'white' }}>Batal</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }

  _login = async () => {
    const { username, password } = this.state;

    if (username == '') {
      alert('Username masih kosong');
    } else if (password == '') {
      alert('Password masih kosong');
    } else {
      fetch('http://localhost/api/api.php/?op=login', {
        method: 'post',
        header: {
          Accept: 'application/json',
          'Content-type': 'application/json',
        },
        body: JSON.stringify(this.state),
      })
        .then(response => response.json())
        .then(responseJson => {
          if (responseJson == 'ok') {
            // redirect to Beranda page
            this.props.navigation.navigate('profil', {
              username: username,
            });
          } else {
            alert(responseJson);
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  };
}

export default Login;

const WindowWidth = Dimensions.get('window').width;
const WindowHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },

  buttonNavigation: {
    backgroundColor: "red",
    width: 70,
    height: 35,
    alignItems: "center",
    alignSelf: 'center',
    justifyContent: "center",
    marginTop: 10,
    fontWeight: "bold",
  },

  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2196f3',
    marginTop: WindowHeight / 4,
    paddingBottom: 40,
  },

  row: {
    alignContent: 'center',
    alignSelf: 'center',
    marginBottom: 30,
    justifyContent: 'center',
  },
  label: {
    color: '#696969',
    fontSize: 16,
  },
  textinput: {
    borderBottomWidth: 1,
    borderBottomColor: '#2196f3',
    width: WindowWidth - 40,
    paddingTop: 5,
    paddingBottom: 1,
    fontSize: 14,
  },
  highlight: {
    fontWeight: 'bold',
    color: 'green',
  },
});