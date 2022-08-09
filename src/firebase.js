// Import the functions you need from the SDKs you need

/* import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore'; 
*/
import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
const firebaseConfig = {
  // apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  // authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  // projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  // storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  // messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  // appId: process.env.REACT_APP_FIREBASE_APP_ID
  apiKey: "AIzaSyDLX3qRJSGpaV42jSbhWZABj8lSQ4Y636Q",
  authDomain: "todo-app-c68bd.firebaseapp.com",
  projectId: "todo-app-c68bd",
  storageBucket: "todo-app-c68bd.appspot.com",
  messagingSenderId: "308061022726",
  appId: "1:308061022726:web:54a9ce1193cb682a23b187"
};

// Initialize Firebase

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const auth = getAuth()