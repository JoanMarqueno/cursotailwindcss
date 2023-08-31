import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { auth, db } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

export interface User {
  email: string | null;

  // Define la estructura del objeto de usuario si es posible
}

interface AuthContextType {
  signUp: (email: string, password: string) => void;
  logIn: (email: string, password: string) => void;
  logOut: () => Promise<void>;
  user: User;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

type Props = {
  children: ReactNode;
};

export function AuthContextProvider({ children }: Props) {
  
  const [user, setUser] = useState<User>({ email: "" });

  const signUp = async (email: string, password: string) => {
    createUserWithEmailAndPassword(auth, email, password);
    await setDoc(doc(db, "users", email), {
      savedShows: [],
    });
  }
  const logIn = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
  }

 async function logOut() {
    return await signOut(auth)
      .then(() => {
        setUser({ email: null });
      })
      .catch((err) => {
        console.error("Error during logout: " + err.message);
      });
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ logOut, user, signUp, logIn }}>
      {children}
    </AuthContext.Provider>
  );
}

export function UserAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth debe ser usado dentro de AuthContextProvider");
  }
  return context;
}
