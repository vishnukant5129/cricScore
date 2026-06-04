import React from "react";
import { Link } from "react-router-dom";

import Logo from "./Logo.jsx";

const Navbar = () => {
    return (
        <nav className="sticky top-0 z-50 flex items-center justify-between px-6 py-4 
        bg-[#0f172a]/90 backdrop-blur-md text-white shadow-lg border-b border-gray-800">

            {/* LEFT SIDE */}
            <div className="flex items-center gap-8">

                {/* Logo */}
                <Logo />

                {/* Navigation Links */}
                <div className="hidden md:flex items-center gap-6 text-sm">

                    <Link to="/matches" className="hover:text-cyan-400 transition">
                        My Matches
                    </Link>

                    <Link to="/tournament" className="hover:text-cyan-400 transition">
                        Add Tournament
                    </Link>

                    <Link to="/start-match" className="hover:text-cyan-400 transition">
                        Start Match
                    </Link>

                </div>
            </div>

            {/* RIGHT SIDE */}
            <div className="flex items-center gap-6 text-sm">

                <Link to="/performance" className="hover:text-cyan-400 transition">
                    My Performance
                </Link>

                <Link to="/profile" className="flex items-center gap-2 hover:text-cyan-400 transition">
                    <div className="w-8 h-8 rounded-full bg-cyan-500 flex items-center justify-center text-black font-bold">
                        U
                    </div>
                    Profile
                </Link>

            </div>

        </nav>
    );
};

export default Navbar;