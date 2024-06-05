import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


function UserRegistration() {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        email: ''
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

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
            navigate('/login');

        } catch (error) {
            setError('Registration failed: ' + error.message);
        }
    };

    return (
        <div className="user-form-container">
            <h1 className="user-form-header mt-5">User Registration</h1>
             {error && <div className="alert alert-warning" >{error}</div>}
            <form className="user-form" onSubmit={handleSubmit}>               
                    <input className="user-form-input" type="text" name="username" value={formData.username} onChange={handleChange} placeholder="Username" required />         
              
                    <input className="user-form-input" type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" required />
                               
                    <input className="user-form-input" type="email" name="email" value={formData.email} onChange={handleChange} placeholder="E-mail" required />
           
                <button className="user-form-button" type="submit">Register</button>
                <br />
                <p>You already registerd?</p>
                <button className="user-form-buttonR" onClick={() => navigate('/login')}>Login Now</button>
            </form>
        </div>
    );
}

export default UserRegistration;
