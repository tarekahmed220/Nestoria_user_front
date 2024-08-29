import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

function Layout() {
  return (
    <>
      <Navbar />
      <Outlet />
      <h2>footer</h2>
    </>
  );
}

export default Layout;
