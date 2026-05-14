'use client'
import Link from 'next/link';
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
    const router = useRouter()

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [fieldError, setFieldError] = useState<{
        email?: string;
        password?: string;
    }>({});

    const validate = () => {
        const errors: any = {};

        if (!email.includes("@")) {
            errors.email = "Please enter a valid email";
        }

        if (password.length < 6) {
            errors.password = "Password must be at least 6 characters";
        }

        setFieldError(errors);

        return Object.keys(errors).length === 0;
    };


    const handleLogin = async () => {
        setError("");

        if (!validate()) return;

        setLoading(true);

        try {
            const userCredential = await signInWithEmailAndPassword(
                auth,
                email,
                password
            );

            const token = await userCredential.user.getIdToken();

            const res = await fetch("/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ token }),
            });

            if (!res.ok) {
                throw new Error("Unauthorized access");
            }

            router.push("/admin");
        } catch (err: any) {
            console.log(err);

            // 🔥 Firebase error mapping
            switch (err.code) {
                case "auth/user-not-found":
                    setError("No account found with this email.");
                    break;

                case "auth/wrong-password":
                    setError("Incorrect password.");
                    break;

                case "auth/invalid-email":
                    setError("Invalid email format.");
                    break;

                case "auth/too-many-requests":
                    setError("Too many attempts. Try again later.");
                    break;

                default:
                    setError("Login failed. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col font-[inter] justify-center py-12 sm:px-6 lg:px-8">
            {/* Header Section */}
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <div className="flex justify-center">
                    {/* Optional: Replace with an actual SVG logo for CCSHUB */}

                </div>
                <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-900 tracking-tight">
                    CCSHUB
                </h2>
                <p className="mt-2 text-center text-sm text-slate-500 font-medium">
                    Event Management Admin Portal
                </p>
            </div>

            {/* Form Section */}
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    handleLogin();
                }}
                className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow-xl shadow-slate-200/50 sm:rounded-2xl sm:px-10 border border-slate-100">
                    <div className="space-y-6">

                        {/* Email Input */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-slate-700">
                                Email Address
                            </label>
                            <div className="mt-2">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    onChange={(e) => {
                                        setEmail(e.target.value)
                                    }}
                                    required
                                    className="appearance-none block w-full px-4 py-3 border border-slate-300 rounded-xl shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-all duration-200 ease-in-out"
                                    placeholder="admin@ccshub.com"
                                />
                                {fieldError.email && (
                                    <p className="text-sm text-red-500 mt-1">
                                        {fieldError.email}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Password Input */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-slate-700">
                                Password
                            </label>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    onChange={(e) => {
                                        setPassword(e.target.value)
                                    }}
                                    required
                                    className="appearance-none block w-full px-4 py-3 border border-slate-300 rounded-xl shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-all duration-200 ease-in-out"
                                    placeholder="••••••••"
                                />
                                {fieldError.password && (
                                    <p className="text-sm text-red-500 mt-1">
                                        {fieldError.password}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Forgot Password Link */}
                        <div className="flex items-center justify-end">
                            <div className="text-sm">
                                <Link
                                    href="/admin/forgot-password"
                                    className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors duration-200"
                                >
                                    Forgot your password?
                                </Link>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div>
                            {error && (
                                <div className="bg-red-50 border border-red-200 text-red-600 text-sm p-3 rounded-lg">
                                    {error}
                                </div>
                            )}
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 ease-in-out"
                            >
                                {loading ? "Signing in..." : "Sign In to Dashboard"}
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}