import { db } from './firebase';
import { get, child, ref } from 'firebase/database';

export interface User {
  id: string;
  email: string;
  password: string;
  name?: string;
}

export async function findUserByEmail(email: string): Promise<User | null> {
  const emailKey = email.replace(/[@.]/g, "_");;
  console.log(" Buscando usuario en Firebase con clave:", emailKey);

  const snapshot = await get(child(ref(db), `users/${emailKey}`));

  if (snapshot.exists()) {
    return snapshot.val();
  } else {
    return null;
  }
}
