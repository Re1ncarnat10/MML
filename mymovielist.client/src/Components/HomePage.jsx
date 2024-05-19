import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    const isLoggedIn = localStorage.getItem('token') !== null;

    return (
        <div className="container">
            <div className="home">
                <h1>Welcome to MyMovieList!</h1>
                <p>Please select an option:</p>
                <div className="buttons">
                    {/* Wy�wietlanie link�w tylko je�li u�ytkownik nie jest zalogowany */}
                    {!isLoggedIn && (
                        <>
                            <Link to="/login" className="btn btn-primary">
                                Login
                            </Link>
                            <Link to="/register" className="btn btn-secondary">
                                Register
                            </Link>
                        </>
                    )}

                    {/* Wy�wietlanie dodatkowych opcji tylko je�li u�ytkownik jest zalogowany */}
                    {isLoggedIn && (
                        <>
                            <Link to="/profile" className="btn btn-primary">
                                Profile
                            </Link>
                            <button className="btn btn-secondary" onClick={() => {
                                localStorage.removeItem('token');
                                window.location.reload(); // Od�wie�enie strony po wylogowaniu
                            }}>
                                Logout
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Home;
