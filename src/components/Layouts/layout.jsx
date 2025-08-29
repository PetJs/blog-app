import { Outlet } from "react-router-dom";
import NavBar from "../Navbar";
import Footer from "../Footer";


const Layout = () => {
    return(
        <div>
            <NavBar />

            <Outlet />

            <Footer/>
        </div>
    )
}

export default Layout;