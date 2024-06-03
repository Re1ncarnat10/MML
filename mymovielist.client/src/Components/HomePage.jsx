import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import MovieList from './MovieList';
import 'bootstrap/dist/css/bootstrap.min.css';
import SearchBox from './SearchBox.jsx';
import AddFavourites from './AddFavourites.jsx';





const Home = () => {
    const [movies, setMovies] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [favourites, setFavourites] = useState('');


    //const isLoggedIn = false; // This should be set based on your authentication logic

    const getMovieRequest = async (searchValue) => {
        const url = `https://www.omdbapi.com/?s=${searchValue}&apikey=6483c78a`;

        try {
            const response = await fetch(url);
            const responseJson = await response.json();


            if (responseJson.Search) {
                setMovies(responseJson.Search);
            }
        } catch (error) {
            console.error('Error fetching data: ', error);
        }
    };

    useEffect(() => {
        getMovieRequest(searchValue);
    }, [searchValue]); 
    const addFavouriteMovie = (movie) => {
        const newFavouriteList = [...favourites, movie]
    };

    return (
        /*
        <div className="containerHP">
            <div className="home">
                <h1>Welcome to MyMovieList!</h1>
                <p>Please select an option:</p>
                <div className="buttons">
                    {/* Wyœwietlanie linków tylko jeœli u¿ytkownik nie jest zalogowany }
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

                    {/* Wyœwietlanie dodatkowych opcji tylko jeœli u¿ytkownik jest zalogowany }
                    {isLoggedIn && (
                        <>
                            <Link to="/movielist" className="btn btn-primary">
                                My Films
                            </Link>
                            <button className="btn btn-secondary" onClick={() => {
                                localStorage.removeItem('token');
                                window.location.reload(); // Odœwie¿enie strony po wylogowaniu
                            }}>
                                Logout
                            </button>
                        </>
                    )}
                </div>

            </div>*/
        <div className='container-fluid movie-app'>

            <div className='row align-items-center justify-content-center'>
                <SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
            </div>

                <div className='row'>
                <MovieList movies={movies} handleFavoritesClick={AddFavourites} favouriteComponent={AddFavourites} />
                </div>
            </div>


    );
};

export default Home;
