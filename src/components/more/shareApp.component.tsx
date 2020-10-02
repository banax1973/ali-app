import React, { Component } from 'react';
import { Share, Button, Platform } from 'react-native';
import { BUSINESS, linkToGooglePlay, linkToAppStore } from '@src/config';

export const ShareApp  = async () => {
  try {
    let url: string = 'url';
    let message: string = 'message'; 

    if (Platform.OS === 'android') {
      message= 'App ' + BUSINESS +'\n' + linkToGooglePlay;
    } 
    else{ 
      message= 'App ' + BUSINESS;
      url= linkToAppStore //ios permits url
    }

    const result = await Share.share(
      { title: 'Te invito a descargarte esta App!', message: message, url: url },
      { dialogTitle: 'Compartir mediante'}
    );

    if (result.action === Share.sharedAction) {
      if (result.activityType) {
        // shared with activity type of result.activityType
      } else {
        // shared
      }
    } else if (result.action === Share.dismissedAction) {
      // dismissed
    }
  } catch (error) {
    alert(error.message);
  }
}
