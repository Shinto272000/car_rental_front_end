import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../Config/AxiosConfig";

const UserRoutes = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = async () => {
      try {
        const res = await axiosInstance.get(
          "/api/v1/users/check-user",
          {
            withCredentials: true,
          },
        );

        const data = res.data;
        console.log("respose after login is ",data);
        
        // if (data === "user not found") {      
        //   navigate("/user/signup", { replace: true });
        // }
      } catch (error) {
        console.error("Error occurred while checking user:", error);
        navigate("/user/signin", { replace: true });
      }
    };
    checkUser();
  }, []);

  return children;
};

export default UserRoutes;