import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { register } from '../slices/authSlice';
import { ToastContainer, toast } from 'react-toastify';

const Register = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user, loading, error } = useSelector((state) => state.auth);

    const [inputValue, setInputValue] = useState({
        email: '',
        password: '',
        username: '',
    });
    const { email, password, username } = inputValue;

    useEffect(() => {
        if (user) {
            toast.success('Registration successful', {
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
        dispatch(register({ username, email, password }));
    };

    return (
        <div className="form_container">
            <h2>Signup Account</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        name="username"
                        value={username}
                        placeholder="Enter your username"
                        onChange={handleOnChange}
                    />
                </div>
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
                    Already have an account? <Link to="/login">Login</Link>
                </span>
            </form>
            <ToastContainer />
        </div>
    );
};

export default Register;
