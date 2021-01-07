import firebase from 'firebase';
import '@firebase/auth';
import '@firebase/firestore';

let mocked;

if (process.env.NODE_ENV === "test") {
    const { mockFirebaseAdmin, exposeMockFirebaseAdminApp } = require('ts-mock-firebase')

    const firebaseAdmin = mockFirebaseAdmin();
    const firebaseApp = firebaseAdmin.initializeApp({});
    mocked = exposeMockFirebaseAdminApp(firebaseApp);
} else {
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
}

const expFirebase = mocked || firebase;

export { expFirebase as firebase };