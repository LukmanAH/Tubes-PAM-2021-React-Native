import React, { Component } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { style } from './Style'



class Favorit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nama: '',
      listData: [],
    };
    this.url = "http://localhost/api/api.php";
  }

  componentDidMount() {
    this.ambilListData()
  }

  async ambilListData() {
    await fetch(this.url)
      .then((response) => response.json())
      .then((json) => {
        console.log('Hasil yang didapat: ' + JSON.stringify(json.data.result));
        this.setState({ listData: json.data.result });
      })
      .catch((error) => {
        console.log(error);
      })
  }


  tambahin() {
    this.setState({ nama: pokemon.name });
    this.klikSimpan();

  }

  klikSimpan() {
    if (this.state.nama == '') {
      alert('Silakan masukkan nama');
    } else {
      var urlAksi = this.url + "/?op=create";

      fetch(urlAksi, {
        method: 'post',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: "nama=" + this.state.nama
      })
        .then((response) => response.json())
        .then((json) => {
          this.setState({ nama: '' });
          this.ambilListData();
        })
    }
  }

  async klikDelete(id) {
    await fetch(this.url + "/?op=delete&id=" + id)
      .then((response) => response.json())
      .then((json) => {
        alert('Data berhasil didelete');
        this.ambilListData();
      })
      .catch((error) => {
        console.log(error)
      })
  }

  render() {
    return (
      <View style={style.viewWrapper}>
        <View style={style.viewData}>
          {
            this.state.listData.map((val, index) => (
              <View style={style.viewList} key={index}>
                <Text style={style.textListNama}>{val.nama}</Text>
                <Text style={style.textListDelete} onPress={() => this.klikDelete(val.id)}>Delete</Text>
              </View>
            ))
          }
        </View>

        <View style={style.viewForm}>
          <TextInput
            style={style.textInput}
            placeholder="Masukkan Nama"
            value={this.state.nama}
            onChangeText={(text) => this.setState({ nama: text })}
          >
          </TextInput>

          <Button
            title="Masukkan Data"
            onPress={() => this.klikSimpan()}>

          </Button>
        </View>
      </View>
    );
  }
}

export default Favorit;
