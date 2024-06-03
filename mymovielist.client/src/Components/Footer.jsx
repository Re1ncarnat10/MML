import React from "react";
import { Link } from "react-router-dom";

export const Footer = () => {
    const token = localStorage.getItem('token');
    let userId = null;

    if (token) {
        try {
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));

            const data = JSON.parse(jsonPayload);
            userId = data.sub; // 'sub' claim contains the user's ID

            // Store the user's ID in the local storage
            localStorage.setItem('userId', userId);
        } catch (error) {
            console.error("Error decoding token:", error);
        }
    }

    return (
        <footer style={{ position: 'relative', bottom: 0, width: '100%' }}>
            <div className="container">
                <div className="inner-content">
                    <div className="brand">
                    </div>

                    <div className="subscribe">
                        <h3>Stay Updated!</h3>
                        <p>Subscribe to our newsletter for the latest movie updates, news, and special offers.</p>
                        <form>
                            <input className="user-form-inputSUB" type="email" placeholder="Enter your email" />
                            <button className="user-form-buttonSUB" type="submit">Subscribe</button>
                        </form>
                    </div>
                    {userId && (
                        <div className="user-id">
                            <h3>Logged in as:</h3>
                            <p>User ID: {userId}</p>
                        </div>
                    )}
                </div>
            </div>
        </footer>
    );
};
