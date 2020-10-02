/* Unique index file with all the images to be kept in device
/* the images filenames should be kept unchangeable for generic reasons
---------------------------------------------------------*/

import { ImageSource, RemoteImage} from './type';
export { ImageSource, RemoteImage} from './type';


//Main Logo Splash----------------------------------
export const BusinessSplash: ImageSource = {
  imageSource: require('./businessSplash.png'),
};

//miscelaneous ----------------------------------
export const imagePriceLabel: ImageSource = {
  imageSource: require('./misc/star-discount.png'),
};
export const imageRightArrow: ImageSource = {
  imageSource: require('./misc/arrow-right.png'),
};
export const imageHeart: ImageSource = {
  imageSource: require('./misc/heart-transparent.png'),
};
export const imageNoUser: ImageSource = {
  imageSource: require('./misc/no-user.png'),
};

//Authorization screen's images------------------
export const AuthBackgroundImage: ImageSource = {
  imageSource: require('./auth/authBackground.jpg'),
};


//Home Screen's images-------------------------------
export const BusinessLogoDark: ImageSource = {
  imageSource: require('./home/businessLogo-dark.png'),
};


