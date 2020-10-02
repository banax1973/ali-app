import React, { Component } from 'react';
import { Share, Button, Platform } from 'react-native';
import { BUSINESS } from '@src/config';

export const ShareItem  = async (linkUrl) => {
  try {
    let url: string = 'url';
    let message: string = 'message'; 

    message= 'App ' + BUSINESS +'\n' + linkUrl;
  
    const result = await Share.share({
      title: 'Mirá esta Promo!', message: message, url: url
    }, {dialogTitle: 'Compartir mediante'});

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
