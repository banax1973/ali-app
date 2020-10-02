import { URL_BASE, BUSINESS_ID, httpTimeout} from '@src/config';
import { Alert } from 'react-native';


/* get Modules data info from API based on method selected */ 
export const GetDataFromAPI = (method: string): Promise => {
  
  const controller  = new AbortController();
  const { signal }  = controller;
  const timerHandle = setTimeout(() => controller.abort(), httpTimeout); //aqui ponemos 20seg, para permitir despertar a heroku!

  return fetch(URL_BASE + '/api/' + method,
  {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ businessId: BUSINESS_ID }),
    signal,
  })
  .then((response) => response.json())
  .then((responseJson) => {
    //clearTimeout(this.timerHandle);
    if (responseJson.success) return responseJson.data
    else Alert.alert('ERROR','ERROR de comunicación con el servidor. Chequee por favor su conexión de Internet.')
  })
}
