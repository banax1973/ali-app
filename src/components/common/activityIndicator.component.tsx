/* shows an activity indicator at the screen.
/* if an image is configured in config, we take this one...
/* otherwise, we show the default indicator.
/*----------------------------------------------------------- */
import React from 'react';
import { loadGif, theme } from '@src/config';
import { ActivityIndicator as IndicatorDefault, View, Text, Image, StyleSheet } from 'react-native';

interface ComponentProps {
  isInComp? : boolean, //shows indicator inside the caller component 
  indicatorText? : string
}

export class ActivityIndicator extends React.Component {
 
  static defaultProps: Partial<ComponentProps> = {
    isInComp : false,
    indicatorText : 'Cargando...'
  };

  public render(): React.ReactNode {
    const { isInComp, indicatorText } = this.props

    if (loadGif === undefined || loadGif==''){
      return(
        <View style={[styles.activity, isInComp ? styles.isInComp : styles.default]}>
          <Text style={styles.textLoading}> 
            { indicatorText }
          </Text> 
          <IndicatorDefault size='large' color={styles.default.color} />
        </View>
        ) 
    }
    return(
       <View style={[styles.activity, isInComp ? styles.isInComp : styles.default]}>
          <Text style={styles.textLoading}> 
            { indicatorText }
          </Text> 
          <Image source={loadGif} style={styles.indicator}/>
        </View>
      )
  }
}

const styles = StyleSheet.create({
    activity: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    default: {
      backgroundColor: 'transparent',
      color: theme.textPrimaryColor,
    },
    isInComp:{
        backgroundColor: 'rgba(0, 0, 0, 0.10)',
    },
    indicator: {
        backgroundColor: 'transparent',
        width: 100, 
        height: 100
    },
    textLoading:{
      color: theme.textPrimaryColor,
      fontSize: 20,
      fontStyle: 'italic',
      fontWeight: 'bold',
    }
});
