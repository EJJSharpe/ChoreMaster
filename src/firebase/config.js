import * as firebase from 'firebase';
import '@firebase/auth';
import '@firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCsjSAiIgiNIwlowd1iMUdrHtckc3KeTWI",
    authDomain: "choremaster-494e1.firebaseapp.com",
    projectId: "choremaster-494e1",
    storageBucket: "choremaster-494e1.appspot.com",
    messagingSenderId: "303364202218",
    appId: "1:303364202218:web:b001ca63594ef3fade0193"
};


if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase };