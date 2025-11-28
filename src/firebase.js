import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBDwxtqjJE7_4ZqJR4ZKtG9FHv9lqH_FJk",
  authDomain: "mealdb-auth-c6424.firebaseapp.com",
  projectId: "mealdb-auth-c6424",
  storageBucket: "mealdb-auth-c6424.firebasestorage.app",
  messagingSenderId: "737008725042",
  appId: "1:737008725042:web:f3695606b278e777ce202b"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const googleProvider = new GoogleAuthProvider();