import { URL_BASE, BUSINESS_ID, TOP_ICON } from '@src/config';
import React from 'react';
import { Icon, StyleSheet, Text, View, Button, TouchableOpacity, Alert} from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { BusinessIcon, BellIcon } from '@src/assets/icons';
import { HeaderBackButton } from 'react-navigation-stack';
import { AsyncStorage } from 'react-native';
import styles from './styles';


onCouponsPress = (navigation) => {
  AsyncStorage.getItem('@JWT_TOKEN').then((data) => {
    if (data!==null) //token exists
      navigation.navigate('CouponsList');
    else{
      Alert.alert('ATENCIÓN',
        'Para acceder a tus beneficios, te pedimos por favor que ingreses a tu cuenta.',
         [{text: 'OK', onPress: () => navigation.navigate('MainAuth')}],
      )
    }
  });
};

onDummyPress = (navigation) => {
  //nothing
};

postToAPI= (navigation) => {
  fetch(URL_BASE + '/api/qr/deleteCoupon',
            {
                    method: 'POST',
                    headers: {
                      Accept: 'application/json',
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                       businessId: BUSINESS_ID,
                      _id: navigation.state.params._id, 
                    }),
            })
            .then((response) => response.json())
            .then((responseJson) => {
              if (responseJson.success){
                Alert.alert('','El cupón ha sido eliminado.');
                navigation.goBack(null)
              }
              else{
                 Alert.alert('ERROR','ERROR de comunicación. Por favor chequee su conexión de Internet e intentelo nuevamente.')
              }
            })
            .catch((error) =>{
              console.error(error)
            })

}


export const HeaderNavigationOptions = ({ navigation }) => {
  
  return {
    headerStyle: { height: styles.headerStyle.height },
    headerTintColor: styles.headerTint.color,
    headerBackground: (
    
      <LinearGradient
          colors={[styles.headerBackgroundFrom.color, styles.headerBackgroundTo.color]}
          style={{ flex: 1 }}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
      />
      
    ),
    headerTitleStyle: {
      fontFamily: 'amaticsc-bold',
      fontWeight: null,
      fontSize: 34,
      textAlign: 'center',
      alignSelf: 'center',
      width: '90%',  //should varies according to the size of the text.
      //width: (navigation.isFirstRouteInParent()? '90%' : '90%'),
    },
    headerRight: 
        (<TouchableOpacity style={styles.iconContainer} onPress={() => this.onDummyPress(navigation)}>
          <BellIcon width={38} height={38} tintColor= {styles.iconRightCoupon.color}/>
        </TouchableOpacity>
    ),

    headerLeft: (navigation.isFirstRouteInParent() ?
      (<View style={styles.iconContainer}>
          <BusinessIcon width={TOP_ICON.width} height={TOP_ICON.height}/> 
      </View>)
      : 
      (<HeaderBackButton tintColor= {styles.headerTint.color} onPress={() => {
        if (navigation.state.params === undefined) {navigation.goBack(null)}
        else{ 
          if (navigation.state.params.editing) {
            Alert.alert("CONFIRMAR", "Tienes datos sin guardar. Estas seguro que quieres salir?", [
              { text: "Cancelar", onPress: () => null, style: "cancel" },
              { text: "Salir sin Guardar", onPress: () => navigation.goBack(null) }
            ]);
          }
          else {navigation.goBack(null) }
        }
      }} />)
    ),
  }
};
