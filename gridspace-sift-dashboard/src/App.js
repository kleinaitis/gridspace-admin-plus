import React, { useState, useEffect } from 'react';
import {fetchAllUsers, fetchOrgNodes} from './services/fetch-data';
import UserTable from './components/UserTable';
import UserManagementForm from './components/UserManagementForm';
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
    const [orgNodes, setOrgNodes] = useState([]);

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

        const getOrgNodes = async () => {
            try {
                const nodes = await fetchOrgNodes(credentials);
                setOrgNodes(nodes);
            } catch (error) {
                console.error("Error fetching org nodes:", error);
            }
        };

        if (credentials) {
            getUsersAndRoles();
            getOrgNodes();
        }
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
        const newUser = {
            orgNode: '',
            role: '',
            firstName: '',
            lastName: '',
        };
        setUserToUpdate(newUser);
        setModalOpen(true);
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

    const handleUpdateSuccess = async (isCreating) => {
        if (credentials) {
            try {
                const updatedUsers = await fetchAllUsers(credentials);
                const usersById = updatedUsers.reduce((acc, user) => {
                    acc[user.userId] = user;
                    return acc;
                }, {});

                setUsers(usersById);

                if (isCreating) {
                    setModalOpen(false); // Close the modal when creating a new user
                } else {
                    setSelectedUser(null);
                    setModalOpen(false); // Close the modal when updating an existing user
                }
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
                <UserTable
                    users={Object.values(users)}
                    onUserSelect={handleUserSelect}
                    selectedUserId={selectedUser}
                    onCreateUser={onCreateUser}
                    onUpdateUser={onUpdateUser}
                    exportToExcel={exportToExcel}
                />
            </div>
            {isModalOpen && (
                <UserManagementForm
                    isOpen={isModalOpen}
                    onClose={() => setModalOpen(false)}
                    user={userToUpdate}
                    onUpdateSuccess={handleUpdateSuccess}
                    roles={uniqueRoles}
                    onUserListRefresh={handleUserListRefresh}
                    availableOrgNodes={orgNodes}
                    credentials={credentials}
                    isCreatingUser={!selectedUser}
                />
            )}
        </div>
    );
}

export default App;
