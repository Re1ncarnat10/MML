import React from "react";
import { Link, useNavigate } from "react-router-dom";

export const Header = () => {
    const isLoggedIn = localStorage.getItem('token') !== null;
    const username = isLoggedIn ? localStorage.getItem('username') : null;
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        navigate('/');
    };

    return (
        <header>
            <div className="container">
                <div className="inner-content">
                    <div className="brand">
                        <Link to="/">WatchList</Link>
                    </div>

                    <ul className="nav-links">
                        

                        <li>
                            <Link to="/movielist">My Films</Link>
                        </li>

                        {isLoggedIn && (
                            <>
                                <li>
                                    <Link to="/profile">
                                      Your Profile
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/add" className="btn btn-main">
                                        + Add
                                    </Link>
                                </li>
                                <li>
                                    <button onClick={handleLogout} className="btn btn-main">
                                        Logout
                                    </button>
                                </li>
                            </>
                        )}

                        {!isLoggedIn && (
                            <>
                                <li>
                                    <Link to="/login">Login</Link>
                                </li>

                                <li>
                                    <Link to="/register">Register</Link>
                                </li>
                            </>
                        )}


                    </ul>
                </div>
            </div>
        </header>
    );
};
