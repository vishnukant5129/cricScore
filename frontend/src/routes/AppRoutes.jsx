import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home.jsx";
import Login from "../pages/Login.jsx";
import Signup from "../pages/Signup.jsx";

export default function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                {/* <Route element={<MainLayout />}> */}
                    {/* <Route path="/" element={<Home />} /> */}
                    <Route path="/" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                {/* </Route> */}
            </Routes>
        </BrowserRouter>
    );
}