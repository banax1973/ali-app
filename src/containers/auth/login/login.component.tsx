import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { ThemedComponentProps } from '@kitten/theme';
import { Button, Text } from '@kitten/ui';
import { SignInForm, SignInFormData} from '@src/components/auth';
import { ActivityIndicator, ScrollableAvoidKeyboard, ImageOverlay, textStyle } from '@src/components/common';
import { AuthBackgroundImage, ImageSource } from '@src/assets/images';
import styles from './styles';

interface ComponentProps {
  onForgotPasswordPress: () => void;
  onSignInPress: (formData: SignInFormData) => void;
  onSignUpPress: () => void;
}

export type LoginProps = ThemedComponentProps & ComponentProps;

interface State {
  formData: SignInFormData;
}

export class Login extends React.Component<LoginProps, State> {

  public state: State = {
    formData: undefined,
  };

  private backgroundImage: ImageSource = AuthBackgroundImage;

  private onSignInButtonPress = () => {
    this.props.onSignInPress(this.state.formData);
  };

  private onSignUpButtonPress = () => {
    this.props.onSignUpPress();
  };

  private onChangeUserButtonPress = () => {
    this.props.onChangeUserPress();
  };
  private onForgotPasswordButtonPress = () => {
    this.props.onForgotPasswordPress();
  };

  private onFormDataChange = (formData: SignInFormData) => {
    this.setState({ formData });
  };

  renderWelcomeMsg() {
    const { name } = this.props;
  
    if (name!==null) { //if name is already got from asyncStorage, we change the welcome message
      return (
        <View>
          <View> 
            <Text style={styles.helloLabel} 
                  category='h1' 
                  numberOfLines={1}
                  ellipsizeMode='tail'>
                  {name},  
            </Text>
            <Text  style={styles.helloLabel} category='h4'> ¡Hola de nuevo! </Text>
          </View>
          <View style={styles.changeUserContainer}>
              <Button
                style={styles.changeUserButton}
                textStyle={styles.changeUserText}
                appearance='ghost'
                activeOpacity={0.75}
                onPress={this.onChangeUserButtonPress}>
                Cambiar usuario
              </Button>
          </View>
        </View>
      );
    } 
    else {
      return (
        <View>    
          <Text  style={styles.helloLabel} category='h1'> ¡Hola! </Text>
          <Text  style={styles.helloLabel2} > Ingresa por favor email y clave </Text>
        </View>
      );
    }
  }
  public render(): React.ReactNode {
    const { name, userId, isLoading } = this.props;
 
    if(isLoading){
      return( <ActivityIndicator/> )
    }
    return (
       
          <View style={styles.container}>
            <View style={styles.headerContainer}>
              {this.renderWelcomeMsg()}
            </View>
            <View style={styles.formContainer}>
              <SignInForm
                userId= {userId}
                onForgotPasswordPress={this.onForgotPasswordButtonPress}
                onDataChange={this.onFormDataChange}
              />
            </View>
            <View style={styles.buttonContainer}>
              <Button
                style={styles.signInButton}
                textStyle={textStyle.button}
                size='giant'
                disabled={!this.state.formData}
                onPress={this.onSignInButtonPress}>
                INGRESAR
              </Button>
              <TouchableOpacity
                style={styles.signUpButton}
                activeOpacity={0.75}
                onPress={this.onSignUpButtonPress}>
                <Text  style={styles.signUpText}>  ¿No tienes una cuenta? </Text>
                <Text  style={styles.signUpTextUnderline}> Regístrate AQUÍ </Text>
              </TouchableOpacity>
            </View>
          </View>
    );
  }
}


