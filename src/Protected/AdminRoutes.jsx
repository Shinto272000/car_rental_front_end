
import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { axiosInstance } from '../Config/AxiosConfig';

const AdminRoute = ({children}) => {
    const navigate = useNavigate()
    const authToken = localStorage.getItem('authToken')
    useEffect(() => {
        // const checkAdminn = async () => {
        //     try {
        //         const res = await axiosInstance.get(
        //             "/api/v1/dealer/check-admin",
        //             {
        //                 withCredentials: true,
        //             },
        //         );

        //         const data = res.data;
        //         console.log(data);

        //         if (data.success === false) {
        //             navigate("/dealer/signup", { replace: true });
        //         }
        //     } catch (error) {
        //         console.error("Error occurred while checking dealer:", error);
        //         navigate("/dealer/signup", { replace: true });
        //     }
        // };
        // checkAdminn();
        if(!authToken){
            navigate("/")
        }
    }, [navigate]);

    return children;
};

export default AdminRoute