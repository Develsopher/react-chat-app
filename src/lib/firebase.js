import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "react-chat-eebba.firebaseapp.com",
  projectId: "react-chat-eebba",
  storageBucket: "react-chat-eebba.appspot.com",
  messagingSenderId: "254385145550",
  appId: "1:254385145550:web:6f6b2f6baca09e10d6329f",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore();
export const storage = getStorage();
