import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import dayjs from "dayjs";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  User,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

import { auth, database } from "@/lib/firebase";

interface Context {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (name: string, email: string, password: string) => Promise<void>;
  signOut: () => void;
}

const AuthContext = createContext<Context | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (name: string, email: string, password: string) => {
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      const currentUser = auth.currentUser;
      if (currentUser) {
        await updateProfile(currentUser, { displayName: name });
      }
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const signOut = () => auth.signOut();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user: User | null) => {
      setUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const contextValues = {
    user,
    loading,
    signIn,
    signUp,
    signOut,
  };
  return (
    <AuthContext.Provider value={contextValues}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw Error("useAuth must be used within an AuthProvider!");
  return context;
};
