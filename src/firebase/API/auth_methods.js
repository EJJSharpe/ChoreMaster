import { firebase } from "../config";
import React from "react";
import "@firebase/auth";
import "@firebase/firestore";

export function registration(fullName, email, password) {
  return firebase
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
      return usersRef
        .doc(currentUserId)
        .set(data)
        .catch((error) => {
          alert("There is something wrong!!!!", error.message);
        });
    })
    .then(() => {
      var user = firebase.auth().currentUser;
      return user
        .sendEmailVerification()
        .catch((error) => alert("There is something wrong!!!!", error.message));
    })

    .then(() => {
      const currentUser = firebase.auth().currentUser;
      const currentUserId = currentUser.uid;
      const usersRef = firebase.firestore().collection("users");
      return usersRef
        .doc(currentUserId)
        .get()
        .then((firestoreDocument) => {
          return { user: firestoreDocument.data() };
        });
    })
    .catch((error) => {
      return { error };
    });
}

export function signIn(email, password) {
  return firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(() => {
      const currentUser = firebase.auth().currentUser;
      const currentUserId = currentUser.uid;
      if (currentUser.emailVerified) {
        const usersRef = firebase.firestore().collection("users");
        return usersRef
          .doc(currentUserId)
          .get()
          .then((firestoreDocument) => {
            if (!firestoreDocument.exists) {
              alert("User does not exist anymore.");
            }
            const user = firestoreDocument.data();
            return { user };
          })
          .catch((error) => {
            alert("There is something wrong!!!!", error.message);
          });
      } else {
        if (currentUser) {
          return currentUser.emailVerified;
        }
      }
    })
    .catch((error) => {
      return { error };
    });
}

export function singInGoogle() {
  let base_provider = new firebase.auth.GoogleAuthProvider();
  return firebase
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
      return usersRef
        .doc(response.user.uid)
        .set(data)
        .then(() => {
          return { user: data };
        })
        .catch((error) => alert("There is something wrong!!!!", error.message));
    });
}
