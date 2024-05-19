import React, { useState } from 'react';

function Login() {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('/api/User/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.errors.join('\n'));
            }

            alert('Login successful!');
            setFormData({ username: '', password: '' });
            setError('');
            window.location = '/';*//]

        } catch (error) {
            setError('Login failed: ' + error.message);
        }
    };

    return (
        <div>
            <h1>User Login</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Username:
                    <input type="text" name="username" value={formData.username} onChange={handleChange} required />
                </label><br />
                <label>
                    Password:
                    <input type="password" name="password" value={formData.password} onChange={handleChange} required />
                </label><br /><br />
                <button type="submit">Login</button>
            </form>
            {error && <p>{error}</p>}
        </div>
    );
}

export default Login;
