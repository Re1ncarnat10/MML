import React, { useState } from 'react';
import { updateMyList, removeFromMyList } from './api';

const FavoriteCard = ({ movie }) => {
    const [rating, setRating] = useState(movie.rating || 0);
    const [isFavorite, setIsFavorite] = useState(movie.isFavorite);
    const [status, setStatus] = useState(movie.statusId);
    

    const handleRatingChange = async (newRating) => {
        try {
            await updateMyList(movie.movieId, { rating: newRating });
            setRating(newRating);
        } catch (error) {
            console.error('Rating change error:', error);
        }
    };

    const handleFavoriteChange = async () => {
        try {
            await updateMyList(movie.movieId, { isFavorite: !isFavorite });
            setIsFavorite(!isFavorite);
        } catch (error) {
            console.error('Favorite change error:', error);
        }
    };

    const handleStatusChange = async (newStatus) => {
        try {
            await updateMyList(movie.movieId, { statusId: newStatus });
            setStatus(newStatus);
        } catch (error) {
            console.error('Status change error:', error);
        }
    };

    const handleRemoveFromMyList = async () => {
        try {
            await removeFromMyList(movie.movieId);
            alert(`Movie ${movie.title} removed from my list`);
        } catch (error) {
            console.error('Remove from my list error:', error);
            alert(`Error removing movie from my list: ${error.message}`);
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
                <div>
                    <label>
                        Rating:
                        <select value={rating} onChange={(e) => handleRatingChange(e.target.value)}>
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                            <option value={4}>4</option>
                            <option value={5}>5</option>
                        </select>
                    </label>
                </div>
                <div>
                    <label>
                        Favorite:
                        <input className="checkmark" type="checkbox" checked={isFavorite} onChange={handleFavoriteChange} />
                    </label>
                </div>
                <div>
                    <label>
                        Status:
                        <select value={status} onChange={(e) => handleStatusChange(e.target.value)}>
                            <option value={1}>To Watch</option>
                            <option value={2}>Watched</option>
                        </select>
                    </label>
                </div>
                <button className="btn-del btn btn-main" onClick={handleRemoveFromMyList}>Remove from My List</button>
            </div>
        </div>
    );
};

export default FavoriteCard;
