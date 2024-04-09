import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MoviesComponent = () => {
    const [movies, setMovies] = useState([]);
    const [newMovie, setNewMovie] = useState({ title: '', director: '', year: '' });

    useEffect(() => {
        fetchMovies();
    }, []);

    const fetchMovies = async () => {
        try {
            const response = await axios.get('/api/Movies');
            setMovies(response.data);
        } catch (error) {
            console.error('Error fetching movies:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewMovie({ ...newMovie, [name]: value });
    };

    const addMovie = async () => {
        try {
            await axios.post('/api/Movies', newMovie);
            setNewMovie({ title: '', director: '', year: '' });
            fetchMovies();
        } catch (error) {
            console.error('Error adding movie:', error);
        }
    };

    const deleteMovie = async (id) => {
        try {
            await axios.delete(`/api/Movies/${id}`);
            fetchMovies();
        } catch (error) {
            console.error('Error deleting movie:', error);
        }
    };

    return (
        <div>
            <h1>Movies</h1>
            <div>
                <input type="text" name="title" placeholder="Title" value={newMovie.title} onChange={handleInputChange} />
                <input type="text" name="director" placeholder="Director" value={newMovie.director} onChange={handleInputChange} />
                <input type="text" name="year" placeholder="Year" value={newMovie.year} onChange={handleInputChange} />
                <button onClick={addMovie}>Add Movie</button>
            </div>
            <ul>
                {movies.map((movie) => (
                    <li key={movie.movieId}>
                        {movie.title} - {movie.director} ({movie.year})
                        <button onClick={() => deleteMovie(movie.movieId)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MoviesComponent;