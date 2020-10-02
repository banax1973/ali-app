import { URL_BASE, BUSINESS_ID, BUSINESS } from '@src/config';
import React from 'react';
import { Alert } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import { ForgotPasswordFormData } from '@src/components/auth';
import { ForgotPassword } from './forgotPassword.component';

export class ForgotPasswordContainer extends React.Component<NavigationScreenProps> {

  private  postToAPI (data: ForgotPasswordFormData){
      return fetch(URL_BASE + '/api/auth/forgotPassword',
      {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          businessId: BUSINESS_ID,
          userId:     data.email, 
          business:   BUSINESS,
        }),
      })
      .then((response) =>  { //discriminates responses based on status codes received
        if (response.status==409) { Alert.alert('ERROR', 'El email ingresado no fue encontrado.')}
        return response.json();
      })
      .then((responseJson) => {
        if (responseJson.success){
          if (responseJson.data!=null){
          	Alert.alert('Todo OK','Por favor verificar en tu casilla de correo la nueva CLAVE enviada.')
            this.props.navigation.navigate({ routeName: 'Login' });
          }
        }
        else{
           Alert.alert('UPS...', 'Hubo un problema en el envío de datos.')
        }
      })
      .catch((error) =>{
        console.log(error)
        Alert.alert('UPS...', 'Hubo un problema en la comunicación. Chequee por favor su conexión de Internet');
      });  
  }
  private onResetPress = (data: ForgotPasswordFormData) => {
      this.postToAPI( data);
  };


  public render(): React.ReactNode {
    return (
      <ForgotPassword onResetPress={this.onResetPress}/>
    );
  }
}
