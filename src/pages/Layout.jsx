import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Navbar2 from "../components/Navbar2";
import Footer from "../components/Footer";

function Layout() {
  const location = useLocation();
  const blackList = ["/register", "/login", "/forgotpassword"];

  const hideComponents = blackList.includes(location.pathname);
  console.log(hideComponents);
  return (
    <>
      <Navbar />
      {!hideComponents && <Navbar2 />}
      <Outlet />
      <Footer />
    </>
  );
}

export default Layout;
