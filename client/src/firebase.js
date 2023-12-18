// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: "real-estate-d0b12.firebaseapp.com",
    projectId: "real-estate-d0b12",
    storageBucket: "real-estate-d0b12.appspot.com",
    messagingSenderId: "190123687318",
    appId: "1:190123687318:web:ec24f716a615648899b1b7"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);