import React, { useEffect, useState } from 'react';
import { updateMyList, removeFromMyList } from './api'; 

function MovieList() {
    const [userMovies, setMovies] = useState([]);
    const [error, setError] = useState(null);
    const [ratings, setRatings] = useState({}); 
    const [favorites, setFavorites] = useState({});
    const [statuses, setStatuses] = useState({});


    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await fetch('api/Movies/MyList', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    }
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();

                if (!data.errors) {
                    setMovies(data);
                } else {
                    setMovies([]);
                    setError(data.errors);
                }
            } catch (error) {
                setError(`Failed to fetch movies: ${error.message}`);
            }
        };

        fetchMovies();
    }, []);

    const handleRatingChange = (movieId, newRating) => {
        setRatings(prevRatings => ({ ...prevRatings, [movieId]: newRating }));
    };
    const handleFavoriteChange = (movieId, newFavorite) => {
        setFavorites(prevFavorites => ({ ...prevFavorites, [movieId]: newFavorite }));
    };

    const handleStatusChange = (movieId, newStatus) => {
        setStatuses(prevStatuses => ({ ...prevStatuses, [movieId]: newStatus }));
    };

    const handleUpdate = async (movieId) => {
        const updates = {};
        if (ratings[movieId]) updates.rating = parseInt(ratings[movieId], 10);
        if (favorites[movieId]) updates.isFavorite = favorites[movieId];
        if (statuses[movieId]) updates.statusId = statuses[movieId];

        try {
            await updateMyList(movieId, updates);
            setError(''); // Clear the error message on successful update
        } catch (error) {
            setError('Failed to update movie');
        }
    };

    const handleRemoveFromList = async (movieId) => {
        try {
            await removeFromMyList(movieId);
            setMovies(userMovies.filter(movie => movie.movieId !== movieId));
        } catch (error) {
            setError('Failed to remove movie from list');
        }
    };

    return (
        <div>
            <h1>My Movies</h1>
            {error && <p>Error: {error}</p>}
            {userMovies.length === 0 ? (
                <p>No movies found in your list.</p>
            ) : (
                userMovies.map(userMovie => (
                    <div key={userMovie.movieId}>
                        <h2>{userMovie.title}</h2>
                        <p>{userMovie.Description}</p>
                        <p>Release Year: {userMovie.releaseYear}</p>
                        <p>Status: {userMovie.statusName}</p>
                        <p>Favorite: {userMovie.isFavorite ? 'Yes' : 'No'}</p>
                        <p>Rating: {userMovie.rating}</p>
                        <select value={ratings[userMovie.movieId] || ''} onChange={(e) => handleRatingChange(userMovie.movieId, e.target.value)}>
                            <option value="">Rate this movie...</option>
                            {[1, 2, 3, 4, 5].map(rating => (
                                <option key={rating} value={rating}>{rating}</option>
                            ))}
                        </select>
                        <label>
                            Favorite:
                            <input
                                type="checkbox"
                                checked={favorites[userMovie.movieId] || false}
                                onChange={(e) => handleFavoriteChange(userMovie.movieId, e.target.checked)}
                            />
                        </label>
                        <label>
                            Status:
                            <select value={statuses[userMovie.movieId] || ''} onChange={(e) => handleStatusChange(userMovie.movieId, e.target.value)}>
                                <option value="">Select status...</option>
                                {/* Replace with your actual status options */}
                                <option value="1">Watched</option>
                                <option value="2">To Watch</option>
                            </select>
                        </label>
                        <button onClick={() => handleUpdate(userMovie.movieId)}>Update Movie</button>
                        <button onClick={() => handleRemoveFromList(userMovie.movieId)}>Remove from List</button>
                    </div>
                ))
            )}
        </div>
    );
}

export default MovieList;
