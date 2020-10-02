import { StyleSheet } from 'react-native';

export default StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#456D9A',
        flexDirection: 'column',
        justifyContent: 'center' 
    },
  
    // buttons---------------------------
    buttonContainer: {
        marginHorizontal: 15,
        marginVertical: 25, 
    },
    button: {
      alignSelf: 'stretch',
      minHeight: 55,
      textAlign: 'center',
      textAlignVertical: 'center',
      textShadowColor: 'rgba(0, 0, 0, 0.75)',
      textShadowOffset: {width: -1, height: 1},
      textShadowRadius: 10,
      borderWidth: 1,
      borderRadius: 5,
      overflow: "hidden",
      color: 'white',
      borderColor: 'black',
      fontFamily: 'lilitaone-regular',
      fontWeight: null,
      fontSize: 24,
    },
    btnOP: {
        backgroundColor: '#3B42C3FF',
    },
    btnCancel: {

        backgroundColor: '#606060FF', 
    }

});