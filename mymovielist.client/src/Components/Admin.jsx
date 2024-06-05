import React from 'react';
import { Link, useNavigate } from "react-router-dom";

const Admin = () => {
    const navigate = useNavigate();

     
    return (

        <div className="user-form-container">

                <h1 className="user-form-header">ADMIN PANEL</h1>
                <p>Please select an option:</p>
            <div>

                <button onClick={() => navigate('/admin/create')} className="admin-btn-add btn btn-main">
                        Create
                </button>

                <button onClick={() => navigate('/admin/users')} className="admin-btn-us btn btn-main">
                    Users
                </button>

                <button onClick={() => navigate('/admin/delete')} className="admin-btn-del btn btn-main">
                            Delete
                </button>

                 </div>

            </div>

    );
};

export default Admin;
