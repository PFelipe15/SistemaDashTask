import { getAuth } from 'firebase/auth'
import { initializeApp } from "firebase/app";
 
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyDSgLo30xFGcLj34bjCzpQuN90u98uFI0g",
  authDomain: "react-auth-e344e.firebaseapp.com",
  projectId: "react-auth-e344e",
  storageBucket: "react-auth-e344e.appspot.com",
  messagingSenderId: "423506005322",
  appId: "1:423506005322:web:9d626e4c0f8308caa045b3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app)
export { auth, app, db}

