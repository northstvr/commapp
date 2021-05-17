import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAVn1QaJbEC-CU6mmQr2z5HjBuj57FJB7s",
    authDomain: "commappx.firebaseapp.com",
    projectId: "commappx",
    storageBucket: "commappx.appspot.com",
    messagingSenderId: "462517056251",
    appId: "1:462517056251:web:2a1d8a0ed25d6c898c765e"
  };

let app;

if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const  db = app.firestore();
const auth = firebase.auth();

export { db, auth };
