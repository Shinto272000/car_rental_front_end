import { Outlet } from "react-router-dom";
import AdminNavbar from "../components/Navbar/AdminNavbar";
import Footer from "../components/Footer";
// import UserNavbar from "../components/Navbar/UserNavbar";

const AdminLayout = () => {
  return (
    <>
      <nav>
        <AdminNavbar/>
      </nav>
      <Outlet />
      <Footer />
    </>
  );
};

export default AdminLayout;