<<<<<<< HEAD
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
=======
import { initializeApp, type FirebaseOptions } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database"; // Para Realtime Database

// Configuración de Firebase con variables de entorno (.env)
const firebaseConfig: FirebaseOptions = {
>>>>>>> 4629910e2edf1070e64655c240fe90314c7d4328
  apiKey: process.env.FIRE_APIKEY,
  authDomain: process.env.FIRE_AUTHDOMAIN,
  projectId: process.env.FIRE_PROJECTID,
  storageBucket: process.env.FIRE_STORAGEBUCKET,
  messagingSenderId: process.env.FIRE_MESSAGINGSENDERID,
<<<<<<< HEAD
  appId: process.env.FIRE_APPID
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
export const firebaseStorage = getFirestore(firebaseApp);
=======
  appId: process.env.FIRE_APPID,
  databaseURL: process.env.FIRE_DATABASE_URL
};

export const firebaseApp = initializeApp(firebaseConfig);
export const firebaseStorage = getFirestore(firebaseApp);
export const db = getDatabase(firebaseApp);
>>>>>>> 4629910e2edf1070e64655c240fe90314c7d4328
