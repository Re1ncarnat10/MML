import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const [username, setUsername] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            console.log('No token found, redirecting to login.');
            return;
        }

        const fetchUserData = async () => {
            try {
                const response = await fetch('/api/User', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    console.log('User data fetched:', data);
                    setUsername(data.userName); // U¿ywamy pola `userName` z odpowiedzi API
                } else {
                    console.error('Error fetching user data:', response.status, response.statusText);
                    localStorage.removeItem('token');
                    navigate('/login');
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
                localStorage.removeItem('token');
                navigate('/login');
            }
        };

        fetchUserData();
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        alert('Logged out successfully.');
        navigate('/');
    };

    return (
        <div>
            <h1>Profile</h1>
            {username ? (
                <div>
                    <p>Welcome, {username}!</p>
                    <button onClick={handleLogout}>Logout</button>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default Profile;
