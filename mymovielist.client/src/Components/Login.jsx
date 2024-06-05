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
            // If the response is not ok, read it as text instead of JSON
            const errorText = await response.text();
            throw new Error(errorText);
        }

        const { token } = await response.json();
        localStorage.setItem('token', token.result);
        alert('Logged In Successfully');
        navigate('/');
    } catch (error) {
        setError('Login failed: ' + error.message); // Set error message
    }
};

    return (
        <div className="user-form-container">
            <h1 className="user-form-header mt-5">Log In</h1>
            {error && <div className="alert alert-warning">{error}</div>}

            <form className="user-form" onSubmit={handleSubmit}>
                <input className="user-form-input" type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" required />
                <input className="user-form-input" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" required />
                <button className="user-form-button" type="submit">Log In</button>
                {error && <p>{error}</p>}
                <br />
                <p>You don't have an account yet?</p>
                <button className="user-form-buttonR" onClick={() => navigate('/register')}>Register Now</button>
            </form>
        </div>
    );
}

export default Login;
