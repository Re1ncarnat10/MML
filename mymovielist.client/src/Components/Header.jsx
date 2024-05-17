import React from "react";
import { Link, useNavigate } from "react-router-dom";

export const Header = () => {
    const isLoggedIn = localStorage.getItem('token') !== null;
    const username = localStorage.getItem('username'); // Pobranie nazwy u¿ytkownika
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
                            <Link to="/">Watch List</Link>
                        </li>

                        <li>
                            <Link to="/watched">Watched</Link>
                        </li>

                        {isLoggedIn ? (
                            <>
                                <li>
                                    <button onClick={handleLogout} className="btn btn-main">
                                        Logout
                                    </button>
                                </li>
                                <li className="username">
                                    {username}
                                </li>
                            </>
                        ) : (
                            <>
                                <li>
                                    <Link to="/login">Login</Link>
                                </li>

                                <li>
                                    <Link to="/register">Register</Link>
                                </li>
                            </>
                        )}

                        <li>
                            <Link to="/add" className="btn btn-main">
                                + Add
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </header>
    );
};


