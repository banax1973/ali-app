import React from 'react';
import { StyleSheet, View, StatusBar, ViewProps, StatusBarStyle, Platform } from 'react-native';
import { ThemedComponentProps } from '@kitten/theme';
import { ThemeKey } from '@src/core/themes';
import Constants from 'expo-constants';
import { theme } from '@src/config';

interface ComponentProps {
  currentTheme: ThemeKey;
}

export type DynamicStatusBarProps = ThemedComponentProps & ViewProps & ComponentProps;

export class DynamicStatusBar extends React.Component<DynamicStatusBarProps> {

/*  private getStatusBarContent = (): StatusBarStyle => {
    if (this.props.currentTheme === 'Eva Light') {
      return 'dark-content';
    } else {
      return 'light-content';
    }
  };
*/
  public render(): React.ReactNode {
  
    const androidStatusBarBgColor: string = theme.OSStatusBarBackground;
    //const barStyle: StatusBarStyle = this.getStatusBarContent();
    const barStyle: StatusBarStyle = theme.OSStatusBarText;

    return (
      <View style={styles.container}>
        <StatusBar
          backgroundColor={androidStatusBarBgColor}
          barStyle={barStyle}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    //backgroundColor: theme.backgroundBasicColor2,
    height: Platform.select({
      ios: Constants.statusBarHeight,
      android: 0,
    }),
  },
})
