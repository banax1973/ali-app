import { imageNoPhoto } from '@src/config';
import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, Button } from 'react-native'
import { ShareApp } from '@src/components/more';
import { Stat } from './statistics.component';
import { textStyle } from '@src/components/common';

interface ComponentProps {
    user : any;
    statistics: any;
}


export class UserStat extends React.Component<ComponentProps> {

    private onShareAppPress = () => {
        ShareApp();
    };
    private showPhoto(){
        const {user} =this.props;
        return (
          <TouchableOpacity
            activeOpacity={0.9}
            style={styles.itemImageContainer}
            onPress={this.onItemPress}>
            <View >
              <ImageBackground
                style={styles.itemImage}
                imageStyle={{ borderRadius: styles.itemImage.borderRadius }}
                source={ (user.avatar!==null && user.avatar!==undefined && user.avatar!='') ? {uri: user.avatar} : {uri: imageNoPhoto } } 
                        
              >
              </ImageBackground> 
            </View>
          </TouchableOpacity>
      )
    }
    private showButtonShare(){
        return (
          <TouchableOpacity
            activeOpacity={0.9}
            style={styles.shareButtonContainer}
            onPress={this.onShareAppPress}>
            <View >
              <Text style={styles.shareButton} numberOfLines={1} ellipsizeMode={'tail'}>Invitar amigos</Text>
            </View>
          </TouchableOpacity>
      )
    }
    public render(): React.ReactNode {
        const {user,statistics} =this.props;

        return (
            
            <View style={styles.statContainer}>
                <View style={styles.statFirstRowContainer}>
            
                    {this.showPhoto()}

                    <View style={styles.nameContainer}>
                        <Text style={styles.nameText} numberOfLines={1} ellipsizeMode={'tail'}>
                            {(user.name!='') ? user.name : 'Sin usuario'}
                        </Text>
                        <Text style={styles.userIdText} numberOfLines={1} ellipsizeMode={'tail'}>
                            {user.id}
                        </Text>
                    </View>
                    <View style={styles.buttonInviteContainer}>
                       {this.showButtonShare()}
                    </View>
                </View>
                <View style={styles.statSecondRowContainer}>
                    <Stat number= {statistics.stat_1.number}  name= {statistics.stat_1.name} />
                    <Stat number= {statistics.stat_2.number}  name= {statistics.stat_2.name} />
                    <Stat number= {statistics.stat_3.number}  name= {statistics.stat_3.name} />
                    <Stat number= {statistics.stat_4.number}  name= {statistics.stat_4.name} />
                    <Stat number= {statistics.stat_5.number}  name= {statistics.stat_5.name} />
                </View>
                <View style={styles.statThirdRowContainer}>
                                
                    <Text style={styles.linkText} numberOfLines={1} ellipsizeMode={'tail'}>Mis eBooks</Text>
                    <Text style={styles.linkText} numberOfLines={1} ellipsizeMode={'tail'}>Mis textos</Text>
                    <Text style={styles.linkText} numberOfLines={1} ellipsizeMode={'tail'}>Reto de Lectura</Text>
                </View>
               
            </View>
          
        )
    }
}

const styles = StyleSheet.create({

    statContainer: {
        flex: 1,
        flexDirection: 'column',
        marginHorizontal: 5,
    },
    statFirstRowContainer: {
        flex: 1,
        flexDirection: 'row',
        marginHorizontal: 5,
    },
    statSecondRowContainer: {
        flex: 1,
        flexDirection: 'row',
    },
    statThirdRowContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
    },

    itemImageContainer: {
        flex: 2,
        justifyContent: 'center',
    },
    itemImage: {
        width: 55,
        height: 55,
        borderRadius: 50,
        borderColor: 'transparent',
        borderWidth: 1, 
        overflow: 'hidden',
        alignSelf: 'center',

    },
    nameContainer:{
        flex: 4,
        justifyContent: 'center', 
    },
    buttonInviteContainer:{
        flex: 4,
        justifyContent: 'center',
        alignItems: 'flex-end', 
    },
    nameText:{
        ...textStyle.title,
        fontSize: 15,
        fontWeight:'bold',
        color: '#494949FF',
    },
    userIdText:{
        ...textStyle.subtitle,
        fontSize: 10,
        color: '#919191FF',
    },
    linkText:{
        padding: 10,
        borderRadius: 20,
        borderColor: 'transparent',
        borderWidth: 1, 
        overflow: 'hidden',
        alignSelf: 'center',
        backgroundColor: '#C4FFFFFF',
        color: '#89AFFFFF',
    },
    shareButton:{
        padding: 10,
        fontSize: 10,
        borderRadius: 5,
        borderColor: '#1F546FFF',
        borderWidth: 1, 
        overflow: 'hidden',
        alignSelf: 'center',
        backgroundColor: 'transparent',
        color: '#1F546FFF',
    }

});
