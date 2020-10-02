import React from 'react';
import { StyleSheet, View, ViewProps, Switch } from 'react-native';
import { ThemedComponentProps } from '@kitten/theme';
import { Button } from '@kitten/ui';
import { textStyle, ValidationInput } from '@src/components/common';
import { EyeOffIconFill, EmailIconFill } from '@src/assets/icons';
import { EmailValidator, PasswordValidator } from '@src/core/validators';
import { SignInFormData } from './type';
import { theme } from '@src/config';

interface ComponentProps {
  onForgotPasswordPress: () => void;
  /**
   * Will emit changes depending on validation:
   * Will be called with form value if it is valid, otherwise will be called with undefined
   */
  onDataChange: (value: SignInFormData | undefined) => void;
}

export type SignInFormProps = ThemedComponentProps & ViewProps & ComponentProps;

interface State {
  email: string | undefined;
  password: string | undefined;
  showPassword: boolean;
}

export class SignInForm extends React.Component<SignInFormProps, State> {

  constructor(props) {
    super(props);
    this.toggleSwitch = this.toggleSwitch.bind(this);
  }

  toggleSwitch() {
    this.setState({ showPassword: !this.state.showPassword });
  }

  public state: State = {
    email: this.props.userId,
    password: undefined,
    showPassword: true,
  };

  public componentDidUpdate(prevProps: SignInFormProps, prevState: State) {
    const oldFormValid: boolean = this.isValid(prevState);
    const newFormValid: boolean = this.isValid(this.state);

    const isStateChanged: boolean = this.state !== prevState;
    const becomeValid: boolean = !oldFormValid && newFormValid;
    const becomeInvalid: boolean = oldFormValid && !newFormValid;
    const remainValid: boolean = oldFormValid && newFormValid;

    if (becomeValid) {
      this.props.onDataChange(this.state);
    } else if (becomeInvalid) {
      this.props.onDataChange(undefined);
    } else if (isStateChanged && remainValid) {
      this.props.onDataChange(this.state);
    }
  }

  private onForgotPasswordButtonPress = () => {
    this.props.onForgotPasswordPress();
  };

  private onEmailInputTextChange = (email: string) => {
    this.setState({ email: email });
  };

  private onPasswordInputTextChange = (password: string) => {
    this.setState({ password });
  };

  private isValid = (value: SignInFormData): boolean => {
    const { email, password } = value;

    if (this.props.userId!==null){
      return password !== undefined;
    }
    else{
      return email !== undefined
        && password !== undefined;
    }
  };

  renderValidationInputField() {
   
    if (this.props.userId!==null) { //if userId is already got from asyncStorage, we don´t show Email input field
      return (null);
    } 
    else {
      return (
          <ValidationInput
            style={styles.emailInput}
            keyboardType = 'email-address'
            textStyle={textStyle.paragraph}
            labelStyle={textStyle.label}
            autoCapitalize='none'
            placeholder='Email'
            icon={EmailIconFill}
            validator={EmailValidator}
            onChangeText={this.onEmailInputTextChange}
          />
      );
    }
  }
  public render(): React.ReactNode {
    const { style, ...restProps } = this.props;

    return (
      <View style={[styles.container, style]}
        {...restProps}>
        {this.renderValidationInputField()}
        <View style={ styles.passwordContainer }>
          <ValidationInput
              style={styles.passwordInput}
              textStyle={textStyle.paragraph}
              autoCapitalize='none'
              secureTextEntry={this.state.showPassword}
              placeholder='Clave'
              validator={PasswordValidator}
              onChangeText={this.onPasswordInputTextChange}
          />
          <Switch
              style={styles.passwordSwitch}
              onValueChange={this.toggleSwitch}
              value={!this.state.showPassword}
          />  
        </View>
        <View style={styles.forgotPasswordContainer}>
          <Button
            //style={styles.forgotPasswordButton}
            textStyle={styles.forgotPasswordText}
            appearance='ghost'
            activeOpacity={0.75}
            onPress={this.onForgotPasswordButtonPress}>
            Olvidaste tu clave?
          </Button>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
    //minHeight: 300,
  },
  passwordContainer: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 16,
  },
  forgotPasswordContainer: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
  },

  forgotPasswordText: {
    fontSize: 15,
    color: theme.authTextHint,
    ...textStyle.subtitle,
    textDecorationLine: 'underline'
  },
  emailInput: {
    backgroundColor: theme.authInputBackground,
  },
 
  passwordInput: {
    flex: 3,
    backgroundColor: theme.authInputBackground,
    color: 'black'
  },
  passwordSwitch: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'flex-start',
    marginTop: 6,
  },
})
