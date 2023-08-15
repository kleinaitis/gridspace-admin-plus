import React, { useState, useEffect } from 'react';
import { fetchAllUsers } from './services/fetch-data';
import UserTable from './components/UserTable';
import UpdateUser from './components/UpdateUser';
import Login from './components/Login';
import * as XLSX from 'xlsx';

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [credentials, setCredentials] = useState(null);
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [isModalOpen, setModalOpen] = useState(false);
    const [userToUpdate, setUserToUpdate] = useState(null);
    const [uniqueRoles, setUniqueRoles] = useState([]);

    useEffect(() => {
        async function getUsersAndRoles() {
            if (credentials) {
                try {
                    const fetchedUsers = await fetchAllUsers(credentials);
                    const usersById = fetchedUsers.reduce((acc, user) => {
                        acc[user.userId] = user;
                        return acc;
                    }, {});
                    setUsers(usersById);

                    const allRoles = [...new Set(Object.values(usersById).map(user => user.role))];
                    setUniqueRoles(allRoles);
                } catch (error) {
                    console.error("Error fetching users:", error);
                }
            }
        }
        getUsersAndRoles();
    }, [credentials]);

    const handleLoginSuccess = (fetchedUsers, loginCredentials) => {
        setUsers(fetchedUsers);
        setCredentials(loginCredentials);
        setIsAuthenticated(true);
    };

    if (!isAuthenticated) {
        return <Login onLoginSuccess={handleLoginSuccess} />;
    }

    const onCreateUser = () => {
        // Logic for creating a new user
    };

    const handleUserSelect = (userId) => {
        setSelectedUser(userId);
    };

    const handleUserListRefresh = async () => {
        if (credentials) {
            try {
                const fetchedUsers = await fetchAllUsers(credentials);
                const usersById = fetchedUsers.reduce((acc, user) => {
                    acc[user.userId] = user;
                    return acc;
                }, {});
                setUsers(usersById);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        }
    };

    const onUpdateUser = async () => {
        if (selectedUser) {
            const user = users[selectedUser];
            setUserToUpdate(user);
            setModalOpen(true);
        }
    };

    const handleUpdateSuccess = async (updatedUserData) => {
        if (credentials) {
            try {
                const updatedUsers = await fetchAllUsers(credentials);
                const usersById = updatedUsers.reduce((acc, user) => {
                    acc[user.userId] = user;
                    return acc;
                }, {});
                setUsers(usersById);

                // Reset selected user
                setSelectedUser(null);

                // Close the modal
                setModalOpen(false);
            } catch (error) {
                console.error("Failed to fetch updated user data:", error);
            }
        }
    };

    const exportToExcel = () => {
        if (credentials) {
            try {
                const workbook = XLSX.utils.book_new();
                const sheetData = Object.values(users).map(user => [
                    user.userId,
                    user.firstName,
                    user.lastName,
                    user.email,
                    user.team,
                    user.role,
                    user.orgNode ? user.orgNode.name : '',
                    user.agentId,
                    user.externalId,
                    user.displayName,
                    user.status,
                    user.lastLogin,
                ]);

                const ws = XLSX.utils.aoa_to_sheet([
                    [
                        'User ID',
                        'First Name',
                        'Last Name',
                        'Email',
                        'Team',
                        'Role',
                        'Org Node',
                        'Agent ID',
                        'External ID',
                        'Display Name',
                        'Status',
                        'Last Login',
                    ],
                    ...sheetData,
                ]);
                XLSX.utils.book_append_sheet(workbook, ws, 'Users');

                // Save the file
                XLSX.writeFile(workbook, 'user_data.xlsx');
            } catch (error) {
                console.error('Error exporting to Excel:', error);
            }
        }
    };

    return (
        <div className="App">
            <div className="App-header">
                <h1>User Management</h1>
            </div>
            <div className="table-container">
                <UserTable users={Object.values(users)} onUserSelect={handleUserSelect} selectedUserId={selectedUser} />
                <div className="action-buttons">
                    <button className="button button-create" onClick={onCreateUser}>
                        <i className="fas fa-plus"></i> Add New User
                    </button>
                    <button className="button" onClick={onUpdateUser} disabled={!selectedUser}>
                        <i className="fas fa-pencil-alt"></i> Update Existing User
                    </button>
                    <button className="button" onClick={exportToExcel}>
                        <i className="fas fa-file-excel"></i> Export Users to Excel
                    </button>
                </div>
            </div>
            {isModalOpen && (
                <UpdateUser
                    isOpen={isModalOpen}
                    onClose={() => setModalOpen(false)}
                    user={userToUpdate}
                    onUpdateSuccess={handleUpdateSuccess}
                    roles={uniqueRoles}
                    onUserListRefresh={handleUserListRefresh}
                    credentials={credentials}
                />
            )}
        </div>
    );
}

export default App;
