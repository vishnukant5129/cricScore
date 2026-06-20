import { Bell, Search } from "lucide-react";

const MobileNavbar = () => {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-900/95 backdrop-blur-md shadow-sm shadow-slate-950/20">
      <div className="h-16 px-4 flex items-center justify-between">
        <div className="text-lg font-semibold text-white tracking-tight">CricScore</div>

        <div className="flex items-center gap-4 text-slate-300">
          <button className="rounded-2xl border border-slate-800 bg-slate-800/70 p-2 transition-colors duration-200 hover:border-cyan-500 hover:text-cyan-400">
            <Search size={20} />
          </button>
          <button className="relative rounded-2xl border border-slate-800 bg-slate-800/70 p-2 transition-colors duration-200 hover:border-cyan-500 hover:text-cyan-400">
            <Bell size={20} />
            <span className="absolute -top-1 -right-1 h-2.5 w-2.5 rounded-full bg-red-500" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default MobileNavbar;