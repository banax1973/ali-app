import { AsyncStorage } from 'react-native';

export const _saveItem = async (item, selectedValue) => {
	try {
	  	await AsyncStorage.setItem(item, selectedValue);
	} catch (error) {
	  console.error('AsyncStorage error: ' + error.message);
	}
}