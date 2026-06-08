import { Outlet } from "react-router-dom";
import NavBar from "../Navbar";
import Footer from "../Footer";

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--on-primary)]">
      <NavBar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
