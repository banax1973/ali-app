# App exámen Alibrate


App demo Alibrate con las siguientes funcionalidades:

  - Login Facebook, Login Manual, Registro, Cambio de clave, Cierre de sesión
  - Pantalla "Mi Biblioteca", con scroll infinito de lista de libros
 
### Mejoras
 - Se agrega funcionalidad swipe de lista de libros, evitando que el usuario necesite pulsar en el tab correspondiente
 - permite tomar selfie o elegir de libreria la foto del perfil

### Tech

La app usa los siguientes packages para funcionar correctamente:

* Expo SDK 38
* Expo Cli 3.24.0
* React Native 0.62


### Instalación y test local

La app requiere [Expo Cli](https://docs.expo.io/get-started/installation/) v3.24.0+ para correr.

Instalar las dependencias y devdependencias y correr expo:

```sh
$ cd [path-to-app]
$ npm install
$ cd [path-to-app/src/config/]
$ abrir index.js y configurar el endpoint en -> URL_BASE: 'http://[BACKEND-IP-ADDRESS]:3000', 
$ expo start
```


Licencia
----

Demo
