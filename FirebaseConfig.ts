import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD6AExkMjYzWl_O74CMCbN_ZAv8hFsG9XU",
  authDomain: "uee-app-38440.firebaseapp.com",
  projectId: "uee-app-38440",
  storageBucket: "uee-app-38440.appspot.com",
  messagingSenderId: "423308481261",
  appId: "1:423308481261:web:4d98eda166f75dbc8032e4",
  measurementId: "G-CRR2NK807G",
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIRESTORE_DB = getFirestore(FIREBASE_APP);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
