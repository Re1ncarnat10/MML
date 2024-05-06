import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Components/Login.jsx'; // Import your Login component here
import Register from './Components/Register';
import Home from './Components/HomePage';
import Add from './Components/add';
import "./App.css"
import "./lib/font-awesome/css/all.min.css"
import { Header } from './Components/Header';

const App = () => {
    return (
        <Router>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} /> 
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/add" element={<Add />} />

            </Routes>
            
        </Router>
    );
};

export default App;