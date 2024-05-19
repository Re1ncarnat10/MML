import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Login from './Components/Login.jsx';
import Register from './Components/Register';
import Home from './Components/HomePage';
import Add from './Components/add';
import "./App.css"
import "./lib/font-awesome/css/all.min.css"
import { Header } from './Components/Header';
import { Footer } from './Components/Footer.jsx';

const App = () => {
    const [movies, setMovies] = useState([
        // twoja tablica filmów
    ]);

    return (
        <Router>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/add" element={<Add />} />
            </Routes>
            <Footer />
        </Router>
    );
};

export default App;
