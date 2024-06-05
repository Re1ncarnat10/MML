/// <reference path="login.jsx" />
import React, { useState } from 'react';
import { createMovie } from './api.jsx';

const AdminCreate = () => {
    const [image, setImage] = useState('');
    const placeholderImage = 'https://via.placeholder.com/320'; // Placeholder image URL

    const [movie, setMovie] = useState({
        title: '',
        description: '',   
        releaseYear: 2022,
        genreName: '',
        image: image || placeholderImage
    });

    const handleChange = (e) => {
        setMovie({
            ...movie,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const movieWithImage = {
                ...movie,
                image: image || placeholderImage
            };
            await createMovie(movieWithImage);
            alert('Movie created successfully');
        } catch (error) {
            console.error(error);
            alert('Failed to create movie');
        }
    };
                                    
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            setImage(placeholderImage);
        }
    };

    return (
        <div className="admin-form-container mb-10">
            <h1 className="user-form-header mt-0 mb-4">Admin Page</h1>
            <form className="admin-form" onSubmit={handleSubmit}>
                           
                <input type="text" name="title" value={movie.title} onChange={handleChange} placeholder="Title" required
                        className="admin-form-input m"/>
                       
                <input type="text" name="description" value={movie.description} onChange={handleChange} placeholder="Description" required
                        className="admin-form-input"/>     
                 
                    <input type="text" name="genreName" value={movie.genreName} onChange={handleChange} placeholder="Genre" required
                        className="admin-form-input"/>
               
                <input type="file" onChange={handleImageChange}
                        className="admin-form-input"/>         
             
                <input type="number" name="releaseYear" value={movie.releaseYear} onChange={handleChange} placeholder="Release Year" required
                        className="admin-form-input"/>
          
                <button className="admin-form-btn" type="submit">Create Movie</button>
            </form>
        </div>
    );
};

export default AdminCreate;