// Import the functions you need from the SDKs you need

/* import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore'; 
*/

import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: "todo-app-c68bd.firebaseapp.com",
  projectId: "todo-app-c68bd",
  storageBucket: "todo-app-c68bd.appspot.com",
  messagingSenderId: "308061022726",
  appId: "1:308061022726:web:54a9ce1193cb682a23b187"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth()