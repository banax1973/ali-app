import React from 'react';
import SettingsPage, { SectionRow, NavigateRow } from '@src/components/more';
import { ActivityIndicator } from '@src/components/common';

interface ComponentProps {
  onLinkPress: (link: string) => void;
  onLogoutPress: () => void;
}
interface State {
  link: string;
}

export type AccountProps = NavigationScreenProp & ComponentProps;

export class Account extends React.Component<NavigationScreenProp> {

  public state: State = {
    link: '',
  };

  
  private onLinkPress = (link: string) => {
    this.props.onLinkPress(link);
  };
  private onLogoutPress = () => {
    this.props.onLogoutPress();
  };

  public render(): React.ReactNode {
    const { isLoading } = this.props;
    if(isLoading){
      return( <ActivityIndicator/> )
    }
    return (
      <SettingsPage>
        <SectionRow>
          <NavigateRow
            text='Cambiar Clave'
            iconPath= {require('@src/assets/icons/misc/change-password.png')}
            onPressCallback={() => { this.onLinkPress('ChangePassword')}} />
          <NavigateRow
            text='Cerrar Sesión'
            iconPath= {require('@src/assets/icons/misc/logout.png')}
            onPressCallback={() => {  this.onLogoutPress()}} /> 
        </SectionRow>
      </SettingsPage>
    )
  }
}
