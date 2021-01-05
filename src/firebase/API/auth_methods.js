import { firebase } from "../config";
import React from "react";
import "@firebase/auth";
import "@firebase/firestore";

export function registration(fullName, email, password) {
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(() => {
      const currentUser = firebase.auth().currentUser;
      const currentUserId = currentUser.uid;
      const data = {
        id: currentUserId,
        email: email,
        fullName: fullName,
        avatar: null,
        houseId: null,
        points: 0,
      };
      const usersRef = firebase.firestore().collection("users");
      usersRef
        .doc(currentUserId)
        .set(data)
        .then(() => {
          return { user: data };
        })

        .catch((error) => {
          alert("There is something wrong!!!!", error.message);
        });
    })
    .then(() => {
      var user = firebase.auth().currentUser;
      user
        .sendEmailVerification()
        .then()
        .catch((error) => alert("There is something wrong!!!!", error.message));
    });
}

export function singIn(email, password) {
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(() => {
      const currentUser = firebase.auth().currentUser;
      const currentUserId = currentUser.uid;

      if (currentUser.emailVerified) {
        const usersRef = firebase.firestore().collection("users");
        usersRef
          .doc(currentUserId)
          .get()
          .then((firestoreDocument) => {
            if (!firestoreDocument.exists) {
              alert("User does not exist anymore.");
            }

            const user = firestoreDocument.data();
            return [{ user }];
          })
          .catch((error) => {
            alert("There is something wrong!!!!", error.message);
          });
        console.log(usersRef, "user");
      } else {
        alert("please verified your email");
        // console.log(currentUser.emailVerified);
        return currentUser.emailVerified;
      }
    });
}

export function singInGoogle() {
  let base_provider = new firebase.auth.GoogleAuthProvider();
  firebase
    .auth()
    .signInWithPopup(base_provider)
    .then((response) => {
      const data = {
        id: response.user.uid,
        email: response.user.email,
        fullName: response.user.displayName,
        avatar: null,
        houseId: null,
        points: 0,
      };
      const usersRef = firebase.firestore().collection("users");
      usersRef
        .doc(response.user.uid)
        .set(data)
        .then(() => {
          return { user: data };
        })
        .catch((error) => alert("There is something wrong!!!!", error.message));
    });
}
