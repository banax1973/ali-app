import { URL_BASE, BUSINESS_ID } from '@src/config';
import React from 'react';
import { AsyncStorage, Alert, View } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import { MainAuth } from './mainAuth.component';
import { _saveItem } from '@src/core/utils';
import * as Facebook from 'expo-facebook';
    
export class MainAuthContainer extends React.Component<NavigationScreenProps> {

  constructor() {
    super();
    this.state = { isLoading: false };
  }
 
  private onFacebookLogIn = async () => {
    try {
      await Facebook.initializeAsync('2775014922761800');
      const {
        type,
        token,
        expires,
        permissions,
        declinedPermissions,
      } = await Facebook.logInWithReadPermissionsAsync({
        permissions: ['public_profile','email'],
      });
      if (type === 'success') {
        // Get the user's name using Facebook's Graph API
        fetch(`https://graph.facebook.com/me?access_token=${token}&fields=id,email,first_name,last_name,picture.height(500)`)
          .then(response => response.json())
          .then(data => {
            this.fbLogin(data);
            //console.log('data from FB: ', data)
          })
          .catch(e => console.log(e))
      } 
      else {
        Alert.alert('ERROR de autenticación','No hemos podido recibir tus datos desde Facebook.')
      }
    } catch ({ message }) {
      console.log( 'Error de FB: ', message)
      Alert.alert('ERROR de autenticación','No hemos podido recibir tus datos desde Facebook.')
    }
  }

  private  postToAPI (userData: any, pushToken: any){
    return fetch(URL_BASE + '/api/auth/fbLogin',
      {
              method: 'POST',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                businessId: BUSINESS_ID,
                userId:     userData.email,
                name:       userData.first_name,
                surname:    userData.last_name, 
                deviceId:   pushToken
              }),
      })
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.success){
          if (responseJson.data!=null){
            _saveItem('@JWT_TOKEN', responseJson.data); //saving the server´s jwt token 
            _saveItem('@USER_NAME', responseJson.name); 
            _saveItem('@USER_SURNAME', userData.last_name); 
            _saveItem('@USER_ID', userData.email); 
            _saveItem('@AVATAR_IMG', userData.picture.data.url); 
            
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

  private fbLogin = (userData: any) => {
    if (userData.email==null || userData.email=='' || userData.email===undefined)
      Alert.alert('ERROR de autenticación','No hemos podido recibir tus datos desde Facebook.')
    
    else{ 
      this.setState({ isLoading: true })
      this.postToAPI (userData, 'push_token_mock');
     
    } 
     
  };
  private onSignInPress = () => {
    this.props.navigation.navigate({ routeName: 'Login' });
  };

  private onSignUpPress = () => {
    this.props.navigation.navigate({ routeName: 'Register' });
  };

 
  public render(): React.ReactNode {
    return (
       <MainAuth
        isLoading       = {this.state.isLoading}
        onFacebookLogIn = {this.onFacebookLogIn}
        onSignInPress   = {this.onSignInPress}
        onSignUpPress   = {this.onSignUpPress}
      />
    );
  }
}

 
      