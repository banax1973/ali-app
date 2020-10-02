import { StyleSheet, Dimensions } from 'react-native';
import { theme } from '@src/config';

const screenWidth  = Dimensions.get('window').width ;
const screenHeight = Dimensions.get('window').height;

export default StyleSheet.create({
  
  headerStyle:{
    height: (screenHeight / 13) > 60 ? 60: (screenHeight / 13),
  },
  iconContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginHorizontal: 20,
  },
  textIcon:{
    alignSelf: 'center',
    color: 'white',
  },
  iconRight: {
    flexDirection: "row",
    justifyContent: "flex-end", 
    marginRight: 20,
  },
  iconLeft: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: 48, //120,
    height: 48,
  },
  iconRightTrash:{
    color: theme.headerIconRightTrash,
  },
  iconRightCoupon:{
    color: theme.headerIconRightCoupon,
  },
  headerTint: {
    color: theme.headerText
  },
  headerBackgroundFrom: {
    color: theme.headerGradientFromColor
  },
  headerBackgroundTo: {
    color: theme.headerGradientToColor
  },

});

