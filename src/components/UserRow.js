import React from 'react';

function UserRow({ user, onRowClick, isSelected }) {
    function formatDate(lastLogin) {
        if (!lastLogin) {
            return 'Never';
        }

        const localTime = new Date(lastLogin);

        const options = {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        };

        return new Intl.DateTimeFormat(undefined, options).format(localTime);
    }

    const dotColor = user.status === 'active' ? '#00ff00' : '#ff9900';
    const statusText = user.status === 'active' ? 'Active' : 'Pending';

    const dotStyle = {
        display: 'inline-block',
        verticalAlign: 'middle',
        width: '8px',
        height: '8px',
        borderRadius: '50%',
        backgroundColor: dotColor,
        marginRight: '5px',
    };

    const rowClassName = isSelected ? 'table-selected-row' : '';

    return (
        <tr onClick={() => onRowClick(user)} className={rowClassName}>
            <td className="fixed-cell">{user.firstName}</td>
            <td className="fixed-cell">{user.lastName}</td>
            <td className="fixed-cell">{user.email}</td>
            <td className="fixed-cell">{user.role.charAt(0).toUpperCase() + user.role.slice(1)}</td>
            <td className="fixed-cell">
                <span style={dotStyle}></span>
                {statusText}
            </td>
            <td className="fixed-cell">{formatDate(user.lastLogin)}</td>
            <td className="fixed-cell">{user.orgNode ? user.orgNode.name : 'None'}</td>
        </tr>
    );
}

export default UserRow;
