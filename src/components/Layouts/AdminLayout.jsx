import { NavLink, useNavigate } from "react-router-dom";
import { LayoutDashboard, FileText, BarChart2, Settings, LogOut, Volume2 } from "lucide-react";
import { useAuth } from "../../context/authContext";

const AdminLayout = ({ children }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const topLinkClass = ({ isActive }) =>
    isActive
      ? "bg-[var(--primary)] text-[var(--on-primary)] px-3 py-1 text-xs font-bold tracking-widest uppercase"
      : "text-[var(--primary)] px-3 py-1 text-xs font-bold tracking-widest uppercase hover:bg-[var(--primary)] hover:text-[var(--on-primary)] transition-colors";

  const sideLinkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 text-xs font-bold uppercase tracking-widest transition-colors border-b border-[var(--outline-variant)] ${
      isActive
        ? "bg-[var(--primary)] text-[var(--on-primary)]"
        : "text-[var(--primary)] hover:bg-[var(--surface-container)]"
    }`;

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex flex-col bg-[var(--on-primary)]">
      {/* Top navbar */}
      <div className="flex justify-between items-center px-6 py-3 bg-[var(--on-primary)] border-b border-[var(--primary)] shrink-0">
        <h5 className="text-sm font-black uppercase tracking-widest">LOG_CORE</h5>
        <nav className="flex items-center">
          <NavLink to="/" end className={topLinkClass}>INDEX</NavLink>
          <NavLink to="/archive" className={topLinkClass}>ARCHIVE</NavLink>
          <NavLink to="/manifesto" className={topLinkClass}>MANIFESTO</NavLink>
          <NavLink to="/admin/posts" className={topLinkClass}>ADMIN</NavLink>
        </nav>
        <div className="flex items-center gap-3">
          <input
            type="text"
            placeholder="SEARCH_SYSTEM..."
            className="text-xs uppercase tracking-widest px-3 py-1 w-40 placeholder:text-[var(--on-surface-variant)] border border-[var(--primary)]"
          />
          <button className="border-0 bg-transparent p-1">
            <Volume2 size={18} />
          </button>
        </div>
      </div>

      {/* Body: sidebar + content */}
      <div className="flex flex-1 min-h-0">
        {/* Sidebar */}
        <aside className="w-52 border-r border-[var(--primary)] flex flex-col shrink-0">
          <div className="px-4 pt-5 pb-3 border-b border-[var(--primary)]">
            <h4 className="text-sm font-black uppercase tracking-widest mb-2">ADMIN_PANEL</h4>
            <hr className="border-[var(--primary)]" />
            <p className="text-xs text-[var(--on-surface-variant)] mt-2">V1.0.4</p>
          </div>

          <nav className="flex-1 pt-2">
            <NavLink to="/admin/posts" end className={sideLinkClass}>
              <LayoutDashboard size={13} />
              DASHBOARD
            </NavLink>
            <NavLink to="/admin/posts" className={sideLinkClass}>
              <FileText size={13} />
              POSTS
            </NavLink>
            <NavLink to="/admin/analytics" className={sideLinkClass}>
              <BarChart2 size={13} />
              ANALYTICS
            </NavLink>
            <NavLink to="/admin/settings" className={sideLinkClass}>
              <Settings size={13} />
              SETTINGS
            </NavLink>
          </nav>

          <div className="p-4 border-t border-[var(--primary)] space-y-3">
            <button
              onClick={() => navigate("/admin/editor/new")}
              className="w-full text-xs font-bold uppercase tracking-widest py-2 px-3 bg-transparent text-[var(--primary)] border border-[var(--primary)] hover:bg-[var(--primary)] hover:text-[var(--on-primary)]"
            >
              NEW_ENTRY
            </button>
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-2 text-xs font-bold uppercase tracking-widest py-2 px-3 bg-transparent border-0 hover:text-[var(--on-surface-variant)]"
            >
              <LogOut size={12} />
              LOGOUT
            </button>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;
