import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const API_KEY = process.env.REACT_APP_FIREBASE_API_KEY;
const AUTH_DOMAIN = process.env.REACT_APP_FIREBASE_AUTHDOMAIN;
const PROJECT_ID = process.env.REACT_APP_FIREBASE_PROHECTID;
const STORAGE_BUCKET = process.env.REACT_APP_FIREBASE_STORAGEBUCKET;
const MESSAGING_SENDER_ID = process.env.REACT_APP_FIREBASE_MESSAGINGSENDERID;
const APP_ID = process.env.REACT_APP_FIREBASE_APPID;

const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: MESSAGING_SENDER_ID,
  appId: APP_ID,
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
const auth = getAuth(firebase);

export { firebase, auth };
