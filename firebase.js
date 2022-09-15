// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA_bG4GTlAJ7b4ObQp0cUlQopwnm2LbRyQ",
  authDomain: "universal-expo-app.firebaseapp.com",
  projectId: "universal-expo-app",
  storageBucket: "universal-expo-app.appspot.com",
  messagingSenderId: "973079483622",
  appId: "1:973079483622:web:e6413f59664cacf6f71727",
};

// Initialize Firebase
let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const auth = firebase.auth();
const db = app.firestore();

export { auth, db };
