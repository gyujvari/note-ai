import { getApp, getApps, initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCUyt9S4C39urSxj2zQ2CHxtwFtOluOURc",
  authDomain: "notion-ai-fce61.firebaseapp.com",
  projectId: "notion-ai-fce61",
  storageBucket: "notion-ai-fce61.firebasestorage.app",
  messagingSenderId: "117074851293",
  appId: "1:117074851293:web:80c507b108454ccf7af234",
  measurementId: "G-4PQSPD1NJY",
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

export { db };
