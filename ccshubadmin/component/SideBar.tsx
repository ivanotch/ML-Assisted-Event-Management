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


export default function SideBar() {
    const pathname = usePathname();

    const navItem = [
        { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
        { name: "Events", href: "/admin/events", icon: Calendar },
        { name: "Calendar", href: "/admin/calendar", icon: CalendarDays },
        { name: "Gallery", href: "/admin/gallery", icon: ImageIcon },
        { name: "Feedback", href: "/admin/feedback", icon: MessageSquare },
        { name: "Inbox", href: "/admin/inbox", icon: Inbox },
        { name: "Messages", href: "/admin/messages", icon: Mail },
        { name: "Event History", href: "/admin/event-history", icon: History },
    ]


    return (
        <aside className="w-64 h-screen bg-gray-100 flex flex-col justify-between">

            {/* Top Section */}
            <div>

                {/* Logo */}
                <div className="flex items-center gap-3 px-6 py-6 border-b">
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
                        const isActive = pathname.startsWith(item.href);

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
                    className="flex items-center gap-3 px-4 py-3 rounded-lg text-red-500 hover:bg-red-100"
                >
                    <LogOut size={20} />
                    Sign Out
                </button>

            </div>

        </aside>
    );
}