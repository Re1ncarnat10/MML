import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(''); // Add this line
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('/api/User/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });

            if (!response.ok) {
                const errorData = await response.json(); // Get error message from response
                throw new Error(errorData.errors.join('\n')); // Use error message in thrown error
            }

            const { token } = await response.json();
            localStorage.setItem('token', token);

            // Redirect to MovieList page
            navigate('/movielist');
        } catch (error) {
            setError('Login failed: ' + error.message); // Set error message
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" required />
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" required />
            <button type="submit">Log In</button>
            {error && <p>{error}</p>} {/* Display error message */}
        </form>
    );
}

export default Login;
