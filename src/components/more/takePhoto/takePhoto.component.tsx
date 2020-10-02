import * as React from 'react';
import { View, Text, TouchableHighlight } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import styles from './styles';

export class TakePhoto extends React.Component {
  state = {
    image: null,
  };

  render() {
    let { image } = this.state;

    return (
      <View style={styles.container}>
        <TouchableHighlight 
          style = {styles.buttonContainer}
          onPress={this._pickImage}> 
         <Text style = {[styles.button, styles.btnOP]}>
            ELEGIR DE LIBRERIA
          </Text>
        </TouchableHighlight>
        <TouchableHighlight 
          style = {styles.buttonContainer}
          onPress={this._takePhoto}> 
         <Text style = {[styles.button, styles.btnOP]}>
            TOMARME UNA FOTO
          </Text>
        </TouchableHighlight>
        <TouchableHighlight 
          style = {styles.buttonContainer}
          onPress={this.onCancel}> 
         <Text style = {[styles.button, styles.btnCancel]}>
            CANCELAR
          </Text>
        </TouchableHighlight>
      </View>
    );
  }

  componentDidMount() {
    this.getPermissionAsync();
  }

  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Necesitamos tu permiso para acceder a la cámara del dispositivo');
      }
    }
  }

  onCancel = () => {
    this.setState({ image: null });
    this.goBack();
  };

  goBack(){
    const { navigation } = this.props;
    navigation.goBack();
    navigation.state.params.onSelectPhoto({ avatar: this.state.image });
  }

  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [3, 3],
      quality: 1
    });

    console.log(result);

    if (!result.cancelled) {
      this.setState({ image: result.uri });
      this.goBack();
    }
  };

  _takePhoto = async () => {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [3, 3],
      quality: 1
    });

    console.log(result);

    if (!result.cancelled) {
      this.setState({ image: result.uri });
      this.goBack();
    }
  };
}