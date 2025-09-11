import { Outlet } from "react-router-dom";
import DealerNavbar from "../components/Navbar/DealerNavbar";
import Footer from "../components/Footer";
// import AdminNavbar from "../components/Navbar/AdminNavbar";
// import UserNavbar from "../components/Navbar/UserNavbar";

const DealerLayout = () => {
  return (
    <>
      <nav>
        <DealerNavbar/>
      </nav>
      <Outlet />
      <Footer />
    </>
  );
};

export default DealerLayout;