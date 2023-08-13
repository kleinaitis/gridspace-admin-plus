import React, { useState } from 'react';
import UserRow from './UserRow';
import './UserTable.css';

function UserTable({ users, onUserSelect }) {
    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage, setUsersPerPage] = useState(5);
    const [selectedUser, setSelectedUser] = useState(null);

    const lastIndex = currentPage * usersPerPage;
    const firstIndex = lastIndex - usersPerPage;
    const currentUsers = users.slice(firstIndex, lastIndex);

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

    return (
        <div className="user-table-container">
            <div className="users-per-page-container">
                <label>Users per page: </label>
                <select className="users-per-page-select" onChange={onUsersPerPageChange} value={usersPerPage}>
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="15">15</option>
                </select>
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
                <button className="button" onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
                <button className="button" onClick={() => onPageChange(currentPage + 1)} disabled={currentPage * usersPerPage >= users.length}>Next</button>
            </div>
        </div>
    );
}

export default UserTable;