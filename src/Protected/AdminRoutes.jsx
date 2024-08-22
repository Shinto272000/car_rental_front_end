
import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminRoute = ({children}) => {
    const navigate = useNavigate()
    useEffect(() => {
        const checkAdminn = async () => {
            try {
                const res = await axios.get(
                    "http://localhost:3000/api/v1/dealer/check-admin",
                    {
                        withCredentials: true,
                    },
                );

                const data = res.data;
                console.log(data);

                if (data.success === false) {
                    navigate("/dealer/signup", { replace: true });
                }
            } catch (error) {
                console.error("Error occurred while checking dealer:", error);
                navigate("/dealer/signup", { replace: true });
            }
        };
        checkAdminn();
    }, [navigate]);

    return children;
};

export default AdminRoute