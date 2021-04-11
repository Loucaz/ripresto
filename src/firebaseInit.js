
import firebase from "firebase/app";

require('firebase/app');
require('firebase/auth');
require('firebase/database');
var firebaseConfig = {
    apiKey: "AIzaSyBV6b3Rs04rqNxmFEICxJlNKDp98K8Oam0",
    authDomain: "ripresto-1670b.firebaseapp.com",
    databaseURL: "https://ripresto-1670b-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "ripresto-1670b",
    storageBucket: "ripresto-1670b.appspot.com",
    messagingSenderId: "775264129226",
    appId: "1:775264129226:web:48d14b3cd2f03270b22433"
  };
// Initialize Firebase
export default firebase.initializeApp(firebaseConfig);