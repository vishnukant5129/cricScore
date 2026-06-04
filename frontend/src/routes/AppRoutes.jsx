import { Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home.jsx";
import Login from "../pages/Login.jsx";
import Signup from "../pages/Signup.jsx";

export default function AppRoutes() {
    return (
        <Routes>

            {/* AUTH ROUTES (without layout) */}
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* APP ROUTES (with layout) */}
            <Route element={<MainLayout />}>
                <Route path="/home" element={<Home />} />
            </Route>

        </Routes>
    );
}