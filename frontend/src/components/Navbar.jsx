import { Link } from "react-router-dom"
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from "../hooks/useAuthContext";

const Navbar = () => {
    const { logout } = useLogout();
    const { user } = useAuthContext();

    const handleClick = () => {
        logout();
    };

    return (
        <header className="sticky top-0">
            <div className="container">
                <Link to="/">
                    <h1 className="font-semibold text-shadow-md text-3xl text-black tracking-wider" id="logo">
                        Do
                        <span className="text-gray-800">
                            Tasker
                        </span>
                    </h1>
                </Link>

                <nav>
                    {user && (
                        <div className="flex gap-5 items-center">
                            <Link to="/profile" className="text-gray-600">My profile</Link>
                            <span className="text-gray-600">{user.email}</span>
                            <button onClick={handleClick}>
                                Logout
                            </button>
                        </div>
                    )}
                    {!user && (
                        <div>
                            <Link to="/login">
                                Login
                            </Link>
                            <Link to="/signup">
                                Sign Up
                            </Link>
                        </div>
                    )}
                </nav>
            </div>
        </header>
    )
}

export default Navbar
