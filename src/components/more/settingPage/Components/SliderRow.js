import React, { Component } from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import { Slider } from 'react-native-elements'
import SettingsRowStyle from '../Styles/SettingsRowStyle'

const {
    containerInSection,
    containerInnerSection,
    sliderSt,
    iconLeft,
    iconRight,
    text
} = SettingsRowStyle

// Class for slider rows
class SliderRow extends Component {
    render() {
        return (
            <TouchableOpacity onPress={this.props.onPressCallback}>
                <View style={containerInSection}>
                    <View style={containerInnerSection}>
                        <Image  style={iconLeft}  source={this.props.iconPath} />
                        <Text style={text} numberOfLines={1} ellipsizeMode={'tail'}>
                            {this.props.text}
                        </Text> 
                        {
                            this.props.navigate
                                ?  <Image  style={iconRight}  source={require('@src/assets/icons/misc/chevron-right.png')} />
                                : null
                        }                   
                    </View>
                </View>
                <Slider 
                    style={sliderSt} 
                    thumbTintColor={this.props._color}
                    maximumValue={this.props._max}
                    minimumValue={this.props._min}
                    value={this.props._value} 
                    onValueChange={this.props._onValueChange} />
            </TouchableOpacity>
        )
    }
}

// Component export
export { SliderRow }