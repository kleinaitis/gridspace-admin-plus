import React, { useEffect, useState } from 'react';
import { fetchAllUsers } from '../api/fetch-data';
import UserRow from './UserRow';

function UserTable() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        async function loadUsers() {
            const fetchedUsers = await fetchAllUsers();
            setUsers(fetchedUsers);
        }

        loadUsers();
    }, []);

    return (
        <table>
            <thead>
            <tr>
                <th>User ID</th>
                <th>Display Name</th>
                <th>Email</th>
                <th>Status</th>
                <th>Last Login</th>
                <th>Org Node</th>
                <th>Name</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>External ID</th>
            </tr>
            </thead>
            <tbody>
            {users.map(user => (
                <UserRow key={user.UserID} user={user} />
            ))}
            </tbody>
        </table>
    );
}

export default UserTable;