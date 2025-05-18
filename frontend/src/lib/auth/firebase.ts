import { getAuth } from "firebase/auth";
import { FirebaseOptions, initializeApp } from "firebase/app";
import { environment } from "../../environments/environment";

// Configuración de Firebase con variables de entorno (.env)
const firebaseConfig: FirebaseOptions = {
  apiKey: environment.firebase.apiKey,
  authDomain: environment.firebase.authDomain,
  projectId: environment.firebase.projectId,
  storageBucket: environment.firebase.storageBucket,
  messagingSenderId: environment.firebase.messagingSenderId,
  appId: environment.firebase.appId,
  databaseURL: environment.firebase.databaseURL,
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);

export const firebaseAuth = getAuth(firebaseApp);
