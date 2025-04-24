import { initializeApp, type FirebaseOptions } from "firebase/app";
import { getFirestore } from "firebase/firestore";
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
  databaseURL: process.env.FIRE_DATABASE_URL
};

export const firebaseApp = initializeApp(firebaseConfig);
export const firebaseStorage = getFirestore(firebaseApp);
export const db = getDatabase(firebaseApp);
export const firebaseFiles = getStorage(firebaseApp);
