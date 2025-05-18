import { createUserWithEmailAndPassword, signInWithEmailAndPassword, User } from "firebase/auth";
import { firebaseAuth } from "./firebase";

export interface AuthResult {
  result: boolean;
  message: string;
  email: string;
  user?: User;
}

export class UsersAdapter {
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

  public async registerUser(email: string, password: string): Promise<AuthResult> {
    try {
      const result = await createUserWithEmailAndPassword(firebaseAuth, email, password);
      return {
        result: true,
        message: 'User registered successfully',
        email,
        user: result.user,
      };
    } catch (error) {
      console.error('Error registering user:', error);
      return {
        result: false,
        message: 'Error registering user',
        email,
      }
    }
  }

  public async loginUser(email: string, password: string): Promise<AuthResult> {
    try {
      const result = await signInWithEmailAndPassword(firebaseAuth, email, password);
      return {
        result: true,
        message: 'User logged in successfully',
        email,
        user: result.user,
      };
    } catch (error) {
      console.error('Error logging in user:', error);
      return {
        result: false,
        message: 'Error logging in user',
        email,
      };
    }
  }
}