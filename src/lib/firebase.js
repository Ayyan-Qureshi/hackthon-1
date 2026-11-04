// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAoaxYglpXVMlAmJoQehB4cfzg_DU5m_s",
  authDomain: "hcm-lite-9bda8.firebaseapp.com",
  projectId: "hcm-lite-9bda8",
  storageBucket: "hcm-lite-9bda8.appspot.com",
  messagingSenderId: "810881802852",
  appId: "1:810881802852:web:41c47369e8fa5d5d72f571"
};

// Initialize Firebase securely
const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];
const db = getFirestore(app);

// Export db so your API routes can use it
export { db };