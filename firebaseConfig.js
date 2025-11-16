// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

// Replace these values with your Firebase project credentials
const firebaseConfig = {
    apiKey: "AIzaSyCSmiUSlQ8ihe_dHrg3s4yYMU9EOa-Adjo",
    authDomain: "manhwa-library-8160d.firebaseapp.com",
    projectId: "manhwa-library-8160d",
    storageBucket: "manhwa-library-8160d.firebasestorage.app",
    messagingSenderId: "154910407514",
    appId: "1:154910407514:web:379678b872b450fef45163",
    measurementId: "G-WKP522N9RZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Auth and Realtime Database
export const auth = getAuth(app);
export const db = getDatabase(app);
