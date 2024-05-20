import React from "react";
import { Link } from "react-router-dom";

export const Footer = () => {
    const token = `Bearer ${localStorage.getItem('token')}`
    let userId;
    if (token && token.split('.').length > 1) {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        const data = JSON.parse(jsonPayload);
        userId = data.sub; // 'sub' claim contains the user's ID

        // Store the user's ID in the local storage
        localStorage.setItem('userId', userId);
    } else {
        console.log('Invalid or missing token');
    }

    return (
        <footer style={{ position: 'absolute', bottom: 0, width: '100%' }}>
            <div className="container">
                <div className="inner-content">
                    <div className="brand">
                        <Link to="/">WatchList</Link>
                    </div>

                    <div className="subscribe">
                        <h3>Stay Updated!</h3>
                        <p>Subscribe to our newsletter for the latest movie updates, news, and special offers.</p>
                        <form>
                            <input type="email" placeholder="Enter your email" />
                            <button type="submit">Subscribe</button>
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
