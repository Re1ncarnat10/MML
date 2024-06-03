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
            alert('Logged In Successfully');
            navigate('/');
        } catch (error) {
            setError('Login failed: ' + error.message); // Set error message
        }
    };

    return (
        <div className="user-form-container">
            <h1 className="user-form-header">Log In</h1>
            <form className="user-form" onSubmit={handleSubmit}>
                <input className="user-form-input" type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" required />
                <input className="user-form-input" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" required />
                <button className="user-form-button" type="submit">Log In</button>
                {error && <p>{error}</p>}
                <br />
                <p>You dont have account yet?</p>
                <button className="user-form-buttonR" onClick={() => navigate('/register')}>Register Now</button>
            </form>
        </div>
    );
}

export default Login;
