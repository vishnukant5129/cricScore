import { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "./Logo.jsx";
import Tooltip from "./common/Tooltip.jsx";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 text-white shadow-sm shadow-slate-950/20">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-8">
          <Logo />

          <div className="hidden md:flex items-center gap-6 text-sm text-slate-300">
            <Link to="/matches" className="hover:text-cyan-400 transition-colors duration-200">
              My Matches
            </Link>
            <Link to="/tournament" className="hover:text-cyan-400 transition-colors duration-200">
              Add Tournament
            </Link>
            <Link to="/start-match" className="hover:text-cyan-400 transition-colors duration-200">
              Start Match
            </Link>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-6 text-sm text-slate-300">
          <Link to="/performance" className="hover:text-cyan-400 transition-colors duration-200">
            My Performance
          </Link>
          <Link to="/profile" className="flex items-center gap-2 hover:text-cyan-400 transition-colors duration-200">
            <div className="w-9 h-9 rounded-full bg-cyan-500 flex items-center justify-center text-slate-950 font-semibold">
              U
            </div>
            Profile
          </Link>
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-2xl text-slate-200"
          aria-label={isOpen ? "Close navigation" : "Open navigation"}
        >
          <Tooltip text={isOpen ? "Close Menu" : "Open Menu"} position="left">
            {isOpen ? "✕" : "☰"}
          </Tooltip>
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden flex flex-col gap-4 px-6 pb-4 border-t border-slate-800 bg-slate-900">
          <Link to="/matches" onClick={() => setIsOpen(false)} className="pt-4 text-slate-200 hover:text-cyan-400 transition-colors duration-200">
            My Matches
          </Link>
          <Link to="/tournament" onClick={() => setIsOpen(false)} className="text-slate-200 hover:text-cyan-400 transition-colors duration-200">
            Add Tournament
          </Link>
          <Link to="/start-match" onClick={() => setIsOpen(false)} className="text-slate-200 hover:text-cyan-400 transition-colors duration-200">
            Start Match
          </Link>
          <Link to="/performance" onClick={() => setIsOpen(false)} className="text-slate-200 hover:text-cyan-400 transition-colors duration-200">
            My Performance
          </Link>
          <Link to="/profile" onClick={() => setIsOpen(false)} className="flex items-center gap-2 text-slate-200 hover:text-cyan-400 transition-colors duration-200">
            <div className="w-8 h-8 rounded-full bg-cyan-500 flex items-center justify-center text-slate-950 font-semibold">
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
