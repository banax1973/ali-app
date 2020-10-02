import { DELIVERY_PHONE } from '@src/config';
import React from 'react';
import { Alert, AsyncStorage } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import { More } from './more.component';
import { ShareApp } from '@src/components/more';

export class MoreContainer extends React.Component<NavigationScreenProps> {

  constructor() {
    super();
    this.state = { name: '', avatar: null, isLoading: true };
   }

  componentDidMount() {
    //to rerender the component in case user name changes
    this._navListener = this.props.navigation.addListener('didFocus', () => {

      AsyncStorage.multiGet(['@JWT_TOKEN','@USER_NAME','@AVATAR_IMG','@USER_ID']).then((data) => {
        //if jwt_token exists, thats means the user is logged in so... we show its name
        if (data[0][1]!==null){
          this.setState({ name: data[1][1], userId: data[3][1], avatar: data[2][1] })
        }
        else{
          this.setState({ name: 'Iniciar Sesión', userId: '', avatar: null})
        }
        this.setState({ isLoading: false })
      });
    });
  }

  componentWillUnmount() {
    //this.props.navigation.remove('didFocus')
    this._navListener.remove('didFocus')  
  }

  private onLinkPress = (link: string) => {
 	  //console.log(link)
    this.props.navigation.navigate(link);
  };

  private onContactPress = () => {
   //nothing
  };

  private onLinkPressWithCheck = (link: string) => {
    //console.log(link)
    AsyncStorage.getItem('@JWT_TOKEN').then((data) => {
      if (data!==null) //token exists
        this.props.navigation.navigate(link);
      else{
        Alert.alert('ATENCIÓN',
          'Para acceder, te pedimos por favor que ingreses a tu cuenta.',
           [{text: 'OK', onPress: () => this.props.navigation.navigate('MainAuth')}],
        )
      }
    });
  };

  private onShareAppPress = () => {
    ShareApp();
  };

  public render(): React.ReactNode {
    return (
        <More
          isLoading ={this.state.isLoading}
          name= {this.state.name}
          userId={this.state.userId}
          avatar= {this.state.avatar}
          onLinkPress={this.onLinkPress}
          onContactPress={this.onContactPress}
          onLinkPressWithCheck={this.onLinkPressWithCheck}
          onShareAppPress={this.onShareAppPress}
        />
    );
  }
}
