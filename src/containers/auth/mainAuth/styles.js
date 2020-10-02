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

  helloLabel: {
    alignSelf: 'center',
    color: theme.authTextControl,
    ...textStyle.headline,
  },

  facebookContainer: {
    flex: 4,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    paddingHorizontal: 16,
    alignItems: 'center'
  },
  buttonContainer: {
    flex: 3,
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },

  facebookButton: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems:'center',
    marginVertical: 8,
    backgroundColor: '#4267b2',
    paddingVertical: 10,
    paddingHorizontal: 80,
    borderRadius: 3,
    borderColor: '#FFFFFF', 
    borderWidth: 0.5
  },
  facebookButtonText: {
    fontSize: 20,
    color: '#FFFFFF',
    paddingHorizontal: 20,
    fontFamily: 'roboto-bold',
    paddingTop: 5
  },

  signUpButton: {
    marginVertical: 12,
    marginHorizontal: 16,
    alignItems: 'center',
  },
  signInButton: {
    flex:1,
    flexDirection:'row',
    marginHorizontal: 16,
    marginVertical: 10,
    justifyContent: 'center'
  },
 


  signUpText: {
    color: theme.authTextControl,
    ...textStyle.subtitle,
  },
  signInText: {
    color: theme.authTextHint,
    ...textStyle.subtitle,
  },
  textToPush: {
    color: theme.authTextControl,
    ...textStyle.subtitle,
    fontSize: 16,
  },


});