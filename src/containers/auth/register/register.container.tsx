import { URL_BASE, BUSINESS_ID } from '@src/config';
import React from 'react';
import { Alert } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import { SignUpFormData } from '@src/components/auth';
import { Register } from './register.component';
import { _saveItem } from '@src/core/utils/asyncStorageFunctions';

    
export class RegisterContainer extends React.Component<NavigationScreenProps> {

  constructor() {
    super();
    this.state = { isLoading: false, avatar: null, newAvatar: false };
  }

  onSelectPhoto = data => {
    if (data.avatar!==null){
      this.setState({avatar: data.avatar, newAvatar: true});
    }
  };

  private onSignUpPress = (data: SignUpFormData) => {
    console.log('SignUpFormData: ',data)
    this.setState({ isLoading: true })
    if (this.state.avatar!==null) {
        _saveItem('@AVATAR_IMG', this.state.avatar);
        this.setState({newAvatar: false});
    }
  
      data = {...data, email: data.email.trim(), name: data.name.trim()} //trim name and email
      this.postToAPI (data, 'push_token_mock');
       
  };

  private onSignInPress = () => { 
    this.props.navigation.navigate({ routeName: 'Login' });
  };

  private onUploadPhotoButtonPress = () => {
    this.props.navigation.navigate("TakePhoto", { onSelectPhoto: this.onSelectPhoto });
  };
  
  private  postToAPI (data: SignUpFormData, pushToken: any){
    return fetch(URL_BASE + '/api/auth/registerUser',
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          businessId: BUSINESS_ID,
          userId: data.email,
          name: data.name,
          password: data.password,
          deviceId: pushToken,
        }),
      })
       .then((response) =>  { //discriminates responses based on status codes received
        if (response.status==409) { Alert.alert('ERROR', 'El email ya está en uso.');}
        return response.json();
      })
      .then((responseJson) => {
        if (responseJson.success){
          if (responseJson.data!=null){
            Alert.alert('Felicitaciones!', 'Tu cuenta fue creada con éxito.');
            _saveItem('@JWT_TOKEN', responseJson.data); //saving the server´s jwt token 
            _saveItem('@USER_NAME', responseJson.name); 
            _saveItem('@USER_ID', data.email); 
            this.props.navigation.navigate({ routeName: 'Home' });
          }
        }
        else{
           Alert.alert('UPS...', 'Hubo un problema en el envío de datos.')
        }
        this.setState({ isLoading: false })
      })
      .catch((error) =>{
        console.log(error)
        Alert.alert('UPS...', 'Hubo un problema en la comunicación. Chequee por favor su conexión de Internet');
        this.setState({ isLoading: false })
      });  
  }

  public render(): React.ReactNode {
    return (
      <Register
        isLoading     ={this.state.isLoading}
        avatar        ={this.state.avatar}
        onSignUpPress ={this.onSignUpPress}
        onSignInPress ={this.onSignInPress}
        onPhotoPress  ={this.onUploadPhotoButtonPress}
      />
    );
  }
}
