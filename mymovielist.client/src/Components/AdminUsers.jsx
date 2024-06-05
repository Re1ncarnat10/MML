import React, { useEffect, useState } from 'react';
import { getUser, deleteUser } from './api';

const AdminUsers = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            const usersData = await getUser();
            setUsers(usersData);
        };

        fetchUsers();
    }, []);

    const handleDelete = async (userId) => {
        try {
            await deleteUser(userId);
            setUsers(users.filter(user => user.id !== userId));
        } catch (error) {
            console.error('Delete error:', error);
        }
    };

    return (
        <div className='u-row'>
            {users.map(user => (
                <div className="u-back"  key={user.id}>
                    <p>Username: {user.userName}</p>
                    <p>Email: {user.email}</p>
                    <button className="btn-del btn btn-main" onClick={() => handleDelete(user.id)}>Delete</button>
                </div>
            ))}
        </div>
    );
};

export default AdminUsers;
