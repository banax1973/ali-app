import { URL_BASE, BUSINESS_ID } from '@src/config';
import React from 'react';
import { AsyncStorage, Alert } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import { SignInFormData } from '@src/components/auth';
import { Login } from './login.component';
import { _saveItem, GetShortName } from '@src/core/utils';

    
export class LoginContainer extends React.Component<NavigationScreenProps> {

  constructor() {
    super();
    this.state = { name: '', userId: '', isLoading: true };
  }
 

  componentDidMount() {
  
    this._navListener = this.props.navigation.addListener('didFocus', () => {
      //reading the saved values to decide whether show or not the textinput "Email"
      AsyncStorage.multiGet(['@USER_NAME','@USER_ID']).then((data) => {
        this.setState({ name: GetShortName(data[0][1]), userId: data[1][1], isLoading: false })
      });
    });
  }

  private  postToAPI (data: SignInFormData, pushToken: any){
    return fetch(URL_BASE + '/api/auth/loginUser',
      {
              method: 'POST',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                businessId: BUSINESS_ID,
                userId: data.email, 
                password: data.password,
                deviceId: pushToken
              }),
      })
      .then((response) =>  { //discriminates responses based on status codes received
        if (response.status==404) { Alert.alert('ERROR', 'El email ingresado es incorrecto.');}
        if (response.status==401) { Alert.alert('ERROR', 'La clave ingresada es incorrecta.');}
        return response.json();
      })
      .then((responseJson) => {
        if (responseJson.success){
          if (responseJson.data!=null){
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

  private onSignInPress = (data: SignInFormData) => {
    
    this.setState({ isLoading: true })
    this.postToAPI (data, 'push_token_mock');
       
  };

  private onSignUpPress = () => {
    this.props.navigation.navigate({ routeName: 'Register' });
  };

  private onForgotPasswordPress = () => {
    this.props.navigation.navigate({ routeName: 'ForgotPassword' });
  };

  private onChangeUserPress = () => {
    AsyncStorage.multiRemove(['@USER_NAME','@USER_ID']).then((err) => {
      if (err) console.log(err)
      this.setState({ name: null, userId: null })
    });
  }

  public render(): React.ReactNode {
    return (
      <Login
        isLoading ={this.state.isLoading}
        name      ={this.state.name}
        userId    ={this.state.userId}
        onSignInPress={this.onSignInPress}
        onSignUpPress={this.onSignUpPress}
        onForgotPasswordPress={this.onForgotPasswordPress}
        onChangeUserPress={this.onChangeUserPress}
      />
    );
  }
}
