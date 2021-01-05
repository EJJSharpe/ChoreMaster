import * as firebase from "firebase";
import "@firebase/auth";
import "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBKrwzeDTp2YEwHd6tvuGaSdDk53kQNMsQ",
  authDomain: "auth-f41b2.firebaseapp.com",
  projectId: "auth-f41b2",
  storageBucket: "auth-f41b2.appspot.com",
  messagingSenderId: "121607275177",
  appId: "1:121607275177:web:6f7d800b1807c8ea091fb8",
  measurementId: "G-NS173B1W0K",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export { firebase };
