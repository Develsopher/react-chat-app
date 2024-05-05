import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "react-75141.firebaseapp.com",
  projectId: "react-75141",
  storageBucket: "react-75141.appspot.com",
  messagingSenderId: "945705904522",
  appId: "1:945705904522:web:f733e33fd6fdb02e1f0073",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore();
export const storage = getStorage();
