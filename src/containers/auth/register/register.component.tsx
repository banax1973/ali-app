import React from 'react';
import { TouchableOpacity, ButtonProps, ImageProps, View } from 'react-native';
import { StyleType, ThemedComponentProps } from '@kitten/theme';
import { Button, Text } from '@kitten/ui';
import { SignUpForm, SignUpFormData } from '@src/components/auth';
import { ProfilePhoto } from '@src/components/more';
import { ActivityIndicator, ScrollableAvoidKeyboard, ImageOverlay, textStyle } from '@src/components/common';
import { IconSource, CameraIconFill } from '@src/assets/icons';
import { AuthBackgroundImage, imageNoUser, ImageSource } from '@src/assets/images';
import styles from './styles';

interface ComponentProps {
  isLoading: boolean;
  avatar: string;
  onSignUpPress: (formData: SignUpFormData) => void;
  onSignInPress: () => void;
  onPhotoPress: () => void;
}

export type RegisterProps = ThemedComponentProps & ComponentProps;

interface State {
  formData: SignUpFormData | undefined;
}

export class Register extends React.Component<RegisterProps, State> {

  public state: State = {
    formData: undefined,
  };

  private backgroundImage: ImageSource = AuthBackgroundImage;
  private defaultImage: ImageSource = imageNoUser;
 

  private onFormDataChange = (formData: SignUpFormData) => {
    this.setState({ formData });
  };

  private onPhotoButtonPress = () => {
    this.props.onPhotoPress();
  };

  private onSignInButtonPress = () => {
    this.props.onSignInPress();
  };

  private onSignUpButtonPress = () => { 
    this.props.onSignUpPress(this.state.formData);
  };

  private renderPhotoButtonIcon = (style: StyleType): React.ReactElement<ImageProps> => {
    //const { themedStyle } = this.props;

    return CameraIconFill({ ...style, ...styles.photoButtonIcon });
  };

  private renderPhotoButton = (): React.ReactElement<ButtonProps> => {
   
    return (
      <Button
        style={styles.photoButton}
        icon={this.renderPhotoButtonIcon}
        onPress={this.onPhotoButtonPress}
      />
    );
  };

  public render(): React.ReactNode {
    const { avatar, isLoading } = this.props;

    if(isLoading){
      return( <ActivityIndicator/> )
    }
    return (
      <ScrollableAvoidKeyboard>
        <View style={styles.container}>
          <View style={styles.headerContainer}>
            <TouchableOpacity
            activeOpacity={0.75}
            onPress={this.onPhotoButtonPress}>
            <ProfilePhoto
              style={styles.photo}
              resizeMode='center'
              source={avatar!==null ? { uri: avatar } : this.defaultImage.imageSource}
              button={this.renderPhotoButton}
            />
            </TouchableOpacity>
          </View>
          <SignUpForm
            style={styles.formContainer}
            onDataChange={this.onFormDataChange}
          />
          <Button
            style={styles.signUpButton}
            textStyle={textStyle.button}
            size='giant'
            disabled={!this.state.formData}
            onPress={this.onSignUpButtonPress}>
            CREAR CUENTA
          </Button>
          <TouchableOpacity
            style={styles.signInButton}
            activeOpacity={0.75}
            onPress={this.onSignInButtonPress}>
            <Text  style={styles.signInText}> ¿ya tienes cuenta? </Text>
            <Text  style={styles.signInTextUnderline}> Inicia sesión </Text>
          </TouchableOpacity>
        </View>
      </ScrollableAvoidKeyboard>
    );
  }
}
