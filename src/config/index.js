/**************** MAIN CONFIG FILE **********************/
import * as theme from './appTheme.json';

module.exports = {

	BUSINESS_ID: 'ALI',
	BUSINESS: 'Alibrate',
	URL_BASE: 'http://192.168.0.5:3000',
	//URL_BASE: 'https://alibrate-backend.herokuapp.com',

	theme: theme, //configuracion externa de colores
	imageNoUser: 'http://appshark-admin.herokuapp.com/images/businesses/shark-icon.png',
	imageNoPhoto: 'https://appshark-admin.herokuapp.com/images/businesses/shark-icon.png',
	loadGif: '', //gif de carga
	linkToGooglePlay: 'Bajate la app desde GooglePlay', //poner link de descarga de App para Android
	linkToAppStore: 'Bajate la app desde AppStore', //poner link de descarga de App para IOS
	
	
	countryCode: 'ar', //codigo de pais para restringir busquedas de geocoding
	httpTimeout: 20000, //timeout para todas las API calls
	
	TOP_ICON : {
		width: 45, 
    	height: 45,
	},
	MENU_CAPTION : {
		activity: 		'Actividad',
		mylibrary: 		'Mi biblioteca',
		rankings: 		'Rankings',
		ebooks: 		'eBooks',
		more: 			'Más',
	},
	SCREEN_TITLE : {
		more: 			'ALIBRATE',
    	account: 		'MI CUENTA',
        takePhoto:      'FOTO DEL PERFIL',
	},
	
};