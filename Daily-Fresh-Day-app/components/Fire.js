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
            console.log("User is signed out");
            callback(null, null);
        }
      });  
    }
    async signInWithEmail(email, password) {
      if (!email || !password) {
          throw new Error("Email and password must be provided.");
      }
      return await firebase.auth().signInWithEmailAndPassword(email, password);
  }

  getLists(callback) {
    const ref = this.ref;
    if (!ref) {
        console.log("Cannot get lists: User is not signed in");
        return;
    }

    this.unsubscribe = ref.orderBy("name").onSnapshot(snapshot => {
        let lists = [];
        snapshot.forEach(doc => {
            lists.push({ id: doc.id, ...doc.data() });
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
      const user = firebase.auth().currentUser;
      if (user) {
          return user.uid;
      }
      console.log("No user is signed in.");
      return null;
  }

    get ref() {
      const userId = this.userId;
      if (!userId) {
        console.log("Cannot access Firestore reference: User is not signed in");
        return null;
      }
      return firebase
        .firestore()
        .collection("users")
        .doc(userId)
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