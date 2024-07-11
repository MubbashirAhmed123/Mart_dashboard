import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const useAuth = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const isAuth = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                navigate('/');
                return;
            }
            try {
                const res = await fetch('http://localhost:3001/login', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });


                if (!res.ok) {
                    const errorData = await res.json();
                    localStorage.removeItem('token');
                    toast.error(errorData.msg);
                    navigate('/');
                }

            } catch (error) {
                toast.error(error.message);
                localStorage.removeItem('token');
                navigate('/');
            }
        }
        isAuth();
    }, [navigate]);
};

export default useAuth;
