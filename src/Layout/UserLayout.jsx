import { Outlet } from "react-router-dom";
import UserNavbar from "../components/Navbar/UserNavbar";
import Footer from "../components/Footer";
import { useColorMode } from "@chakra-ui/react";

const UserLayout = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <div className={colorMode === "dark" ? "dark" : ""}>
      <div className="bg-white dark:bg-gray-900 min-h-screen">
        <nav>
          <UserNavbar isDarkMode={colorMode === 'dark'} toggleDarkMode={toggleColorMode} />
        </nav>
        <Outlet key={colorMode} />
        <Footer />
      </div>
    </div>
);
};

export default UserLayout;
