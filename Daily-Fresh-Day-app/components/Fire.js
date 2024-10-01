import firebase from "firebase";
import "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAhbJrK-rkxW_Ln5b3s_ZMDChxlMfovSRk",
  authDomain: "daily-fresh-day-app.firebaseapp.com",
  projectId: "daily-fresh-day-app",
  storageBucket: "daily-fresh-day-app.appspot.com",
  messagingSenderId: "557536781348",
  appId: "1:557536781348:web:dc83c20032ab8210c2a4b1",
  measurementId: "G-7F53TDF4HD",
};

class Fire {
  constructor(callback) {
    this.init(callback);
  }
  init() {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        callback(null, user);
      } else {
        firebase
          .auth()
          .signInAnonymously()
          .catch((error) => {
            callback(error);
          });
      }
    });
  }

  getLists(callback) {
    let ref = firebase
      .firestore()
      .collection("users")
      .doc(this.userId)
      .collection("lists");

    this.unsubscribe = ref.onSnapshot((snapshot) => {
      lists = [];

      snapshot.forEach((doc) => {
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
    return firebase.auth().currentUser.uid;
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

export default Fire;
