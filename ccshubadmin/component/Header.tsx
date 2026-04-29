'use client'
import Image from "next/image";
import { Search, Bell, Settings } from "lucide-react";
import { useEffect, useState } from "react";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";

const user = {
    name: "Ivan Bods",
    role: "Admin",
    profileImage: null // example
};

export default function Header() {
    const [userData, setUserData] = useState<{
        email: string | null;
        role: string | null;
        photoURL: string | null;
    } | null>(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (!user) {
                setUserData(null);
                return;
            }

            const tokenResult = await user.getIdTokenResult();

            setUserData({
                email: user.email,
                role: tokenResult.claims.role as string,
                photoURL: user.photoURL,
            });
        });

        return () => unsubscribe();
    }, []);

    console.log(userData)

    const profileImage = userData?.photoURL || "/placeholder-avatar.png";

    return (
        <header className="w-full px-6 py-4 flex items-center justify-between bg-white border-b-1">

            {/* Search Bar */}
            <div className="relative w-[350px]">
                <Search
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                    type="text"
                    placeholder="Search events..."
                    className="w-full pl-10 pr-4 py-2 rounded-lg border bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-6">

                {/* Notifications */}
                <button className="relative p-2 rounded-lg hover:bg-gray-100">
                    <Bell size={20} />
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                        3
                    </span>
                </button>

                {/* Settings */}
                <button className="p-2 rounded-lg hover:bg-gray-100">
                    <Settings size={20} />
                </button>

                {/* Profile */}
                <div className="flex items-center gap-3 cursor-pointer hover:bg-gray-100 px-2 py-1 rounded-lg">

                    {/* Avatar */}
                    <Image
                        src={profileImage}
                        alt="Admin profile"
                        width={38}
                        height={38}
                        className="rounded-full object-cover"
                        onError={(e) => {
                            e.currentTarget.src = "/placeholder-avatar.png";
                        }}
                    />

                    {/* Name + Role */}
                    <div className="leading-tight">
                        <p className="text-sm font-semibold">
                            {userData?.email || "Loading..."}
                        </p>
                        <p className="text-xs text-gray-500">
                            {userData?.role || "No role"}
                        </p>
                    </div>

                </div>

            </div>
        </header>
    );
}