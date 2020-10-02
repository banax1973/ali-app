import React from 'react';
import { View } from 'react-native';
import { ThemedComponentProps } from '@kitten/theme';
import { Button, Text } from '@kitten/ui';
import { ForgotPasswordForm, ForgotPasswordFormData } from '@src/components/auth';
import { ScrollableAvoidKeyboard, ImageOverlay, textStyle } from '@src/components/common';
import { AuthBackgroundImage, ImageSource } from '@src/assets/images';
import styles from './styles';

interface ComponentProps {
  onResetPress: (formData: ForgotPasswordFormData) => void;
}

export type ForgotPasswordProps = ThemedComponentProps & ComponentProps;

interface State {
  formData: ForgotPasswordFormData | undefined;
}

export class ForgotPassword extends React.Component<ForgotPasswordProps, State> {

  public state: State = {
    formData: undefined,
  };

  private backgroundImage: ImageSource = AuthBackgroundImage;

  private onFormDataChange = (formData: ForgotPasswordFormData) => {
    this.setState({ formData });
  };

  private onResetPasswordButtonPress = () => {
    this.props.onResetPress(this.state.formData);
  };

  public render(): React.ReactNode {
   
    return (
      <ScrollableAvoidKeyboard>
       <View style={styles.container}>
          <Text
            style={styles.forgotPasswordLabel}
            appearance='alternative'
            category='h4'>
            Reset de Clave
          </Text>
          <Text
            style={styles.enterEmailLabel}
            appearance='alternative'>
            Por favor, ingresá tu email. Te enviaremos tu nueva clave a la brevedad.
          </Text>
          <ForgotPasswordForm
            style={styles.formContainer}
            onDataChange={this.onFormDataChange}
          />
          <Button
            style={styles.resetButton}
            textStyle={textStyle.button}
            size='giant'
            disabled={!this.state.formData}
            onPress={this.onResetPasswordButtonPress}>
            RESETEAR CLAVE
          </Button>
        </View>
      </ScrollableAvoidKeyboard>
    );
  }
}

