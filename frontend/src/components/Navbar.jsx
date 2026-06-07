import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "./Logo.jsx";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="sticky top-0 z-50 bg-[#0f172a]/90 backdrop-blur-md text-white shadow-lg border-b border-gray-800">
            <div className="flex items-center justify-between px-6 py-4">

                {/* LEFT */}
                <div className="flex items-center gap-8">
                    <Logo />

                    {/* Desktop Links */}
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

                {/* Desktop Right */}
                <div className="hidden md:flex items-center gap-6 text-sm">
                    <Link to="/performance" className="hover:text-cyan-400 transition">
                        My Performance
                    </Link>

                    <Link
                        to="/profile"
                        className="flex items-center gap-2 hover:text-cyan-400 transition"
                    >
                        <div className="w-8 h-8 rounded-full bg-cyan-500 flex items-center justify-center text-black font-bold">
                            U
                        </div>
                        Profile
                    </Link>
                </div>

                {/* Mobile Hamburger */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="md:hidden text-2xl"
                >
                    {isOpen ? "✕" : "☰"}
                </button>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden flex flex-col gap-4 px-6 pb-4 border-t border-gray-800 bg-[#0f172a]">
                    <Link
                        to="/matches"
                        onClick={() => setIsOpen(false)}
                        className="pt-4 hover:text-cyan-400"
                    >
                        My Matches
                    </Link>

                    <Link
                        to="/tournament"
                        onClick={() => setIsOpen(false)}
                        className="hover:text-cyan-400"
                    >
                        Add Tournament
                    </Link>

                    <Link
                        to="/start-match"
                        onClick={() => setIsOpen(false)}
                        className="hover:text-cyan-400"
                    >
                        Start Match
                    </Link>

                    <Link
                        to="/performance"
                        onClick={() => setIsOpen(false)}
                        className="hover:text-cyan-400"
                    >
                        My Performance
                    </Link>

                    <Link
                        to="/profile"
                        onClick={() => setIsOpen(false)}
                        className="flex items-center gap-2 hover:text-cyan-400"
                    >
                        <div className="w-8 h-8 rounded-full bg-cyan-500 flex items-center justify-center text-black font-bold">
                            U
                        </div>
                        Profile
                    </Link>
                </div>
            )}
        </nav>
    );
};

export default Navbar;