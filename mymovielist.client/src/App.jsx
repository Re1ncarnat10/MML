import React, {useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Components/Login.jsx';
import Register from './Components/Register';
import Home from './Components/HomePage';
import OurMovieList from './Components/OurMovieList';
import Menu from './Components/Menu';
import AddMovie from './Components/add';
import "./App.css"
import "./lib/font-awesome/css/all.min.css"
import { Header } from './Components/Header';
import { Footer } from './Components/Footer.jsx';
import { addMovieToMyList,getUserRoles } from './Components/api';
import Profile from './Components/Profile.jsx';
import Admin from './Components/Admin.jsx'
import AdminCreate from './Components/AdminCreate.jsx'
import AdminDelete from './Components/AdminDelete.jsx'
import AdminUsers from './Components/AdminUsers.jsx'

const App = () => {
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const checkUserRole = async () => {
            const roles = await getUserRoles();
            setIsAdmin(roles.includes('admin'));
        };
        checkUserRole();
    }, []);

    return (
        <Router>
            <Header />
            <Routes>
                <Route path="/" element={<Menu />} />
                <Route path="/movielist" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/add" element={<AddMovie addMovieToMyList={addMovieToMyList} />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/ourfilms" element={<OurMovieList />} />
                {isAdmin ? <Route path="/admin" element={<Admin/>}/> : <Route path="/" element={<Home/>}/>}
                {isAdmin ? <Route path="/admin/create" element={<AdminCreate/>}/> : <Route path="/" element={<Home/>}/>}
                {isAdmin ? <Route path="/admin/delete" element={<AdminDelete/>}/> : <Route path="/" element={<Home/>}/>}
                {isAdmin ? <Route path="/admin/users" element={<AdminUsers/>}/> : <Route path="/" element={<Home/>}/>}

            </Routes>
            <Footer />
        </Router>
    );
};

export default App;
