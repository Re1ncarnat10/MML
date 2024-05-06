import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="container">
            <div className="home">
                <h1>Welcome to MyMovieList!</h1>
                <p>Please select an option:</p>
                <div className="buttons">
                    <Link to="/login" className="btn btn-primary">
                        Login
                    </Link>
                    <Link to="/register" className="btn btn-secondary">
                        Register
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Home;
