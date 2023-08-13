import React from 'react';
import './UserTable.css';

function UserRow({ user, onRowClick, isSelected }) {
    function formatDate(lastLogin) {
        if (!lastLogin) {
            return 'Never'; // Handles lastLogin missing
        }

        const localTime = new Date(lastLogin);

        const options = {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        };

        return new Intl.DateTimeFormat(undefined, options).format(localTime);
    }

    return (
        <tr onClick={() => onRowClick(user)} className={isSelected ? 'selected-row' : ''}>
            <td>{user.firstName}</td>
            <td>{user.lastName}</td>
            <td>{user.email}</td>
            <td>{user.status}</td>
            <td>{formatDate(user.lastLogin)}</td>
            <td>{user.orgNode ? user.orgNode.name : ''}</td>
        </tr>
    );
}

export default UserRow;