// src/components/Home.js
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../slices/authSlice';
import { ToastContainer, toast } from 'react-toastify';

const Home = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { status } = useSelector((state) => state.auth);
    const user = useSelector((state) => state.auth.user.user);

    useEffect(() => {
        if (!user) {
            navigate('/login');
        }

        console.log(user);
    }, [user, navigate]);

    useEffect(() => {
        if (status === 'succeeded') {
            toast(`Hello ${user.username}`, {
                position: 'top-right',
            });
        } else if (status === 'failed') {
            navigate('/login');
        }
    }, [status, user, navigate]);

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login');
    };

    return (
        <>
            <div className="home_page">
                <h4>
                    Hi, {user.username}
                </h4>
                <button onClick={handleLogout}>LOGOUT</button>
            </div>
            <ToastContainer />
        </>
    );
};

export default Home;