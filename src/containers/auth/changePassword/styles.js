import { StyleSheet } from 'react-native';
import { theme } from '@src/config';
import { textStyle } from '@src/components/common';


export default StyleSheet.create({
   
    container: {
      flex: 1,
      paddingHorizontal: 16,
      paddingVertical: 24,
      backgroundColor: '#456D9A',
    },
    formContainer: {
      flex: 1,
      paddingHorizontal: 16,
    },
    changeButton: { },
    changePasswordLabel: {
      alignSelf: 'center',
      marginTop: 24,
      color: theme.authTextControl,
      ...textStyle.headline,
    },
    warningLabel: {
      alignSelf: 'center',
      marginTop: 64,
      color: theme.authTextControl,
      ...textStyle.subtitle,
    },
});