import { Outlet } from "react-router-dom";
import AdminNavbar from "../components/Navbar/AdminNavbar";
// import UserNavbar from "../components/Navbar/UserNavbar";

const AdminLayout = () => {
  return (
    <>
      <nav>
        <AdminNavbar/>
      </nav>
      <Outlet />
    </>
  );
};

export default AdminLayout;