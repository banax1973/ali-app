import React from 'react';
import { StyleSheet, View, TouchableHighlight } from 'react-native';
import { theme } from '@src/config';
import { CloseIconOutline } from '@src/assets/icons';

interface ComponentProps {
  onButtonPress: () => void;
}

export class CloseButton extends React.Component<ComponentProps> {

  onButtonPress = (): void => {
    this.props.onButtonPress();
  };

  public render(): React.ReactNode {
    const {...restProps } = this.props;

    return (
      <TouchableHighlight 
          underlayColor='transparent'
          onPress={this.onButtonPress}> 
          <View style={styles.iconContainer}>
            {CloseIconOutline(styles.icon)}
          </View>           
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  iconContainer: {
    backgroundColor: 'transparent',
    padding: 3,
  },
  icon: {
    width: 35,
    height: 35,
    tintColor: '#A0A0A0FF',
  },
});
