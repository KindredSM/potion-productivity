import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { Auth, browserLocalPersistence, setPersistence } from "firebase/auth";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import * as firebaseui from "firebaseui";

const firebaseConfig = {
  apiKey: "AIzaSyASUUhv96yP8JuJ1YcFY-yl9w8AwqtoBc8",
  authDomain: "potion-14662.firebaseapp.com",
  projectId: "potion-14662",
  storageBucket: "potion-14662.appspot.com",
  messagingSenderId: "1063584598591",
  appId: "1:1063584598591:web:953af8a3b6f835bb2e868a",
  measurementId: "G-01KL92CGGC",
};
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const ui = new firebaseui.auth.AuthUI(getAuth(app));
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const db = getFirestore(app);
setPersistence(auth, browserLocalPersistence);

export {
  auth,
  onAuthStateChanged,
  getAuth,
  GoogleAuthProvider,
  provider,
  signInWithPopup,
  signOut,
};
export default db;
