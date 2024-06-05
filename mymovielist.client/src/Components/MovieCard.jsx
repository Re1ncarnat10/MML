import React from 'react';
import { addMovieToMyList } from './api';


const MovieCard = ({ movie }) => {
    const handleAddToMyList = async () => {
        try {
            await addMovieToMyList(movie.movieId, 0); // Assuming statusId is 0
            alert(`Movie ${movie.title} added to my list`);
        } catch (error) {
            console.error('Add to my list error:', error);
            alert(`Error adding movie to my list: ${error.message}`);
        }
    };

    return (
        <div className="card">
            <figure>
                <img className="card-image" src={movie.image} alt={movie.title} />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{movie.title}</h2>
                <p className="card-text">{movie.description}</p>
                <p className="card-text">Release Year: {movie.releaseYear}</p>
                <button className="btn-add btn btn-main" onClick={handleAddToMyList}>Add to My List</button>
            </div>
        </div>
    );
};

export default MovieCard;