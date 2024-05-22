import React, { useState, useEffect } from 'react';
import { getMoviesFromDatabase, addMovieToMyList } from './api';

function AddMovie() {
    const [movies, setMovies] = useState([]);
    const [selectedMovieId, setSelectedMovieId] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        async function fetchMovies() {
            setLoading(true);
            try {
                const moviesData = await getMoviesFromDatabase();
                setMovies(moviesData);
            } catch (error) {
                setError('Failed to fetch movies');
            } finally {
                setLoading(false);
            }
        }
        fetchMovies();
    }, []);

    const handleAddToMyList = async () => {
        setLoading(true);
        try {
            await addMovieToMyList(parseInt(selectedMovieId, 10));
            setError('');
            setSuccess('Movie successfully added to your list');
        } catch (error) {
            setError('Failed to add movie to your list');
            setSuccess('');
        } finally {
            setLoading(false);
        }
    };
   
    return (
        <div>
            <h2>Add Movie to My List</h2>
            {loading && <p>Loading...</p>}
            {error && <p style={{ color: 'red' }}>Error: {error}</p>}
            {success && <p style={{ color: 'green' }}>Success: {success}</p>}
            <label htmlFor="MovieId">Select a Movie:</label>
            <select id="MovieId" value={selectedMovieId} onChange={(e) => setSelectedMovieId(e.target.value)}>
                <option value="">Select a movie...</option>
                {movies.map((movie, index) => (
                    <option key={index} value={movie.movieId}>{movie.title}</option>
                ))}
            </select>
            <button onClick={handleAddToMyList} disabled={!selectedMovieId || loading}>Add Movie</button>
        </div>
    );
}

export default AddMovie;
