import Header from "@/component/Header"
import SideBar from "@/component/SideBar"

export default function AdminLayout({children}: {children: React.ReactNode}) {
    return (
        <div className="flex h-screen overflow-hidden">
            <div className="h-full">
                <SideBar />
            </div>
            <div className="flex-1 flex flex-col h-full">
                <Header />
                <main className="flex-1 overflow-y-auto p-4">
                    {children}
                </main>
            </div>
        </div>
    )
}