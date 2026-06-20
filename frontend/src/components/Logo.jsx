import { Link } from "react-router-dom";

const Logo = () => (
  <Link to="/home" className="inline-flex items-center gap-3 text-lg font-bold tracking-tight text-white">
    <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-cyan-500 text-slate-950">
      C
    </span>
    <span className="text-white">CricScore</span>
  </Link>
);

export default Logo;

