import React from 'react';
import { StyleSheet, Text, TouchableHighlight } from 'react-native';
import { theme } from '@src/config';

interface ComponentProps {
  buttonText?: string;
  onButtonPress: () => void;
}

export class CommandButton extends React.Component<ComponentProps> {

  onButtonPress = (): void => {
    this.props.onButtonPress();
  };

  public render(): React.ReactNode {
    const { style, buttonText, ...restProps } = this.props;

    return (
      <TouchableHighlight 
          style = {styles.container}
          underlayColor='transparent'
          onPress={this.onButtonPress}> 
          <Text 
            style = {styles.button}>
            {buttonText}
          </Text>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: theme.containerBackground,
    marginHorizontal: 15,
    marginVertical: 15, 
  },
  icon: {
    width: 24,
    height: 24,
    tintColor: theme['text-hint-color'],
  },
  button: {
    justifyContent: 'center',
    alignSelf: 'stretch',
    height: 55,
    textAlign: 'center',
    textAlignVertical: 'center',
    textShadowColor: theme.btnShadowColor,
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10,
    borderWidth: 1,
    borderRadius: 5,
    overflow: "hidden",
    color: theme.btnTextColor,
    borderColor: theme.btnBorderColor,
    backgroundColor: theme.btnBackgroundColor,
    fontFamily: 'lilitaone-regular',
    fontWeight: null,
    fontSize: 24,
  },
});
