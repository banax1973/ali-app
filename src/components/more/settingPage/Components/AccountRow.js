import React, { Component } from 'react'
import { View, Text, TouchableOpacity, Image, ImageBackground } from 'react-native'
import { ProfilePhoto } from '@src/components/more/profileSetting/profilePhoto.component';
import SettingsRowStyle from '../Styles/SettingsRowStyle'

const {
    containerAccountSection,
    containerInnerAccountSection,
    iconDefault, photo,
    iconRight,
    nameText, userIdText,
} = SettingsRowStyle

class AccountRow extends Component {
    render() {
        return (
            <TouchableOpacity onPress={this.props.onPressCallback}>
                <View style={containerAccountSection}>
                    <ImageBackground
                        style={this.props.avatar!==null ? photo : iconDefault}
                        imageStyle={{ borderRadius: photo.borderRadius }}
                        source={(this.props.avatar!==null && this.props.avatar!==undefined && this.props.avatar!='') ? { uri: this.props.avatar } : this.props.iconDefault}
                    >
                    </ImageBackground> 

                    <View style={containerInnerAccountSection}>
                        <Text style={nameText} numberOfLines={1} ellipsizeMode={'tail'}>
                            {this.props.name}
                        </Text>
                        <Text style={userIdText} numberOfLines={1} ellipsizeMode={'tail'}>
                            {this.props.userId}
                        </Text>
                   </View>
                    <Image  style={iconRight}  source={require('@src/assets/icons/misc/chevron-right.png')} />
                </View>
            </TouchableOpacity>
        )
    }
}

export { AccountRow }