import { Outlet } from "react-router-dom";
import NavBar from "../Navbar";
import Footer from "../Footer";


const Layout = () => {
    return(
        <div className="relative">
            <NavBar />

            <Outlet />

            <div className="fixed bg-white bottom-0 left-0 w-full">
                <Footer/>
            </div>
            
        </div>
    )
}

export default Layout;