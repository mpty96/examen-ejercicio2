// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyBcjsaJXRyTyhYrvOYb2O-OuRxoKNzAOfw",
    authDomain: "formulario-tareas.firebaseapp.com",
    projectId: "formulario-tareas",
    storageBucket: "formulario-tareas.firebasestorage.app",
    messagingSenderId: "201979543559",
    appId: "1:201979543559:web:13532acf03af2fde3baaa2",
    measurementId: "G-0EE8BMKV15"
};

export const storage = getStorage(app);
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
