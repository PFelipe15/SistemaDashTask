import { getAuth } from 'firebase/auth'
import { initializeApp } from "firebase/app";
 
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyCsQPutKM72e7IyjLe9BM7bW-N0oSAFxiA",
  authDomain: "dashtasksteam.firebaseapp.com",
  projectId: "dashtasksteam",
  storageBucket: "dashtasksteam.appspot.com",
  messagingSenderId: "353097192095",
  appId: "1:353097192095:web:4ad51587567c13d1b588aa"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app)
export { auth, app, db}

