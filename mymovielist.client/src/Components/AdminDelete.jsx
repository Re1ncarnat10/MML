import React, { useEffect, useState } from 'react';
import { getMoviesFromDatabase, deleteAdmin } from './api';
import MovieCard from './MovieCard';

const AdminDelete = () => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const fetchMovies = async () => {
            const moviesData = await getMoviesFromDatabase();
            setMovies(moviesData);
        };

        fetchMovies();
    }, []);

    const handleDelete = async (movieId) => {
        try {
            await deleteAdmin(movieId);
            setMovies(movies.filter(movie => movie.movieId !== movieId));
        } catch (error) {
            console.error('Delete error:', error);
        }
    };

    return (
        <div className="movie-grid">
            {movies.map(movie => (
                <div key={movie.movieId}>
                    <MovieCard movie={movie} />
                    <button className="btn-del btn btn-main" onClick={() => handleDelete(movie.movieId)}>Delete</button>
                </div>
            ))}
        </div>
    );
};

export default AdminDelete;
