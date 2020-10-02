import React, { Component } from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import SettingsRowStyle from '../Styles/SettingsRowStyle'

const {
    containerInSection,
    containerInnerSection,
    iconLeft,
    iconRight,
    iconOrigColor, //keep the original color of icon
    text,
} = SettingsRowStyle

// Class for navigate rows
class NavigateRow extends Component {
    render() {
        return (
            <TouchableOpacity onPress={this.props.onPressCallback}>
                <View style={containerInSection}>
                    <View style={containerInnerSection}>
                        <Image  style={this.props.iconOrigColor ? iconOrigColor : iconLeft}  source={this.props.iconPath} />
                        <Text style={text} numberOfLines={1} ellipsizeMode={'tail'}>
                            {this.props.text}
                        </Text>
                        <Image  style={iconRight}  source={require('@src/assets/icons/misc/chevron-right.png')} />
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
}

export { NavigateRow }
