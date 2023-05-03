import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const API_KEY = import.meta.env.VITE_FIREBASE_API_KEY;
export const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: "coupon-90961.firebaseapp.com",
  projectId: "coupon-90961",
  storageBucket: "coupon-90961.appspot.com",
  messagingSenderId: "525067819955",
  appId: "1:525067819955:web:aa8fe6b9ae5acf920509c6",
  measurementId: "G-44DN27JLRS",
};
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const db = getFirestore(app);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
