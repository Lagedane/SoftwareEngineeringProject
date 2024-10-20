import firebase from "firebase/compat/app";
import "@firebase/firestore";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyD6M_kqKBNTLQ1s_gmWDimV6dyn4JtUOvk",
    authDomain: "daily-fresh-day-app-b6c19.firebaseapp.com",
    projectId: "daily-fresh-day-app-b6c19",
    storageBucket: "daily-fresh-day-app-b6c19.appspot.com",
    messagingSenderId: "92239574986",
    appId: "1:92239574986:web:650b88d537135f3d9e0133"
  };
  
/*  class Fire {
    constructor(callback) {
      this.init(callback)
    }
    init(callback) {
      if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig)
      }
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          callback(null, user)
        } else {
          firebase
            .auth()
            .signInAnonymously()
            .catch(error => {
                callback(error)
          });
        }
      });
    }
  }*/

  // Initialize Firebase
  export const FIREBASE_APP = initializeApp(firebaseConfig);
  export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
  // Initialize Cloud Firestore and get a reference to the service
  export const FIREBASE_DB = getFirestore(FIREBASE_APP);

  //export default Fire;