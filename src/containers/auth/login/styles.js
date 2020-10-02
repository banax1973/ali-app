import { StyleSheet } from 'react-native';
import { theme } from '@src/config';
import { textStyle } from '@src/components/common';


export default StyleSheet.create({
 container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#456D9A',
  },
  headerContainer: {
    flex: 2,
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  formContainer: {
    flex: 4,
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  buttonContainer: {
    flex: 2,
  },
  signInButton: {
    marginHorizontal: 16,
  },
  signUpButton: {
    marginVertical: 12,
    marginHorizontal: 16,
    alignItems: 'center',
  },

  helloLabel: {
    alignSelf: 'flex-start',
    color: theme.authTextControl,
    ...textStyle.headline,
  },
  helloLabel2: {
    color: theme.authTextControl,
    ...textStyle.subtitle,
  },
  signInLabel: {
    marginTop: 16,
    color: theme.authTextControl,
    ...textStyle.subtitle,
  },
  
  signUpText: {
    color: theme.authTextControl,
    ...textStyle.subtitle,
  },
  signUpTextUnderline: {
    color: theme.authTextControl,
    ...textStyle.subtitle,
    textDecorationLine: 'underline'
  },
  changeUserContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignSelf: 'flex-end',
  },
  changeUserButton: {
    paddingHorizontal: 0,
  },
  changeUserText: {
    fontSize: 15,
    color: theme.authTextHint,
    ...textStyle.subtitle,
    textDecorationLine: 'underline'
  },
});