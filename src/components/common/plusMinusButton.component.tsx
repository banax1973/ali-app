import React from 'react';
import { StyleSheet, View, TouchableHighlight } from 'react-native';
import { theme } from '@src/config';
import { MinusIconFill, PlusIconFill } from '@src/assets/icons';

interface ComponentProps {
  buttonType?: string;
  onButtonPress: () => void;
}

export class PlusMinusButton extends React.Component<ComponentProps> {

  onButtonPress = (): void => {
    this.props.onButtonPress();
  };

  private showIcon(type: string){
    if (type == 'plus' ) { 
      return (
          <View style={styles.iconContainer}>
            {PlusIconFill(styles.icon)}
          </View>    
      )
    }
    else{
      return (
          <View style={styles.iconContainer}>
            {MinusIconFill(styles.icon)}
          </View>    
      )
    }
  }

  public render(): React.ReactNode {
    const { buttonType, ...restProps } = this.props;

    return (
      <TouchableHighlight 
          underlayColor='transparent'
          onPress={this.onButtonPress}> 
          {this.showIcon(buttonType)}
          
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  iconContainer: {
    borderRadius: 100,
    backgroundColor: theme.btnPlusMinus,
    padding: 3,
  },
  icon: {
    width: 20,
    height: 20,
    tintColor: 'white',
  },
});
