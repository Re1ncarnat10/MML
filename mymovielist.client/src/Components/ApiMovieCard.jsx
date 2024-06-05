import React from 'react';
import { addMovieToMyList } from './api';


const ApiMovieCard = ({ movie }) => {
     
    return (
        <div className="card">
            <figure>
                <img src={movie.Poster} alt='movie' />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{movie.Title}</h2>
                <p className="card-text">Release Year: {movie.Year}</p>
            </div>
        </div>
    );
};

export default ApiMovieCard;