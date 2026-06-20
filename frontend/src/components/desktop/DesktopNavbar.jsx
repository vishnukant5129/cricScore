import { Link } from "react-router-dom";

const DesktopNavbar = () => {
    return (
        <nav className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 text-white shadow-sm shadow-slate-950/20">
            <div className="max-w-7xl mx-auto h-16 px-6 flex items-center justify-between">
                <div className="flex items-center gap-10">
                    <Link to="/home" className="text-lg font-semibold tracking-tight text-white">
                        <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-cyan-500 text-slate-950">
                            C
                        </span>
                    </Link>
                    <div className="hidden md:flex items-center gap-8 text-sm text-slate-300">
                        <Link to="/matches" className="hover:text-cyan-400 transition-colors duration-200">
                            My Matches
                        </Link>
                        <Link to="/tournament" className="hover:text-cyan-400 transition-colors duration-200">
                            Tournament
                        </Link>
                        <Link to="/start-match" className="hover:text-cyan-400 transition-colors duration-200">
                            Start Match
                        </Link>
                    </div>
                </div>

                <div className="flex items-center gap-8 text-sm text-slate-300">
                    <Link to="/performance" className="hover:text-cyan-400 transition-colors duration-200">
                        Performance
                    </Link>
                    <Link to="/profile" className="flex items-center gap-3 hover:text-cyan-400 transition-colors duration-200">
                        <div className="w-9 h-9 rounded-full bg-cyan-500 flex items-center justify-center text-slate-950 font-semibold">
                            U
                        </div>
                        Profile
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default DesktopNavbar;