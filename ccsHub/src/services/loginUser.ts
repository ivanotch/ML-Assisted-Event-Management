import { auth } from "../lib/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";

export const loginUser = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
};