import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <>
      <h2 className="text-5xl font-bold text-green-600">nav</h2>
      <Outlet />
      <h2>footer</h2>
    </>
  );
}

export default Layout;
