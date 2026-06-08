import { NavLink } from "react-router-dom";
import { Volume2 } from "lucide-react";

const NavBar = () => {
  const linkClass = ({ isActive }) =>
    isActive
      ? "bg-[var(--primary)] text-[var(--on-primary)] px-3 py-1 text-xs font-bold tracking-widest uppercase"
      : "text-[var(--primary)] px-3 py-1 text-xs font-bold tracking-widest uppercase hover:bg-[var(--primary)] hover:text-[var(--on-primary)] transition-colors";

  return (
    <div className="flex justify-between items-center px-6 py-3 bg-[var(--on-primary)] border-b border-[var(--primary)]">
      <h5 className="text-sm font-bold tracking-widest uppercase">LOG_CORE</h5>

      <nav className="flex items-center">
        <NavLink to="/" end className={linkClass}>INDEX</NavLink>
        <NavLink to="/archive" className={linkClass}>ARCHIVE</NavLink>
        <NavLink to="/manifesto" className={linkClass}>MANIFESTO</NavLink>
        <NavLink to="/admin" className={linkClass}>ADMIN</NavLink>
      </nav>

      <button className="border-0 bg-transparent hover:bg-transparent p-1">
        <Volume2 size={18} />
      </button>
    </div>
  );
};

export default NavBar;
