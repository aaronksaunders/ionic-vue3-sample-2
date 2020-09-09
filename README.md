# VueJS Ionic Capacitor Sample Firebase File Upload Composition API - Vue3 Ionic BETA
> updated 9/4/2020
> - **Features: IonTabs, IonPage, IonToast, Capacitor Plugins Camera, GeoLocation, Firebase Storage, Page Routing, Page Parameters**
> - YOUTUBE VIDEO - https://youtu.be/y2nP5OPJ6tk

### Camera Working In PWA/Website/On Device

- see https://capacitor.ionicframework.com/docs/pwa-elements/

<p align="center">
<img src="https://raw.githubusercontent.com/aaronksaunders/ionic-vue3-sample-2/master/screenshots/Screen%20Shot%202020-09-07%20at%209.36.30%20PM.png" 
width='40%' height='40%' style="padding:20px">
<img src="https://raw.githubusercontent.com/aaronksaunders/ionic-vue3-sample-2/master/screenshots/Screen%20Shot%202020-09-07%20at%209.36.56%20PM.png" width='40%' height='40%' style="padding:20px">
  </p>
  <p align="center">
<img src="https://raw.githubusercontent.com/aaronksaunders/ionic-vue3-sample-2/master/screenshots/Screen%20Shot%202020-09-07%20at%209.37.09%20PM.png" 
width='40%' height='40%' style="padding:20px">
  </p>
  
### Using Typescript
- utilizing typescript in composition api functions
- utilizing typescript for all single file components

### Using Firebase For File Upload To Storage
- updated firebase file upload composition api function to upload and list files is storage bucket
- You need to create your own firebase configuration file, to be placed in the hooks directory
```
// .env.firebase.ts
const FIREBASE_CONFIG = {
    apiKey: "zebaayDI9wPgYFLRUd_07WB8ZVHPWowFm2w",
    authDomain: "fffffff.firebaseapp.com",
    databaseURL: "https://fffffff.firebaseio.com",
    projectId: "fffffff",
    storageBucket: "fffffff.appspot.com",
    messagingSenderId: "87HPWowFm2w999",
    appId: "1:00000031465:web:53a3bHPWowFm2wc6a38",
    measurementId: "G-aSyDI9wPjgY",
  };
  
  export default FIREBASE_CONFIG 
```  

### Using Composition Pattern for Components

### Versions
```
Ionic:

   Ionic CLI       : 6.11.8-testing.0 (/Users/aaronksaunders/.nvm/versions/node/v13.9.0/lib/node_modules/@ionic/cli)
   Ionic Framework : @ionic/vue 5.4.0-dev.202009081429.be01184

Capacitor:

   Capacitor CLI   : 2.4.0
   @capacitor/core : 2.4.0

Utility:

   cordova-res (update available: 0.15.1) : 0.11.0
   native-run                             : 1.0.0

System:

   NodeJS : v13.9.0 (/Users/aaronksaunders/.nvm/versions/node/v13.9.0/bin/node)
   npm    : 6.13.7
   OS     : macOS Catalina

```
