import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Navbar2 from "../components/Navbar2";
import Footer from "../components/Footer";
import ChatProvider from "../context/ChatProvidor";
function Layout() {
  const location = useLocation();
  const blackList = ["/register", "/login", "/forgotpassword"];

  const hideComponents = blackList.includes(location.pathname);
  return (
    <>
      <Navbar />
      {!hideComponents && <ChatProvider><Navbar2 /></ChatProvider>}
      <Outlet />
      <Footer />
    </>
  );
}

export default Layout;
