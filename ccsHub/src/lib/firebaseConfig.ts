// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCTnTe_JzqMsTxwBxmmBy_FPzC-o909oGk",
    authDomain: "ccs-event-system.firebaseapp.com",
    projectId: "ccs-event-system",
    storageBucket: "ccs-event-system.firebasestorage.app",
    messagingSenderId: "1005210030866",
    appId: "1:1005210030866:web:440fc9c858c810b2d759cb"
};

// Initialize Firebase
const app = !getApps().length
    ? initializeApp(firebaseConfig)
    : getApp();

export const db = getFirestore(app);
export const auth = getAuth(app);