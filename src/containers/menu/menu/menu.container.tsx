import React from 'react';
import { NavigationScreenProps } from 'react-navigation';
import { Menu } from './menu.component';

export class MenuContainer extends React.Component<NavigationScreenProps> {

  private navigationKey: string = 'MenuContainer';

  private onTabSelect = (index: number) => {
    const { navigation } = this.props;
    const { [index]: selectedRoute } = navigation.state.routes;

    //se cambia para que apunte siempre al Top del stack
    this.props.navigation.navigate({ routeName: selectedRoute.routes[0].routeName });
  };

  public render(): React.ReactNode {
    return (
      <Menu
        selectedIndex={this.props.navigation.state.index}
        onTabSelect={this.onTabSelect}
      />
    );
  }
}
