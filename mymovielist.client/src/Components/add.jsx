import React, { useState, useEffect } from 'react';
import { getMoviesFromDatabase, addToMyList } from './api'; // Assuming you have an API module to fetch movies and add to the user's list

function AddMovie() {
    const [movies, setMovies] = useState([]);
    const [selectedMovieId, setSelectedMovieId] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        async function fetchMovies() {
            try {
                const moviesData = await getMoviesFromDatabase(); // Fetch movies from your database
                setMovies(moviesData);
            } catch (error) {
                setError('Failed to fetch movies');
            }
        }
        fetchMovies();
    }, []);

    const handleAddToMyList = async () => {
        try {
            await addToMyList(selectedMovieId); // Call your API to add the selected movie to the user's list
            // Handle success, maybe show a success message or update the UI
        } catch (error) {
            setError('Failed to add movie to your list');
        }
    };

    return (
        <div>
            <h2>Add Movie to My List</h2>
            {error && <p>{error}</p>}
            <label htmlFor="movieId">Select a Movie:</label>
            <select id="movieId" value={selectedMovieId} onChange={(e) => setSelectedMovieId(e.target.value)}>
                <option value="">Select a movie...</option>
                {movies.map((movie) => (
                    <option key={movie.id} value={movie.id}>{movie.title}</option>
                ))}
            </select>
            <button onClick={handleAddToMyList} disabled={!selectedMovieId}>Add Movie</button>
        </div>
    );
}

export default AddMovie;