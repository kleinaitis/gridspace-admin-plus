import React, {useEffect, useRef, useState} from 'react';
import UserRow from './UserRow';
import './UserTable.css';

function UserTable({ users, onUserSelect, onCreateUser, onUpdateUser, exportToExcel, updateUserErrorMessage  }) {
    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage, setUsersPerPage] = useState(10);
    const [selectedUser, setSelectedUser] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [displayErrorMessage, setDisplayErrorMessage] = useState(false);
    const tableRef = useRef(null);

    useEffect(() => {
        const handleDocumentClick = (event) => {
            if (!tableRef.current.contains(event.target)) {
                setSelectedUser(null); // Clear selected user if the click is outside the table
                setDisplayErrorMessage(false); // Reset the error message when clicking outside the table
            }
        };

        document.addEventListener('click', handleDocumentClick);

        return () => {
            document.removeEventListener('click', handleDocumentClick);
        };
    }, []);

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

    const handleUpdateUser = () => {
        if (!selectedUser) {
            setDisplayErrorMessage(true); // Show error message when the button is clicked without a selected user
            return;
        }
        onUpdateUser();
    };

    const handleRowClick = (user) => {
        setSelectedUser(user);
        setDisplayErrorMessage(false);
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
            <div ref={tableRef} className="table-wrapper">
            <div className="table-header">
                <h2>Gridspace Admin+ User Management Portal</h2>
            </div>
            <div className="top-row-container">
                <div className="search-bar-container">
                    <input
                        type="text"
                        placeholder="Search..."
                        className="search-bar"
                        value={searchQuery}
                        onChange={onSearchChange}
                    />
                </div>
                <div className="button-container">
                    <button className="icon-button" onClick={onCreateUser}>
                        <i className="fas fa-user-plus"></i>
                        <span className="button-text">Add New User</span>
                    </button>
                    <button
                        className={`icon-button ${updateUserErrorMessage || displayErrorMessage ? 'error' : ''}`}
                        onClick={handleUpdateUser}
                        data-error-message="Please select a user before updating."
                    >
                        <i className="fas fa-pencil-alt"></i>
                        <span className="button-text">Update User</span>
                    </button>
                    <button className="icon-button" onClick={exportToExcel}>
                        <i className="fas fa-file-excel"></i>
                        <span className="button-text">Export to Excel</span>
                    </button>
                </div>
                <div className="users-pagination-container">
                    <div className="view-box">
                        <select className="users-per-page-select" onChange={onUsersPerPageChange} value={usersPerPage}>
                            <option value="10"> View 10 </option>
                            <option value="25">View 25</option>
                            <option value="50">View 50</option>
                        </select>
                        <div className="pagination-label-container">
                            <div className="pagination-label">
                                {`${firstIndex + 1}-${Math.min(lastIndex, filteredUsers.length)} of ${users.length}`}
                            </div>
                        </div>
                    </div>
                    <div className="pagination-buttons">
                        <button className="page-icon-button" onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>
                            <i className="fas fa-chevron-left"></i>
                        </button>
                        <button
                            className="page-icon-button"
                            onClick={() => onPageChange(currentPage + 1)}
                            disabled={currentPage * usersPerPage >= users.length}
                        >
                            <i className="fas fa-chevron-right"></i>
                        </button>
                    </div>
                </div>
            </div>
            <table className="user-table">
                <thead>
                <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Role</th>
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
        </div>
        </div>
    );
}

    export default UserTable;
