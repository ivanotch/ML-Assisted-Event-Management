'use client';
import Image from "next/image";
import Link from "next/link";
import {
    LayoutDashboard,
    Calendar,
    Image as ImageIcon,
    MessageSquare,
    Inbox,
    Mail,
    History,
    Settings,
    LogOut,
    CalendarDays,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useState } from "react";
import { useRouter } from "next/navigation";


export default function SideBar() {
    const pathname = usePathname();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [showLogoutModal, setShowLogoutModal] = useState(false);


    const navItem = [
        { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
        { name: "Events", href: "/admin/events", icon: Calendar },
        { name: "Calendar", href: "/admin/calendar", icon: CalendarDays },
        { name: "Gallery", href: "/admin/gallery", icon: ImageIcon },
        { name: "Feedback", href: "/admin/feedback", icon: MessageSquare },
        { name: "Inbox", href: "/admin/inbox", icon: Inbox },
        { name: "Messages", href: "/admin/messages", icon: Mail },
        { name: "Event History", href: "/admin/history", icon: History },
    ]

    const handleLogout = async () => {
        setLoading(true);

        try {
            await signOut(auth);

            await fetch("/api/logout", {
                method: "POST",
            });

            router.push("/auth/login");
        } catch (error) {
            console.error("Logout failed:", error);
        } finally {
            setLoading(false);
        }
    };
    return (
        <aside className="w-64 h-screen bg-gray-100 flex flex-col justify-between">

            {/* Top Section */}
            <div>

                {/* Logo */}
                <div className="flex items-center gap-3 px-6 py-4 border-b-1">
                    <Image
                        src="/ccslogo.jpg"
                        alt="ccs logo"
                        height={45}
                        width={45}
                        className="rounded-full"
                    />
                    <h4 className="text-2xl font-semibold">CCSHUB</h4>
                </div>

                {/* Navigation */}
                <nav className="mt-6 flex flex-col gap-2 px-4">
                    {navItem.map((item) => {
                        const Icon = item.icon;
                        const isActive = pathname === item.href;

                        return (
                            <Link key={item.name} href={item.href} className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${isActive ? 'bg-blue-600 text-white font-medium' : "hover:bg-gray-300 text-gray-700"}`}>
                                <Icon size={20} />
                                {item.name}
                            </Link>
                        )
                    })}

                </nav>
            </div>


            {/* Bottom Section */}
            <div className="px-4 pb-6 flex flex-col gap-2 border-t pt-4">

                <Link
                    href="/admin/settings"
                    className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-200"
                >
                    <Settings size={20} />
                    Settings
                </Link>

                <button
                    onClick={() => setShowLogoutModal(true)}
                    className="flex items-center gap-3 px-4 py-3 rounded-lg text-red-500 hover:bg-red-100"
                >
                    <LogOut size={20} />
                    Sign Out
                </button>

            </div>

            {showLogoutModal && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 font-[inter]">
                    <div className="bg-white rounded-xl shadow-lg w-[90%] max-w-md p-6">

                        <h2 className="text-lg font-semibold text-gray-900">
                            Confirm Logout
                        </h2>

                        <p className="text-sm text-gray-600 mt-2">
                            Are you sure you want to sign out of your account?
                        </p>

                        <div className="flex justify-end gap-3 mt-6">

                            <button
                                onClick={() => setShowLogoutModal(false)}
                                className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
                                disabled={loading}
                            >
                                Cancel
                            </button>

                            <button
                                onClick={async () => {
                                    setShowLogoutModal(false);
                                    await handleLogout();
                                }}
                                disabled={loading}
                                className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 disabled:opacity-50"
                            >
                                {loading ? "Signing out..." : "Yes, Sign Out"}
                            </button>

                        </div>
                    </div>
                </div>
            )}

        </aside>
    );
}