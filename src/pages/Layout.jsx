import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Navbar2 from "../components/Navbar2";
import Footer from "../components/Footer";

function Layout() {
  return (
    <>
      <Navbar />
      <Navbar2></Navbar2>
      <Outlet />
      <Footer></Footer>
    </>
  );
}

export default Layout;
