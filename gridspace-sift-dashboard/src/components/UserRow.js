import React from 'react';

function UserRow({ user }) {
    return (
        <tr>
            <td>{user.UserID}</td>
            <td>{user.DisplayName}</td>
            <td>{user.Email}</td>
            <td>{user.Status}</td>
            <td>{user.LastLogin}</td>
            <td>{user.OrgNode}</td>
            <td>{user.Name}</td>
            <td>{user.FirstName}</td>
            <td>{user.LastName}</td>
            <td>{user.ExternalID}</td>
        </tr>
    );
}

export default UserRow;