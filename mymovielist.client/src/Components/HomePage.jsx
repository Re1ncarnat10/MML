import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    // Sprawdzenie, czy token u¿ytkownika istnieje w localStorage
    const isLoggedIn = localStorage.getItem('token') !== null;

    return (
        <div className="container">
            <div className="home">
                <h1>Welcome to MyMovieList!</h1>
                <p>Please select an option:</p>
                <div className="buttons">
                    {/* Wyœwietlanie linków tylko jeœli u¿ytkownik nie jest zalogowany */}
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
                </div>
            </div>
        </div>
    );
};

export default Home;

