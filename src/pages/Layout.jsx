import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Navbar2 from "../components/Navbar2";

function Layout() {
  return (
    <>
      <Navbar />
      <Navbar2></Navbar2>
      <Outlet />
      <h2>footer</h2>
    </>
  );
}

export default Layout;
