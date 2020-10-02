import React from 'react';
import { StyleSheet, View, ViewProps, Switch} from 'react-native';
import { ThemedComponentProps } from '@kitten/theme';
import { CheckBox } from '@kitten/ui';
import { textStyle, ValidationInput } from '@src/components/common';
import { PasswordValidator } from '@src/core/validators';
import { ChangePasswordFormData } from './type';
import { theme } from '@src/config';

interface ComponentProps {
  /**
   * Will emit changes depending on validation:
   * Will be called with form value if it is valid, otherwise will be called with undefined
   */
  onDataChange: (value: ChangePasswordFormData | undefined) => void;
}

export type ChangePasswordFormProps = ThemedComponentProps & ViewProps & ComponentProps;

interface State {
  oldPassword: string | undefined;
  password: string | undefined;
}

export class ChangePasswordForm extends React.Component<ChangePasswordFormProps, State> {

  constructor(props) {
    super(props);
    this.toggleSwitch    = this.toggleSwitch.bind(this);
    this.toggleOldSwitch = this.toggleOldSwitch.bind(this);
  }

  toggleSwitch() {
    this.setState({ showPassword: !this.state.showPassword });
  }
  toggleOldSwitch() {
    this.setState({ showOldPassword: !this.state.showOldPassword });
  }

  public state: State = {
    oldPassword: undefined,
    password: undefined,
    showOldPassword: true,
    showPassword: true,
  };

  public componentDidUpdate(prevProps: ChangePasswordFormProps, prevState: State) {
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

  private onOldPasswordInputValidationResult= (oldPassword: string) => {
    this.setState({ oldPassword });
  };

  private onPasswordInputValidationResult = (password: string) => {
    this.setState({ password });
  };

  private isValid = (value: ChangePasswordFormData): boolean => {
    const { oldPassword, password } = value;

    return oldPassword !== undefined
      && password !== undefined;
  };

  public render(): React.ReactNode {
    const { style, ...restProps } = this.props;

    return (
      <View
        style={[styles.container, style]}
        {...restProps}>
        <View style={styles.formContainer}>
          <View style={ styles.passwordContainer }>
            <ValidationInput
                  style={styles.passwordInput}
                  textStyle={textStyle.paragraph}
                  autoCapitalize='none'
                  secureTextEntry={this.state.showOldPassword}
                  placeholder='Clave Actual'
                  validator={PasswordValidator}
                  onChangeText={this.onOldPasswordInputValidationResult}
            />
            <Switch
                style={styles.passwordSwitch}
                onValueChange={this.toggleOldSwitch}
                value={!this.state.showOldPassword}
            />          
          </View>
          <View style={ styles.passwordContainer }>
            <ValidationInput
                  style={styles.passwordInput}
                  textStyle={textStyle.paragraph}
                  autoCapitalize='none'
                  secureTextEntry={this.state.showPassword}
                  placeholder='Nueva Clave'
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

