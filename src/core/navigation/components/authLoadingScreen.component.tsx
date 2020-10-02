import React from 'react'
import { View, StatusBar, AsyncStorage, StyleSheet } from 'react-native'
import { ActivityIndicator } from '@src/components/common';

export class AuthLoadingScreen extends React.Component {

    /*constructor() {
        super();
        this._bootstrap();
    }*/

    componentDidMount(){
        this._bootstrap();
    }

    _bootstrap = async () => {
        const userToken = await AsyncStorage.getItem('@JWT_TOKEN');
        //console.log( 'AuthLoading-> TOKEN:', userToken)
        this.props.navigation.navigate(userToken ? 'App' : 'Auth');
        //this.props.navigation.navigate(userToken ? 'Auth' : 'App');
    }

    render() {
        return (
            <View style={styles.container}>
                <ActivityIndicator
                  indicatorText = {'Iniciando...'}
                />
                <StatusBar barStyle="default" />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});