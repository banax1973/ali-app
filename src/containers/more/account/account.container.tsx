import { URL_BASE, BUSINESS_ID } from '@src/config';
import React from 'react';
import { AsyncStorage, Alert } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import { Account } from './account.component';
import { _saveItem } from '@src/core/utils';

export class AccountContainer extends React.Component<NavigationScreenProps> {

  constructor() {
    super();
    this.state = { isLoading: false };
  }

  private onLinkPress = (link: string) => {
 	  //console.log(link)
    this.props.navigation.navigate(link);
 
  };
 
  private  postToAPI (userId: string, pushToken: any){
    return fetch(URL_BASE + '/api/auth/logoutUser',
      {
              method: 'POST',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                businessId: BUSINESS_ID,
                userId:   userId, 
                deviceId: pushToken
              }),
      })
      .then((response) =>  { 
        return response.json();
      })
      .then((responseJson) => {
        if (responseJson.success){
          AsyncStorage.multiRemove(['@JWT_TOKEN']).then((err) => { 
            if (err) console.log(err)
            this.props.navigation.navigate({ routeName: 'MainAuth' });
          });
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
  private onLogout = () => {

    this.setState({ isLoading: true })
  
    
    AsyncStorage.getItem('@USER_ID').then((data) => {
      //_saveItem('@USER_NAME', '');
      //_saveItem('@USER_ID', '');
      //_saveItem('@AVATAR_IMG', '');
    
       this.postToAPI(data, 'push_token_mock');
    });
  
  };

  public render(): React.ReactNode {
    return (
        <Account
           isLoading    ={this.state.isLoading}
           onLinkPress  ={this.onLinkPress}
           onLogoutPress={this.onLogout}
        />
    );
  }
}
