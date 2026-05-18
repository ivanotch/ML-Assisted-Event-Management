import { useState } from "react";
import { loginUser } from "../services/loginUser";

export const useLogin = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const login = async (email: string, password: string) => {
        try {
            setLoading(true);
            setError(null);
            await loginUser(email, password);
            return true; // ✅ success
        } catch (err: any) {
            setError(err.message);
            return false; // ❌ failed
        } finally {
            setLoading(false);
        }
    };

    return { login, loading, error };
};