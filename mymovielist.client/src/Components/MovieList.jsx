import React, { useEffect, useState } from 'react';
import { updateMyList } from './api'; 

function MovieList() {
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);
    const [ratings, setRatings] = useState({}); 

    useEffect(() => {
        const fetchMovies = () => {
            const token = localStorage.getItem('token');
            if (!token) {
                setError('No token found');
                return;
            }
            
            fetch('api/Movies/MyList', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
                .then((res) => {
                    if (!res.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return res.json();
                })
                .then((data) => {
                    if (!data.errors) {
                        setMovies(data);
                    } else {
                        setMovies([]);
                        setError(data.errors);
                    }
                })
                .catch((error) => {
                    setError(`Failed to fetch movies: ${error.message}`);
                });
        };

        fetchMovies();
    }, []);


    const handleRatingChange = (movieId, newRating) => {
        setRatings(prevRatings => ({ ...prevRatings, [movieId]: newRating }));
    };

    const handleRatingSubmit = async (movieId) => {
        try {
            await updateMyList(movieId, { Rating: ratings[movieId] });
            setError(''); // Clear the error message on successful update
        } catch (error) {
            setError('Failed to update movie rating');
        }
    };

    return (
        <div>
            <h1>My Movies</h1>
            {error && <p>Error: {error}</p>}
            {movies.length === 0 ? (
                <p>No movies found in your list.</p>
            ) : (
                movies.map(userMovie => (
                    <div key={userMovie.Movie.Id}>
                        <h2>{userMovie.Movie.Title}</h2>
                        <p>{userMovie.Movie.Description}</p>
                        <select value={ratings[userMovie.Movie.Id] || ''} onChange={(e) => handleRatingChange(userMovie.Movie.Id, e.target.value)}>
                            <option value="">Rate this movie...</option>
                            {[1, 2, 3, 4, 5].map(rating => (
                                <option key={rating} value={rating}>{rating}</option>
                            ))}
                        </select>
                        <button onClick={() => handleRatingSubmit(userMovie.Movie.Id)}>Submit Rating</button>
                    </div>
                ))
            )}
        </div>
    );


}

export default MovieList;
