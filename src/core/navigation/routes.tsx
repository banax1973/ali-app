import React from 'react';
import { SCREEN_TITLE } from '@src/config';
import { enableScreens } from 'react-native-screens';
import { createAppContainer, NavigationContainer, createSwitchNavigator, NavigationRouteConfigMap } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { fromLeft, fromBottom, fromTop } from 'react-navigation-transitions';

import {
  ComponentsContainer,
  LayoutsContainer,
  MenuContainer,
  ThemesContainer,
} from '@src/containers/menu';


import { MainAuthContainer, LoginContainer, RegisterContainer, ForgotPasswordContainer, ChangePasswordContainer } from '@src/containers/auth';
import { MoreContainer, AccountContainer } from '@src/containers/more';
import { TakePhoto } from '@src/components/more';

import { BookListContainer } from '@src/containers/library';
import { HeaderNavigationOptions, AuthLoadingScreen } from './components';


//handles transitions between specific screens
const handleCustomTransition = ({ scenes }) => {
  const prevScene = scenes[scenes.length - 2];
  const nextScene = scenes[scenes.length - 1];
 
  return fromLeft();
}

const MoreNavigator: NavigationContainer = createStackNavigator(
 {
    More:           { screen: MoreContainer,    navigationOptions: () => ({ title: SCREEN_TITLE.more })},
    Account:        { screen: AccountContainer, navigationOptions: () => ({ title: SCREEN_TITLE.account })},
    ChangePassword: { screen: ChangePasswordContainer, navigationOptions: () => ({ header: null })},
   
  },
  { defaultNavigationOptions: HeaderNavigationOptions,
    transitionConfig: () => fromBottom(1000), 
  },
);
MoreNavigator.navigationOptions = ({ navigation }) => {
  let { routeName } = navigation.state.routes[navigation.state.index];
  let tabBarVisible = true;
  if (routeName === 'ChangePassword') tabBarVisible = false;

  return { tabBarVisible };
};


const BookNavigator: NavigationContainer = createStackNavigator(
 {
    BookList:    { screen: BookListContainer, navigationOptions: () => ({ title: 'Mi biblioteca' })},
   
  },
  {  
    defaultNavigationOptions: HeaderNavigationOptions,
    transitionConfig: (nav) => handleCustomTransition(nav)
  },
);



const AuthNavigator: NavigationContainer = createStackNavigator(
 {
    MainAuth:       { screen: MainAuthContainer },
    Login:          { screen: LoginContainer },
    Register:       { screen: RegisterContainer },
    TakePhoto:      { screen: TakePhoto, navigationOptions: () => ({ title: SCREEN_TITLE.takePhoto })},
    ForgotPassword: { screen: ForgotPasswordContainer },
  },
  {  defaultNavigationOptions: { header: null },
     transitionConfig: () => fromLeft(500)
  } 
);
AuthNavigator.navigationOptions = ({ navigation }) => {
  let tabBarVisible = false;
  return { tabBarVisible };
};

const MenuNavigator: NavigationContainer = createBottomTabNavigator({

  ['Dummy']:   MoreNavigator,
  ['Book']:    BookNavigator,
  ['Dummy2']:    MoreNavigator,
  ['Dummy3']:    MoreNavigator,
  ['More']:     MoreNavigator,
  ['Auth']:     AuthNavigator,
  ['Home']:     BookNavigator,
  
}, {
  initialRouteName: 'Book',//'Home',
  tabBarComponent: MenuContainer,
});

const AppNavigator: NavigationContainer = createStackNavigator({
  
  ['Init']: MenuNavigator,

}, {
  headerMode: 'screen',
  defaultNavigationOptions: {
    header: null,
  },
});

//switchs between authorization stack and app stack when the app starts
const SwitchNavigator = createSwitchNavigator(
    {
      ['Starter']:  AuthLoadingScreen, 
      ['App']:      AppNavigator, 
      ['Auth']:     AuthNavigator
    }, 
    {
      initialRouteName: 'Starter'
    }
);

const createAppRouter = (container: NavigationContainer): NavigationContainer => {
  enableScreens();
  return createAppContainer(container);
};

export const Router: NavigationContainer = createAppRouter(SwitchNavigator);
