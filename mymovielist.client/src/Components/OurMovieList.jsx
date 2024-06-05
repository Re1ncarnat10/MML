import React, { useEffect, useState } from 'react';
import { getMoviesFromDatabase } from './api';
import MovieCard from './MovieCard';

const OurMovieList = () => {

	const [moviesMy, setMovies] = useState([]); 
	useEffect(() => {
        const fetchMovies = async () => {
            const moviesData = await getMoviesFromDatabase();
            setMovies(moviesData);
        };

        fetchMovies();
    }, []);


	return (

            <div className="movie-grid">
				{moviesMy.map(movie => <MovieCard key={movie.movieId} movie={movie} />)}
			</div>
	
	);
};

export default OurMovieList;