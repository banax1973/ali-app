import React, { Component } from 'react'
import { View, Text, TouchableOpacity, Switch, Image } from 'react-native'
import SettingsRowStyle from '../Styles/SettingsRowStyle'

const {
    containerInSection,
    containerInnerSection,
    iconLeft,
    text,
    switchSt
} = SettingsRowStyle

// Class for switch rows
class SwitchRow extends Component {
    render() {
        return (
            <TouchableOpacity onPress={this.props.onPressCallback}>
                <View style={containerInSection}>
                    <View style={containerInnerSection}>
                        <Image  style={iconLeft}  source={this.props.iconPath} />
                        <Text style={text} numberOfLines={1} ellipsizeMode={'tail'}>
                            {this.props.text}
                        </Text>
                        <Switch
                            style={switchSt}
                            trackColor={{true: 'orange', false: 'grey'}}
                            disabled={this.props._disabled}
                            onValueChange={this.props._onValueChange}
                            value={this.props._value} />
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
}

export { SwitchRow }