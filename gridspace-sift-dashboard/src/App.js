import React, { useState, useEffect } from 'react';
import { fetchAllUsers } from './services/fetch-data';
import UserTable from './components/UserTable';
import UpdateUser from './components/UpdateUser';
import Login from './components/Login';

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

    return (
        <div className="App">
            <div className="App-header">
                <h1>User Management</h1>
            </div>
            <div className="table-container">
                <UserTable users={Object.values(users)} onUserSelect={handleUserSelect} selectedUserId={selectedUser} />
                <div className="action-buttons">
                    <button className="button button-create" onClick={onCreateUser}>Create New User</button>
                    <button className="button" onClick={onUpdateUser} disabled={!selectedUser}>Update Existing User</button>
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
