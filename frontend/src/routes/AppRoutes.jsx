import { Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home.jsx";
import Login from "../pages/Login.jsx";
import Signup from "../pages/Signup.jsx";
import MyMatches from "../pages/MyMatches.jsx";
import AddTournament from "../pages/AddTournament.jsx"
import StartAMatch from "../pages/StartAMatch.jsx"
import MyPerformance from "../pages/MyPerformance.jsx";
import Profile from "../pages/Profile.jsx"

export default function AppRoutes() {
    return (
        <Routes>

            {/* AUTH ROUTES (without layout) */}
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* APP ROUTES (with layout) */}
            <Route element={<MainLayout />}>
                <Route path="/home" element={<Home />} />
                <Route path="/matches" element={<MyMatches />}/>
                <Route path="/tournament" element={<AddTournament />}/>
                <Route path="/start-match" element={<StartAMatch />}/>
                <Route path="/performance" element={<MyPerformance />}/>
                <Route path="/profile" element={<Profile />}/>
            </Route>

        </Routes>
    );
}