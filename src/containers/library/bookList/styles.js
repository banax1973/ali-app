import { StyleSheet, Dimensions } from 'react-native';
import { theme } from '@src/config';
import { textStyle } from '@src/components/common';

const WIDTH = Dimensions.get('window').width;

export default StyleSheet.create({

 container: {
    flex: 1,
  },
    mainContainer:{
        flex: 1,
        flexDirection: 'column',
    },
    userStat:{
        flex: 3,
    },
    tabs:{
        flex: 8,
    },

    tabBarLabel:{
        ...textStyle.headline,
        color: theme.dlvTabBarText,
        fontSize: 12,
    
    },
    tabBarIndicator:{
        backgroundColor: theme.dlvTabBarText,

    },
    tabBar:{
        width: WIDTH,
        height: 45,
        backgroundColor: theme.dlvTabBarBackground ,
    },


    listContainer: {
        paddingBottom: 18,
        backgroundColor: theme.containerBackground,
    },
 
  
   
});