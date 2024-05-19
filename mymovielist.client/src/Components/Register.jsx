import React, { useState } from 'react';

function UserRegistration() {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        email: ''
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('/api/User/register', {
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

            alert('User registered successfully!');
            setFormData({ username: '', password: '', email: '' });
            setError('');
        } catch (error) {
            setError('Registration failed: ' + error.message);
        }
    };

    return (
        <div>
            <h1>User Registration</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Username:
                    <input type="text" name="username" value={formData.username} onChange={handleChange} required />
                </label><br />
                <label>
                    Password:
                    <input type="password" name="password" value={formData.password} onChange={handleChange} required />
                </label><br />
                <label>
                    Email:
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                </label><br /><br />
                <button type="submit">Register</button>
            </form>
            {error && <p>{error}</p>}
        </div>
    );
}

export default UserRegistration;
