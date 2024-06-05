import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import  {getUserRoles}  from './api';


export const Header = () => {

    const isLoggedIn = localStorage.getItem('token') !== null;
    const navigate = useNavigate();
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const checkUserRole = async () => {
            const roles = await getUserRoles();
            setIsAdmin(roles.includes('admin'));
        };

        checkUserRole();
    }, []);
    
    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        alert('Logged out Successfully')
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
                        

                        {isLoggedIn && (
                            <>
                            {isAdmin && (
                               
                                <li>
                                    <Link className="btn btn-main" to="/admin">
                                      Admin Panel
                                    </Link>
                                </li>
                            )}
                                <li>
                                    <Link className="btn btn-main" to="/profile">
                                      Your Profile
                                    </Link>
                                </li>
  
                                <li>
                                    <button onClick={handleLogout} className="admin-btn-del btn btn-main">
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

export default Header;
