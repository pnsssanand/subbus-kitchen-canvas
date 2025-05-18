
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCrXa_4jlFiiyIQVGZp9GbXiG8i739fvuA",
  authDomain: "subu-kitchen.firebaseapp.com",
  projectId: "subu-kitchen",
  storageBucket: "subu-kitchen.firebasestorage.app",
  messagingSenderId: "583660714878",
  appId: "1:583660714878:web:367a96b28fd9897bbf512f",
  measurementId: "G-7HYJB37LX5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

// Initialize Analytics
const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;

export default app;
