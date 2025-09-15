import Logo from "../assets/svgs/logo.svg";
import { NavLink } from "react-router-dom";

const NavBar = () => {
    const linkClass = ({ isActive }) =>
    isActive
      ? "text-black underline"
      : "text-gray-300 hover:underline";
    return (
        <div className="flex justify-between items-center p-2">
            <div className="flex gap-2 items-center">
                <img src={Logo} alt="logo" />
                <h1>Fragiment</h1>
            </div>

            <nav className="flex gap-6 font-medium">
                <NavLink
                to="/"
                className={linkClass}
                >
                Home
                </NavLink>

                <NavLink
                to="/myposts"
                className={linkClass}
                >
                My Posts
                </NavLink>

                <NavLink
                to="/post"
                className={linkClass}
                >
                Post
                </NavLink>
            </nav>
        </div>
    );
};

export default NavBar;
