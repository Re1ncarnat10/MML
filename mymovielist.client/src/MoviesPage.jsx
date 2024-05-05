// eslint-disable-next-line no-unused-vars
import React from 'react';
import Header from './Components/Header';
import Footer from './Components/Footer';

const MoviesPage = () => {
    return (
        <div>
            <Header />
            <iframe src="./Public/movies.html" title="Movies Page" width="100%" height="100%" />
            <Footer />
        </div>
    );
};

export default MoviesPage;
