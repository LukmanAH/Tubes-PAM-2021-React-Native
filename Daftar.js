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
  Alert,
  BackHandler,
  TouchableOpacity,
} from 'react-native';

class Daftar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {
        username: '',
        nama_lengkap: '',
        password: '',
      },
    };
  }

  render() {
    const {
      username,
      nama_lengkap,
      password,
    } = this.state.formData;

    const { navigation } = this.props;

    const Back = () => {
      navigation.navigate('home');
    };

    return (
      <ScrollView style={{ backgroundColor: '#FFEB66', }}>
        <KeyboardAvoidingView style={styles.container} enabled>
          <Text style={styles.heading}>Daftar Akun</Text>
          <View style={[styles.row, { marginTop: 10 }]}>
            <Text style={styles.label}>Nama Lengkap</Text>

            <TextInput
              style={styles.textinput}
              onChangeText={nama_lengkap =>
                this.setState(prevState => ({
                  formData: {
                    ...prevState.formData,
                    nama_lengkap,
                  },
                }))
              }
              value={nama_lengkap}
            />
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Username</Text>
            <TextInput
              style={styles.textinput}
              onChangeText={username =>
                this.setState(prevState => ({
                  formData: {
                    ...prevState.formData,
                    username,
                  },
                }))
              }
              value={username}
            />
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Password</Text>
            <TextInput
              secureTextEntry={true}
              style={styles.textinput}
              onChangeText={password =>
                this.setState(prevState => ({
                  formData: {
                    ...prevState.formData,
                    password,
                  },
                }))
              }
              value={password}
            />
          </View>
          <View style={{ paddingTop: 20, width: WindowWidth - 40 }}>
            <Button title="Daftar" onPress={this._saveData} />
          </View>

          {/* <View>
            <Text>{JSON.stringify(this.state.formData)}</Text>
          </View> */}
          <Text style={{ paddingTop: 5 }}>
            Sudah punya akun ?{' '}
            <Text
              style={styles.highlight}
              onPress={() => navigation.navigate('login')}>
              Login
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
  _saveData = async () => {
    const { navigation } = this.props;
    const {
      username,
      nama_lengkap,
      password,
    } = this.state.formData;
    if (username == '' || nama_lengkap == '' || password == '') {
      alert('Harap isi semua data');
    } else {
      fetch('http://localhost/api/api.php/?op=daftar', {
        method: 'post',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(this.state.formData),
      })
        .then(response => response.json())
        .then(responseJson => {
          if (responseJson == 'Akun berhasil di daftarkan') {
            setTimeout(() => {
              alert(responseJson);
              navigation.navigate('login');

            }, 1000);
          } else {
            alert(JSON.stringify(responseJson));
            // Alert.alert('', 'Username atau email sudah digunakan', [
            //   {
            //     text: 'OK',
            //   },
            // ]);
          }
        })
        .catch(error => {
          console.error(error);
        });
    }
  };
}

export default Daftar;

const WindowWidth = Dimensions.get('window').width;
const WindowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },

  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2196f3',
    marginTop: WindowHeight / 4,
    paddingBottom: 40,
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

  row: {
    alignSelf: 'flex-start',
    marginBottom: 30,
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