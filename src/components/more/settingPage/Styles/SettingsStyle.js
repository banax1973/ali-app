import { StyleSheet } from 'react-native'
import { theme } from '@src/config';

const SettingsStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.containerBackground,
  },
  content: {
    flex: 1,
  }
})

export default SettingsStyle