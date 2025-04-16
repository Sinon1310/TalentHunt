// src/firebase.js

import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getDatabase } from "firebase/database";

// ✅ Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBc9LP5Fk9RUMPvwPoa9Oh1BCC0e3AydpY",
  authDomain: "talenthunt-9c0ba.firebaseapp.com",
  projectId: "talenthunt-9c0ba",
  storageBucket: "talenthunt-9c0ba.appspot.com",
  messagingSenderId: "900894251117",
  appId: "1:900894251117:web:5891d1bb344c743c80c764",
  databaseURL: "https://talenthunt-9c0ba-default-rtdb.firebaseio.com"
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ Auth & Google Provider
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const database = getDatabase(app);

export { auth, googleProvider, database };
