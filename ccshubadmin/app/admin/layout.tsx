import Header from "@/component/Header"
import SideBar from "@/component/SideBar"

export default function AdminLayout({children}: {children: React.ReactNode}) {
    return (
        <div className="flex h-screen">
            <SideBar/>
            <div className="flex-1 flex flex-col">
                <Header />
                <main className="p-4 flex-1 overflow-auto">{children}</main>
            </div>
        </div>
    )
}