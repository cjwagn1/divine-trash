import firebase from 'firebase'
var config = { /* COPY THE ACTUAL CONFIG FROM FIREBASE CONSOLE */
    apiKey: "AIzaSyDqqmxD293C2AKiDIaJBxlP-Ef4lxIs8aM",
    authDomain: "divine-trash.firebaseapp.com",
    databaseURL: "https://divine-trash.firebaseio.com",
    projectId: "divine-trash",
    storageBucket: "divine-trash.appspot.com",
    messagingSenderId: "637660782331"
};
var fire = firebase.initializeApp(config);
export default fire;
