import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";

function Layout() {
  return (
    <div className="min-h-screen bg-[#efefef]">
      <Navbar />
      <div className="max-w-7xl w-full px-1 sm:px-4 mx-auto">
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
