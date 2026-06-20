import { Outlet } from "react-router-dom";
import DesktopNavbar from "./DesktopNavbar.jsx";
// import DesktopSidebar from "./DesktopSidebar";

export default function DesktopLayout() {
    return (
        <div className="min-h-screen bg-slate-950 text-white flex">
            {/* <DesktopSidebar /> */}

            <div className="flex-1">
                <DesktopNavbar />

                <main className="p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}