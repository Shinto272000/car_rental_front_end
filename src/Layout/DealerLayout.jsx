import { Outlet } from "react-router-dom";
import DealerNavbar from "../components/Navbar/DealerNavbar";
// import AdminNavbar from "../components/Navbar/AdminNavbar";
// import UserNavbar from "../components/Navbar/UserNavbar";

const DealerLayout = () => {
  return (
    <>
      <nav>
        <DealerNavbar/>
      </nav>
      <Outlet />
    </>
  );
};

export default DealerLayout;