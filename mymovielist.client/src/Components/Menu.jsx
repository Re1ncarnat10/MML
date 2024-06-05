import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';



const Menu = () => {
    const isLoggedIn = !!localStorage.getItem('token');

    if (!isLoggedIn) {
        window.location.href = "/movielist";
    }

    return (
        <div className="containerHP">
            <div className="home">
                <div className="buttons flex-container">
                    {isLoggedIn && (
                        <>
                        <div className="row mt-5">
                        <div className="col">
                                    <Link to="/movielist" className="big-btn btn btn-main">
                                        <div className="btn-menu btn btn-main">
                                            All Films
                                        </div>
                                    </Link>
                                </div>

                       <div className="col">
                                    <Link to="/ourfilms" className="big-btn btn btn-main">
                                        <div className="btn-menu btn btn-main">
                                            Our Films
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Menu;