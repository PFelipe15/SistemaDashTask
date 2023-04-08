import { getAuth } from 'firebase/auth'
import { initializeApp } from "firebase/app";
 
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  // apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  // authDomain: import.meta.env.VITE_FIREBASE_AUTHDOMAIN,
  // projectId: import.meta.env.VITE_FIREBASE_PROJECTID,
  // storageBucket: import.meta.env.VITE_FIREBASE_STORAGEBUCKET,
  // messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGINGSENDERID,
  // appId: import.meta.env.VITE_FIREBASE_APPID
  apiKey: "AIzaSyAd31x5xNcZuzAh9ahtxTOYu2aCy22k3Dg",
  authDomain: "dashtaskteam.firebaseapp.com",
  projectId: "dashtaskteam",
  storageBucket: "dashtaskteam.appspot.com",
  messagingSenderId: "82795153879",
  appId: "1:82795153879:web:b17945931eebfaee6ae392"

};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app)
 
export { auth, app, db }

