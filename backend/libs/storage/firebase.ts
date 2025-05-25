// Import the functions you need from the SDKs you need
import { initializeApp, type FirebaseOptions } from "firebase/app";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database"; // Para Realtime Database
import { getStorage } from "firebase/storage"; // Para Firebase Storage

// Configuración de Firebase con variables de entorno (.env)
const firebaseConfig: FirebaseOptions = {
  apiKey: process.env.FIRE_APIKEY,
  authDomain: process.env.FIRE_AUTHDOMAIN,
  projectId: process.env.FIRE_PROJECTID,
  storageBucket: process.env.FIRE_STORAGEBUCKET,
  messagingSenderId: process.env.FIRE_MESSAGINGSENDERID,
  appId: process.env.FIRE_APPID,
  databaseURL: process.env.FIRE_DATABASE_URL,
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
export const firebaseStorage = getFirestore(firebaseApp);
export const db = getDatabase(firebaseApp);
export const firebaseFiles = getStorage(firebaseApp);

// Test Firestore connection
(async () => {
  try {
    // Try to read a known document (change path as needed)
    const testDoc = doc(firebaseStorage, "test/test");
    await getDoc(testDoc);
    console.log("Firestore connection successful!");
    // If successful, do nothing
  } catch (err) {
    console.error("Failed to connect to Firestore:", err);
    process.exit(1); // Crash the app
  }
})();
