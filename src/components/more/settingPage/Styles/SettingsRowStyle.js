import { StyleSheet } from 'react-native'
import { theme } from '@src/config';

const SettingsRowStyle = StyleSheet.create({
    container: {
        marginBottom: 8,
        backgroundColor: theme.mreSectionContainerBackground,
        shadowColor: theme.mreSectionContainerShadow,
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.18,
        shadowRadius: 1.00,
        elevation: 1,
    },
    containerSection: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 50
    },
    containerInSection: {
        flex: 1, 
        height: 50,
        borderRadius: 1,
        borderBottomWidth: 0.2,
        borderBottomColor: theme.mreItemBorderBottom,
    },
    containerInnerSection: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    containerInnerSectionMiddle: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        flex: 8,
        flexDirection: 'row',
        fontSize: 15,
        color: theme.mreItemText,
        fontWeight: 'bold',
        marginLeft: 15,
        
    },
    textSection: {
        flex: 1,
        textAlign: 'left',
        fontFamily: 'amaticsc-bold',
        fontWeight: null,
        fontSize: 25,
        color: theme.mreSectionTitle,
        marginLeft: 25,
    },

    iconOrigColor: {
        marginLeft: 20,
        width: 25,
        height: 25,
        //tintColor: theme.mreItemIconLeft,
        alignSelf: 'center',
    },
    iconRight: {
        marginLeft: 20,
        width: 18,
        height: 18,
        marginHorizontal: 20,
        tintColor: theme.mreItemIconRight,
    },
    iconLeft: {
        marginLeft: 20,
        width: 25,
        height: 25,
        tintColor: theme.mreItemIconLeft,
        alignSelf: 'center',
    },
    switchSt: {
        flex: 1,
    },
    checkSt: {
        flex: 1,
    },
    sliderSt: {
        marginHorizontal: 16
    },


    //styles for Account row
    containerAccountSection: {
        flex: 1, 
        flexDirection: 'row',
        height: 60,
        borderRadius: 1,
        borderBottomWidth: 0.2
        
    },

    iconDefault: {
        marginLeft: 15,
        width: 25,
        height: 25,
        tintColor: theme.mreItemText,
        paddingTop: 5,
    },
    photo: {
        width: 55,
        height: 55,
        borderRadius: 50,
        borderColor: 'transparent',
        borderWidth: 1, 
        overflow: 'hidden',
        alignSelf: 'center',
        marginLeft: 10,
    },

    containerInnerAccountSection:{
        flex: 8,
        flexDirection: 'column',
        justifyContent: 'center',
        marginLeft: 25,
        paddingBottom: 10,
    },
    nameText:{
        fontSize: 15,
        color: theme.mreItemText,
        fontWeight: 'bold',
    },
    userIdText: {
        fontSize: 11,
        color: theme.mreItemText,
    },
})

export default SettingsRowStyle