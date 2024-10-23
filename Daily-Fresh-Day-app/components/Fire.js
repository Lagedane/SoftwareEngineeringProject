import firebase  from 'firebase/compat';
import "@firebase/firestore";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyD6M_kqKBNTLQ1s_gmWDimV6dyn4JtUOvk",
    authDomain: "daily-fresh-day-app-b6c19.firebaseapp.com",
    projectId: "daily-fresh-day-app-b6c19",
    storageBucket: "daily-fresh-day-app-b6c19.appspot.com",
    messagingSenderId: "92239574986",
    appId: "1:92239574986:web:650b88d537135f3d9e0133"
  };
  
  class Fire {
    constructor(callback) {
      this.init(callback);
    }
    init(callback) {
      if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
      }
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          callback(null, user);
        } else {
          firebase
            .auth()
            .signInWithEmailAndPassword()
            .catch(error => {
                callback(error);
          });
        }
      });     
    }

    getLists(callback) {
      let ref = this.ref.orderBy("name") 

      this.unsubscribe = ref.onSnapshot(snapshot => {
        lists = [];
    
        snapshot.forEach(doc => {
            lists.push({id: doc.id, ...doc.data()});
         });

          callback(lists);
        });
    }

    addList(list) {
      let ref = this.ref;

      ref.add(list);
    }

    updateList(list) {
      let ref = this.ref;

      ref.doc(list.id).update(list);
    }

    get userId() {
      return firebase.auth().currentUser.uid
    }

    get ref() {
      return firebase
      .firestore()
      .collection("users")
      .doc(this.userId)
      .collection("lists");
    }

    detach() {
      this.unsubscribe();
    }
  }

  // Initialize Firebase App
  const FIREBASE_APP = initializeApp(firebaseConfig);
 
  const FIREBASE_AUTH = getAuth(FIREBASE_APP);

  export { FIREBASE_APP, FIREBASE_AUTH, Fire };