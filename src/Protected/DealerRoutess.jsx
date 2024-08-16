
import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const DealerRoutess = ({children}) => {
    const navigate = useNavigate()
    useEffect(() => {
        const checkUser = async () => {
            try {
                const res = await axios.get(
                    "http://localhost:3000/api/v1/dealer/check-dealer",
                    {
                        withCredentials: true,
                    },
                );

                const data = res.data;
                console.log(data);

                if (data.success === false) {
                    navigate("/user/signup", { replace: true });
                }
            } catch (error) {
                console.error("Error occurred while checking user:", error);
                navigate("/user/signup", { replace: true });
            }
        };
        checkUser();
    }, [navigate]);

    return children;
};

export default DealerRoutess