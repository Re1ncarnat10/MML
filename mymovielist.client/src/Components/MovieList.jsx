import React, { useEffect, useState } from 'react';
import ApiMovieCard from './ApiMovieCard';

const MovieList = (props) => {
	const FavouriteComponent = props.favouriteComponent;


	return (
		<div className="movie-list">
            {props.movies.map((movie, index) => (
                <ApiMovieCard key={index} movie={movie} />
            ))}
        </div>
	);
};

export default MovieList;