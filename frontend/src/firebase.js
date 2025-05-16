
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mccarthy-18.firebaseapp.com",
  projectId: "mccarthy-18",
  storageBucket: "mccarthy-18.firebasestorage.app",
  messagingSenderId: "376846769185",
  appId: "1:376846769185:web:eeb6f8d3611961b12d9760",
  measurementId: "G-9N87Y8GCY2"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);