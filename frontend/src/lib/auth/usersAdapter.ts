import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { firebaseAuth } from "./firebase";

class UsersAdapter {
  private static instance: UsersAdapter;

  private constructor() {
    console.log('UsersAdapter initialized');
  }

  public static getInstance(): UsersAdapter {
    if (!UsersAdapter.instance) {
      UsersAdapter.instance = new UsersAdapter();
    }
    return UsersAdapter.instance;
  }

  public async registerUser(email: string, password: string): Promise<any> {
    try {
      const result = await createUserWithEmailAndPassword(firebaseAuth, email, password);
      return { message: 'User registered successfully', email, user: result.user };
    } catch (error) {
      console.error('Error registering user:', error);
      throw new Error('Error registering user');
    }
  }

  public async loginUser(email: string, password: string): Promise<any> {
    try {
      const result = await signInWithEmailAndPassword(firebaseAuth, email, password);
      return { message: 'User logged in successfully', email, user: result.user };
    } catch (error) {
      console.error('Error logging in user:', error);
      throw new Error('Error logging in user');
    }
  }
}