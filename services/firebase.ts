// import * as firebaseApp from "firebase/app";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Replace the following configuration with your actual Firebase config object
// You can find this in your Firebase Console -> Project Settings -> General -> Your Apps
const firebaseConfig = {
  apiKey: "AIzaSyCSvXcMiWH9LYk__1rgxR7YcVy6p5jE1CI",
  authDomain: "feedbackdata-c5591.firebaseapp.com",
  projectId: "feedbackdata-c5591",
  storageBucket: "feedbackdata-c5591.firebasestorage.app",
  messagingSenderId: "504210155858",
  appId: "1:504210155858:web:49485311977f903a06f28b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);