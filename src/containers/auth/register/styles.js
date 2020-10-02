import { StyleSheet } from 'react-native';
import { theme } from '@src/config';
import { textStyle } from '@src/components/common';


export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#456D9A',
  },
  headerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 216,
  },
  formContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  photo: {
    width: 124,
    height: 124,
    borderRadius: 80,
    alignSelf: 'center',
    borderColor: theme.authPhotoBorder,
    backgroundColor: 'transparent',
  },
  photoButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    //transform: [{ translateY: 82 }],
    alignSelf: 'flex-end',
    marginTop: 100,
    borderColor: theme.authPhotoBorder,
    backgroundColor: 'transparent',
  },
  photoButtonIcon: {
    width: 24,
    height: 24,
  },
  signUpButton: {
    marginHorizontal: 16,
  },
  signInButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 12,
  },
  signInText: {
    color: theme.authTextControl,
    ...textStyle.subtitle,
  },
  signInTextUnderline: {
    color: theme.authTextControl,
    ...textStyle.subtitle,
    textDecorationLine: 'underline'
  },
});