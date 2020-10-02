import React from 'react';
import { StyleSheet, View, ViewProps, Switch} from 'react-native';
import { ThemedComponentProps } from '@kitten/theme';
import { CheckBox } from '@kitten/ui';
import { textStyle, ValidationInput } from '@src/components/common';
import { EmailIconFill, EyeOffIconFill, PersonIconFill } from '@src/assets/icons';
import { EmailValidator, NameValidator, PasswordValidator } from '@src/core/validators';
import { SignUpFormData } from './type';
import { theme } from '@src/config';

interface ComponentProps {
  /**
   * Will emit changes depending on validation:
   * Will be called with form value if it is valid, otherwise will be called with undefined
   */
  onDataChange: (value: SignUpFormData | undefined) => void;
}

export type SignUpFormProps = ThemedComponentProps & ViewProps & ComponentProps;

interface State {
  name: string | undefined;
  email: string | undefined;
  password: string | undefined;
}

export class SignUpForm extends React.Component<SignUpFormProps, State> {

  constructor(props) {
    super(props);
    this.toggleSwitch = this.toggleSwitch.bind(this);
  }

  toggleSwitch() {
    this.setState({ showPassword: !this.state.showPassword });
  }

  public state: State = {
    name: undefined,
    email: undefined,
    password: undefined,
    showPassword: true,
  };

  public componentDidUpdate(prevProps: SignUpFormProps, prevState: State) {
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

  private onUsernameInputTextChange = (name: string) => {
    this.setState({ name });
  };

  private onEmailInputTextChange = (email: string) => {
    this.setState({ email });
  };

  private onPasswordInputValidationResult = (password: string) => {
    this.setState({ password });
  };

  private isValid = (value: SignUpFormData): boolean => {
    const { name, password, email } = value;

    return name !== undefined
      && password !== undefined
      && email !== undefined ;
  };

  public render(): React.ReactNode {
    const { style, ...restProps } = this.props;

    return (
      <View
        style={[styles.container, style]}
        {...restProps}>
        <View style={styles.formContainer}>
          <ValidationInput
            style={styles.nameInput}
            textStyle={textStyle.paragraph}
            autoCapitalize='words'
            placeholder='Nombre'
            icon={PersonIconFill}
            validator={NameValidator}
            onChangeText={this.onUsernameInputTextChange}
          />
          <ValidationInput
            style={styles.emailInput}
            keyboardType = 'email-address'
            textStyle={textStyle.paragraph}
            autoCapitalize='none'
            placeholder='Email'
            icon={EmailIconFill}
            validator={EmailValidator}
            onChangeText={this.onEmailInputTextChange}
          />
         
          <View style={ styles.passwordContainer }>
            <ValidationInput
                  style={styles.passwordInput}
                  textStyle={textStyle.paragraph}
                  autoCapitalize='none'
                  secureTextEntry={this.state.showPassword}
                  placeholder='Clave'
                  validator={PasswordValidator}
                  onChangeText={this.onPasswordInputValidationResult}
            />
            <Switch
                style={styles.passwordSwitch}
                onValueChange={this.toggleSwitch}
                value={!this.state.showPassword}
            />          
          </View>
         </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
     minHeight: 300,
  },
  forgotPasswordContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  nameInput: {
    backgroundColor: theme.authInputBackground,
  },
  emailInput: {
    backgroundColor: theme.authInputBackground,
    marginTop: 16,
  },
  passwordContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'stretch',
    marginTop: 16,
  },
  passwordInput: {
    flex: 4,
    backgroundColor: theme.authInputBackground,
  },
  passwordSwitch: {
    flex: 1,
  },
})
