import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FavoriteCard from './FavoriteCard';
import { getMyMovieList } from './api';

const Profile = () => {
    const [myList, setMyList] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMyList = async () => {
            try {
                const list = await getMyMovieList();
                setMyList(list);
            } catch (error) {
                console.error('Failed to fetch my list:', error);
                navigate('/login'); // Redirect to login page if fetch fails
            }
        };

        fetchMyList();
    }, [navigate]);

    return (
        <>
            <h1 className="user-form-header mt-2">My List</h1>
            <div className="movie-grid mt-4">
            
                {myList.map(movie => (
                    <FavoriteCard key={movie.movieId} movie={movie} />
                ))}
            </div>
        </>
    );
};

export default Profile;
