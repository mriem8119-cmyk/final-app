

import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Navbar from "./Navbar";
import Footer from "./Footer";

function Layout() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
      <Toaster position="top-center" />
    </>
  );
}

export default Layout;