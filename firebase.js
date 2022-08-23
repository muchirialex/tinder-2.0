// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBAKR91qxArywhAdS1gXB8rfqbBigJcw2g",
  authDomain: "tinder-2-app.firebaseapp.com",
  projectId: "tinder-2-app",
  storageBucket: "tinder-2-app.appspot.com",
  messagingSenderId: "336649372217",
  appId: "1:336649372217:web:d03d13e378e4a4d7b603e8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

export { auth, db };