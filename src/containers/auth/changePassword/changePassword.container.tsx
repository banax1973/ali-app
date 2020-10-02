import { URL_BASE, BUSINESS_ID } from '@src/config';
import React from 'react';
import { AsyncStorage, Alert } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import { ChangePasswordFormData } from '@src/components/auth';
import { ChangePassword } from './changePassword.component';
    
export class ChangePasswordContainer extends React.Component<NavigationScreenProps> {

  constructor() {
    super();
    this.state = { isLoading: false };
  }

  private onChangePasswordPress = (dataPass: ChangePasswordData) => {
    
    this.setState({ isLoading: true })
    AsyncStorage.multiGet(['@USER_ID', '@JWT_TOKEN']).then((data) => {
        this.postToAPI(data[0][1], data[1][1], dataPass);
    });
  };

  private  postToAPI (userId: string, token: string, data: ChangePasswordData){
    return fetch(URL_BASE + '/api/auth/changePassword',
      {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'x-access-token': token,
        },
        body: JSON.stringify({
          businessId: BUSINESS_ID,
          userId: userId,
          oldPassword: data.oldPassword,
          password: data.password,
        }),
      })
       .then((response) =>  { //discriminates responses based on status codes received
        if (response.status==409) { Alert.alert('ERROR', 'El email no fue encontrado.')}
        if (response.status==404) { Alert.alert('ERROR', 'La clave actual es incorrecta.')}
        if (response.status==403 || response.status==405 ) { //token error
          Alert.alert('Credenciales Vencidas', 'Por favor ingrese sus credenciales nuevamente.')
        }
        return response.json();
      })
      .then((responseJson) => {
        if (responseJson.success){
          Alert.alert('Todo OK', 'La clave fue cambiada con éxito!');
          this.props.navigation.goBack();     
        }
        
        this.setState({ isLoading: false })
      })
      .catch((error) =>{
        console.error(error);
        this.setState({ isLoading: false })
      });  
  }

  public render(): React.ReactNode {
    return (
      <ChangePassword
        isLoading     ={this.state.isLoading}
        onChangePasswordPress ={this.onChangePasswordPress}
      />
    );
  }
}
