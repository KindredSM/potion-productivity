// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// import { getFirestore } from "firebase/firestore";
import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyASUUhv96yP8JuJ1YcFY-yl9w8AwqtoBc8",
  authDomain: "potion-14662.firebaseapp.com",
  projectId: "potion-14662",
  storageBucket: "potion-14662.appspot.com",
  messagingSenderId: "1063584598591",
  appId: "1:1063584598591:web:953af8a3b6f835bb2e868a",
  measurementId: "G-01KL92CGGC",
};

firebase.initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

const db = firebase.firestore();

export default db;
