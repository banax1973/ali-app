import React from 'react';
import { TouchableOpacity, ButtonProps, ImageProps, View } from 'react-native';
import { ThemedComponentProps } from '@kitten/theme';
import { Button, Text } from '@kitten/ui';
import { ChangePasswordForm, ChangePasswordFormData } from '@src/components/auth';
import { ActivityIndicator, ScrollableAvoidKeyboard, ImageOverlay, textStyle } from '@src/components/common';
import { AuthBackgroundImage, ImageSource } from '@src/assets/images';
import styles from './styles';

interface ComponentProps {
  onChangePasswordPress: (formData: ChangePasswordFormData) => void;
}

export type ChangePasswordProps = ThemedComponentProps & ComponentProps;

interface State {
  formData: ChangePasswordFormData | undefined;
}

export class ChangePassword extends React.Component<ChangePasswordProps, State> {

  public state: State = {
    formData: undefined,
  };

  private backgroundImage: ImageSource = AuthBackgroundImage;

  private onFormDataChange = (formData: ChangePasswordFormData) => {
    this.setState({ formData });
  };

  private onChangePasswordButtonPress = () => { 
    this.props.onChangePasswordPress(this.state.formData);
  };
 
  public render(): React.ReactNode {
    const { isLoading } = this.props;

    if(isLoading){
      return( <ActivityIndicator/> )
    }
    return (
      <ScrollableAvoidKeyboard>
       <View style={styles.container}>
          <Text
            style={styles.changePasswordLabel}
            appearance='alternative'
            category='h4'>
            Cambio de Clave
          </Text>
          <Text
            style={styles.warningLabel}
            appearance='alternative'>
            Por favor, ingresá tu clave actual y la nueva. Verifica que esté todo correcto antes de hacer el cambio.
          </Text>
          <ChangePasswordForm
            style={styles.formContainer}
            onDataChange={this.onFormDataChange}
          />
          <Button
            style={styles.changeButton}
            textStyle={textStyle.button}
            size='giant'
            disabled={!this.state.formData}
            onPress={this.onChangePasswordButtonPress}>
            CAMBIAR CLAVE
          </Button>
        </View>
      </ScrollableAvoidKeyboard>
    );
  }
}

