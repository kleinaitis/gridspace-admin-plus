import React, { useState } from 'react';
import UserRow from './UserRow';
import './UserTable.css';

function UserTable({ users, onUserSelect }) {
    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage, setUsersPerPage] = useState(5);
    const [selectedUser, setSelectedUser] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    const filteredUsers = users.filter(user => {
        const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
        return (
            fullName.includes(searchQuery.toLowerCase()) ||
            user.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.email.toLowerCase().includes(searchQuery.toLowerCase())
        );
    });

    const lastIndex = currentPage * usersPerPage;
    const firstIndex = lastIndex - usersPerPage;
    const currentUsers = filteredUsers.slice(firstIndex, lastIndex);

    const handleRowClick = (user) => {
        setSelectedUser(user);
        onUserSelect(user.userId);
    };

    const onPageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const onUsersPerPageChange = (event) => {
        setUsersPerPage(event.target.value);
    };

    const onSearchChange = (event) => {
        setSearchQuery(event.target.value);
        setCurrentPage(1);
    };

    return (
        <div className="user-table-container">
            <div className="users-per-page-container">
                <div className="users-per-page-text">
                    <span>View: </span>
                    <select className="users-per-page-select" onChange={onUsersPerPageChange} value={usersPerPage}>
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="15">15</option>
                    </select>
                </div>
                <div className="search-bar-container">
                    <input
                        type="text"
                        placeholder="Search..."
                        className="search-bar"
                        value={searchQuery}
                        onChange={onSearchChange}
                    />
                </div>
            </div>
            <table className="user-table">
                <thead>
                <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Status</th>
                    <th>Last Login</th>
                    <th>Org Node</th>
                </tr>
                </thead>
                <tbody>
                {currentUsers.map(user => (
                    <UserRow
                        key={user.userId}
                        user={user}
                        onRowClick={handleRowClick}
                        isSelected={user === selectedUser}
                    />
                ))}
                </tbody>
            </table>
            <div className="button-container">
                <button className="icon-button" onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>
                    <i className="fas fa-chevron-left"></i>
                </button>
                <button className="icon-button" onClick={() => onPageChange(currentPage + 1)} disabled={currentPage * usersPerPage >= users.length}>
                    <i className="fas fa-chevron-right"></i>
                </button>
            </div>
        </div>
    );
}

export default UserTable;