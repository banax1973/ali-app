import React from 'react';
import { View, TouchableHighlight, Text } from 'react-native';
import SettingsPage, { SectionRow, NavigateRow, AccountRow } from '@src/components/more';
import { ActivityIndicator } from '@src/components/common';
import { ShareIcon } from '@src/assets/icons';
import styles from './styles';

interface ComponentProps {
  onLinkPress: (link: string) => void;
  onContactPress: () => void;
  onLinkPressWithCheck: (link: string) => void;
  onShareAppPress: () => void;
}
interface State {
  link: string;
}

export type MoreProps = NavigationScreenProp & ComponentProps;

export class More extends React.Component<NavigationScreenProp> {

  public state: State = {
    link: '',
  };
  
  private onLinkPress = (link: string) => {
    this.props.onLinkPress(link);
  };
  
  private onContactPress = () => {
    this.props.onContactPress();
  };

  private onLinkPressWithCheck = (link: string) => {
    this.props.onLinkPressWithCheck(link);
  };

  private onShareAppPress = () => {
    this.props.onShareAppPress();
  };

  public render(): React.ReactNode {
    const { name, userId, avatar, isLoading } = this.props;
 
    if(isLoading){
      return( <ActivityIndicator/> )
    }
    return (
      <View style={styles.container}>
        <View style={styles.linkPageContainer}>
          <SettingsPage>
            <SectionRow text='MI CUENTA'>
              <AccountRow
                name={name}
                userId={userId}
                avatar={avatar}
                iconDefault= {require('@src/assets/icons/misc/user.png')}
                onPressCallback={() => { 
                    if (name=='Iniciar Sesión')  this.onLinkPress('MainAuth')
                    else this.onLinkPress('Account')
                  }
                }/>
            </SectionRow>
           
          </SettingsPage>
        </View>
      
          <TouchableHighlight 
            style = {styles.buttonContainer}
            onPress={this.onShareAppPress}> 
            <View style = {styles.button}>
              <View style = {styles.iconContainer}>
                <ShareIcon width={styles.shareIcon.width} height={styles.shareIcon.height} />
              </View>
              <View style = {styles.textContainer}>
                <Text style = {styles.shareTitle}> Compartir App </Text> 
                <Text style = {styles.shareSubtitle} numberOfLines={2} ellipsizeMode={'tail'}>
                  Invitá a tus amigos para que no se pierdan los beneficios!
                </Text>
              </View>  
            </View>  
          </TouchableHighlight>
          
      </View>
    )
  }
}

