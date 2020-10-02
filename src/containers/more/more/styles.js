import { StyleSheet, Dimensions } from 'react-native';
import { theme } from '@src/config';
import { textStyle} from '@src/components/common';

export default StyleSheet.create({
  
    container: {
      flex: 1,
      flexDirection: 'column',
      backgroundColor: theme.containerBackground,
    },
    linkPageContainer:{
      flex: 8,
    },
    buttonContainer: {
      flex: 1,
      height: 55,
      maxHeight:65,
      marginHorizontal: 5,
      marginVertical: 10, 
    },
    button: {
      flex: 1,
      flexDirection: 'row',
       borderColor: theme.btnBorderColor,
      backgroundColor: theme.btnBackgroundColor,
       borderRadius: 5,
    },
    iconContainer:{
      alignSelf: 'center',
      borderWidth: 1,
      borderRadius: 130,
      borderColor: theme.btnTextColor,
     // backgroundColor: theme.mreShareButtonIcon,
     // padding: 7,
      marginLeft: 10,
    },
    textContainer:{
      flex:5,
      flexDirection: 'column',
      marginHorizontal: 10,
      alignSelf: 'center'
    },
    // Share button---------------------------
    shareIcon:{
      color: theme.btnTextColor,
      width:48, 
      height:48,
    },

    shareTitle: {
      ...textStyle.headline,
      color: theme.btnTextColor,
      fontSize: 16,
    },
    shareSubtitle: {
      ...textStyle.subtitle,
      marginLeft: 5,
      color: theme.btnTextColor,
      fontSize: 12,
    },
});