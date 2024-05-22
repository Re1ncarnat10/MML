import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Components/Login.jsx';
import Register from './Components/Register';
import Home from './Components/HomePage';
import AddMovie from './Components/add';
import MovieList from './Components/MovieList';
import "./App.css"
import "./lib/font-awesome/css/all.min.css"
import { Header } from './Components/Header';
import { Footer } from './Components/Footer.jsx';
import { addMovieToMyList } from './Components/api';
const App = () => {
    

    return (
        <Router>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/add" element={<AddMovie addMovieToMyList={addMovieToMyList} />} />
                <Route path="/movielist" element={<MovieList />} />
            </Routes>
            <Footer />
        </Router>
    );
};

export default App;
