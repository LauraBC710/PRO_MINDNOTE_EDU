import React from 'react';
import UserList from './UserList';
import '../../styles/Admin.css';

const AdminDashboard = () => {
    return (
        <div className="admin-dashboard">
            <UserList />
            
        </div>
    );
};

export default AdminDashboard;
