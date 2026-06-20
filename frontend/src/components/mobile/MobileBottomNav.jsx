import { NavLink } from "react-router-dom";
import { House, Trophy, PlusCircle, BarChart3, User } from "lucide-react";

const navItems = [
  { path: "/home", icon: House, label: "Home" },
  { path: "/matches", icon: Trophy, label: "Matches" },
  { path: "/start-match", icon: PlusCircle, label: "Start" },
  { path: "/performance", icon: BarChart3, label: "Stats" },
  { path: "/profile", icon: User, label: "Profile" },
];

const MobileBottomNav = () => {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-slate-800 bg-slate-900 px-3 py-3 shadow-sm shadow-slate-950/20">
      <div className="flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex flex-col items-center gap-1 text-xs transition-colors duration-200 ${
                  isActive ? "text-cyan-400" : "text-slate-400"
                }`
              }
            >
              {item.label === "Start" ? (
                <div className="-mt-8 flex h-14 w-14 items-center justify-center rounded-full bg-cyan-500 shadow-xl shadow-cyan-500/20 text-slate-950">
                  <Icon size={28} />
                </div>
              ) : (
                <>
                  <Icon size={22} />
                  <span>{item.label}</span>
                </>
              )}
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};

export default MobileBottomNav;