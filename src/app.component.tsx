import React from 'react';
import { mapping } from '@eva-design/eva';
import { ApplicationProvider } from '@kitten/theme';
import { DynamicStatusBar } from '@src/components/common';
import { Router } from './core/navigation/routes';
import { ThemeKey, themes } from '@src/core/themes';
import { SplashScreen } from 'expo';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';


interface Assets {
  fonts: { [key: string]: number };
}
interface State {
  theme: ThemeKey;
}

const fonts: { [key: string]: number } = {
  'opensans-semibold':    require('./assets/fonts/opensans-semibold.ttf'),
  'opensans-bold':        require('./assets/fonts/opensans-bold.ttf'),
  'opensans-extrabold':   require('./assets/fonts/opensans-extra-bold.ttf'),
  'opensans-light':       require('./assets/fonts/opensans-light.ttf'),
  'opensans-regular':     require('./assets/fonts/opensans-regular.ttf'),
  'lilitaone-regular':    require('./assets/fonts/LilitaOne-Regular.ttf'),
  'amaticsc-regular':     require('./assets/fonts/AmaticSC-Regular.ttf'),
  'amaticsc-bold':        require('./assets/fonts/AmaticSC-Bold.ttf'),
  'roboto-bold':          require('./assets/fonts/Roboto-Bold.ttf'),
};

const assets: Assets = {
  fonts: fonts,
};

var topLevelNavigator

export default class App extends React.Component<{}, State> {

  public state: State = {
    theme: 'App Theme',
    appIsReady: false,
  };

  async componentDidMount() {
    
    SplashScreen.preventAutoHide(); // Prevent native splash screen from autohiding
   
    this.prepareResources();

  }

  private loadFonts = (fonts: {[key: string]: number}): Promise<void> => {
    return Font.loadAsync(fonts);
  };

  private async loadResourcesAsync(assets: Assets): Promise<void> {
    const { fonts } = assets;

    return Promise.all([
      this.loadFonts(fonts),
    ]);
  }

  private prepareResources = async () => {
    await this.loadResourcesAsync(assets);
  
    this.setState({ appIsReady: true }, async () => {
      SplashScreen.hide();
    });
  }

  public render(): React.ReactNode {
 
    if (!this.state.appIsReady) {
      return null;
    }
    return (
        <ApplicationProvider
          mapping={mapping}
          theme={themes[this.state.theme]}>
          <DynamicStatusBar currentTheme={this.state.theme}/>
          <Router ref={navigatorRef => { this.topLevelNavigator = navigatorRef}} />
        </ApplicationProvider>
    
    );
  }
}
