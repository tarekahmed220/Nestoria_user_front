import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";

import Navbar2 from "../components/Navbar2";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";

function Layout() {
  const [isValid, setIsValid] = useState(false);
  const location = useLocation();
  const whiteList = ["/register", "/login"];

  useEffect(() => {
    const pathIsInWhiteList = whiteList.some((path) =>
      location.pathname.includes(path)
    );
    setIsValid(!pathIsInWhiteList);
  }, [location.pathname, whiteList]);

  return (
    <>
      <Navbar />
      {isValid && <Navbar2 />}
      <Outlet />
      <Footer />
    </>
  );
}

export default Layout;
