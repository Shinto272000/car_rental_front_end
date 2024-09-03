
import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { axiosInstance } from '../Config/AxiosConfig';

const DealerRoutess = ({children}) => {
    const navigate = useNavigate()
    useEffect(() => {
        // const authToken = localStorage.getItem('authToken')
        // console.log("authtoken is ",authToken);
        
        const checkUser = async () => {
            try {
                const res = await axiosInstance.get(
                    "/api/v1/dealer/check-dealer",
                    {
                        withCredentials: true,
                    },
                );

                const data = res.data;
                console.log(data);
                // if(authToken){
                //     navigate("/dealer/dashbord")
                // }

                // if (data.success === false) {
                //     navigate("/dealer/signup", { replace: true });
                // }
            } catch (error) {
                console.error("Error occurred while checking dealer:", error);
                navigate("/dealer/signin", { replace: true });
            }
        };
        checkUser();
        // if(!authToken){
        //     navigate("/") 
        // }
    }, []);

    return children;
};

export default DealerRoutess