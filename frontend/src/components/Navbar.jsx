import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {

    const user = useSelector((state) => state.auth.user);

    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate('/login');
        }
    }, [user, navigate]);


    return (
        <nav className="bg-white flex justify-between items-center py-3 px-[5%] sticky top-0 z-[100000]">
            <div className="logo py-2 px-6 rounded-lg">
                <h1 className="text-white">Task Manager</h1>
            </div>
            <ul className="flex items-center gap-8">
                <li>
                    <Link to="/">Home</Link>
                </li>
                {user ? (
                    <>
                        <li>
                            <a href="#">Hi, {user.user.username}</a>
                        </li>
                        <li>
                            <Link to="/tasks">Tasks</Link>
                        </li>
                        <li>
                            <a href="/logout" className="bg-red-500 text-white p-2 hover:bg-red-600 rounded-lg">Logout</a>
                        </li>
                    </>
                ) : (
                    <>
                        <li>
                            <a href="/login">Login</a>
                        </li>
                        <li>
                            <a href="/register">Register</a>
                        </li>
                    </>
                )}
            </ul >
        </nav >
    )
}

export default Navbar;