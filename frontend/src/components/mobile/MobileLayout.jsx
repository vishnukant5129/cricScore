import { Outlet } from "react-router-dom";
import MobileNavbar from "./MobileNavbar.jsx";
import MobileBottomNav from "./MobileBottomNav.jsx";

export default function MobileLayout() {
    return (
        <div className="min-h-screen bg-slate-950 text-white">
            <MobileNavbar />

            <main className="px-4 py-4 pb-24">
                <Outlet />
            </main>

            <MobileBottomNav />
        </div>
    );
}