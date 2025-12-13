import Navbar from "../components/Navbar/Navbar";
import { Outlet } from "react-router-dom";

function AppLayout() {
    return (
        <div className="">
            <Navbar />
            <main className="ml-64 relative bg-background text-on-surface overflow-hidden min-h-screen">
                <Outlet />
            </main>
        </div>
    );
}

export default AppLayout;
