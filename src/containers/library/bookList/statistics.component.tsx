import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'

interface ComponentProps {
    number: number;
    name: string;
}

export class Stat extends React.Component<ComponentProps> {

    public render(): React.ReactNode {
        const {number,name} =this.props;

        return (
            <View style={styles.statContainer}>
                <Text style={styles.numberText} numberOfLines={1} ellipsizeMode={'tail'}>
                    {number}
                </Text>
                <Text style={styles.nameText} numberOfLines={1} ellipsizeMode={'tail'}>
                    {name}
                </Text>              
            </View>
        )
    }
}

const styles = StyleSheet.create({

    statContainer: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        marginVertical: 10,
    },
  
    numberText:{
        justifyContent: 'center',
        fontSize: 23,
        color: 'black',
        fontWeight: 'bold',   
    },
    nameText:{
        
        justifyContent: 'flex-start',
        fontSize: 10,
        color: 'black', 
        lineHeight: 12,  
    }
   
});
