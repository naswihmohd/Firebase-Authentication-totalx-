import { initializeApp } from "firebase/app";
import {  getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyCxgnkJgoB0E96s_iSOTmx4EzfbSvoBM1U",
    authDomain: "totalx-acd55.firebaseapp.com",
    projectId: "totalx-acd55",
    storageBucket: "totalx-acd55.firebasestorage.app",
    messagingSenderId: "973568118709",
    appId: "1:973568118709:web:8c90adddb67071855793fc",
    measurementId: "G-ECMQ8YNNGJ"
  };

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);