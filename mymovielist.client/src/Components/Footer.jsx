import React from "react";
import { Link } from "react-router-dom";

export const Footer = () => {
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
                </div>
            </div>
        </footer>
    );
};