import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../slices/authSlice';
import { ToastContainer, toast } from 'react-toastify';

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user, loading, error } = useSelector((state) => state.auth);

    const [inputValue, setInputValue] = useState({
        email: '',
        password: '',
    });
    const { email, password } = inputValue;

    useEffect(() => {
        if (user) {
            console.log(user);
            toast.success('Login successful', {
                position: 'bottom-right',
            });
            setTimeout(() => {
                navigate('/');
            }, 1000);
        }

        if (error) {
            toast.error(error, {
                position: 'bottom-left',
            });
        }
    }, [user, error, navigate]);

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setInputValue({
            ...inputValue,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(login({ email, password }));
    };

    return (
        <div className="form_container absolute top-[50%] left-[50%]">
            <form onSubmit={handleSubmit} className=''>
                <h2>Login Account</h2>
                <div>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={email}
                        placeholder="Enter your email"
                        onChange={handleOnChange}
                    />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        name="password"
                        value={password}
                        placeholder="Enter your password"
                        onChange={handleOnChange}
                    />
                </div>
                <button type="submit" disabled={loading}>Submit</button>
                <span>
                    Don{"'"}t have an account? <Link to="/register">Signup</Link>
                </span>
            </form>
            <ToastContainer />
        </div>
    );
};

export default Login;
