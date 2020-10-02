import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Text } from '@kitten/ui';
import { ActivityIndicator, ImageOverlay } from '@src/components/common';
import { FacebookIcon } from '@src/assets/icons';
import { AuthBackgroundImage, ImageSource } from '@src/assets/images';
import styles from './styles';

interface ComponentProps {
  onFacebookLogIn: () => void;
  onSignInPress:   () => void;
  onSignUpPress:   () => void;
}

export class MainAuth extends React.Component<ComponentProps, State> {

  private backgroundImage: ImageSource = AuthBackgroundImage;

  private onFacebookLogIn = () => {
    this.props.onFacebookLogIn();
  }
  private onSignInButtonPress = () => {
    this.props.onSignInPress();
  };

  private onSignUpButtonPress = () => {
    this.props.onSignUpPress();
  };

  public render(): React.ReactNode {
    const { isLoading } = this.props;
 
    if(isLoading){
      return( <ActivityIndicator/> )
    }
    return (
       
          <View style={styles.container}>
            <View style={styles.headerContainer}>
               <View>    
                <Text  style={styles.helloLabel} category='h1'> ¡Bienvenid@! </Text>
              </View>
            </View>
            <View style={styles.facebookContainer}>
              <Text style={styles.signUpText}>Continuar con</Text>
              <TouchableOpacity style={styles.facebookButton} onPress={this.onFacebookLogIn}>
                <FacebookIcon width={24} height={24}/>
                <Text style={styles.facebookButtonText}>Facebook</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.signUpButton}
                activeOpacity={0.75}
                onPress={this.onSignUpButtonPress}>
                <Text  style={styles.textToPush}>  REGÍSTRATE </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.signInButton}
                activeOpacity={0.75}
                onPress={this.onSignInButtonPress}>
                <Text  style={styles.signInText}>  ¿Tienes una cuenta? </Text>
                <Text  style={styles.textToPush}> Iniciar Sesión </Text>
              </TouchableOpacity>
            </View>
          </View>
    
    );
  }
}


