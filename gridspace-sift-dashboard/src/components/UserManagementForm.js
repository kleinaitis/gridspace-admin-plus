import React, { useState, useEffect } from 'react';
import './UserManagementForm.css';
import { createUser, updateUser } from '../services/send-data';

function UserManagementForm({ isOpen, onClose, user, onUpdateSuccess, roles, availableOrgNodes, credentials, isCreatingUser }) {
    const [formData, setFormData] = useState({
        orgNode: user?.orgNode?.id || '',
        role: user.role || '',
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        name: '',
        email: '',
    });
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isUpdating, setIsUpdating] = useState(false);
    const [shouldCloseModal, setShouldCloseModal] = useState(false);

    useEffect(() => {
        if (user) {
            setFormData({
                orgNode: user?.orgNode?.id || '',
                role: user.role || '',
                firstName: user.firstName || '',
                lastName: user.lastName || '',
            });
        }
    }, [user]);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleUpdate = async (e) => {
        e.preventDefault();

        const selectedOrgNode = availableOrgNodes.find(node => node.id === formData.orgNode);
        const apiData = {
            org_node: {id: selectedOrgNode.id, name: selectedOrgNode.name},
            role: formData.role,
            // Conditionally set name or first_name/last_name based on user type
            ...(isCreatingUser
                    ? {name: formData.name, email: formData.email}
                    : {first_name: formData.firstName, last_name: formData.lastName}
            )
        };

        if (!isCreatingUser) {
            apiData.userId = user.userId;
        }

        const userChanges = [];

        if (apiData.org_node.id !== user.orgNode.id) {
            userChanges.push(`Org Node: ${user.orgNode.name} ➔ ${apiData.org_node.name}`);
        }
        if (apiData.role !== user.role) {
            userChanges.push(`Role: ${user.role} ➔ ${apiData.role}`);
        }
        if (apiData.first_name !== user.firstName) {
            userChanges.push(`First Name: ${user.firstName} ➔ ${apiData.first_name}`);
        }
        if (apiData.last_name !== user.lastName) {
            userChanges.push(`Last Name: ${user.lastName} ➔ ${apiData.last_name}`);
        }

        const confirmationMessage = isCreatingUser
            ? 'You are about to create a new user. Are you sure you want to proceed?'
            : `You are about to make the following changes:\n${userChanges.join('\n')}\nAre you sure you want to proceed?`;

        if (window.confirm(confirmationMessage)) {
            setIsUpdating(true);
            try {
                if (isCreatingUser) {
                    await createUser(apiData, credentials);
                    onUpdateSuccess(true); // Pass true to indicate creating a new user
                    setSuccessMessage('User created successfully!');
                } else {
                    await updateUser(apiData, credentials);
                    onUpdateSuccess(false); // Pass false to indicate updating an existing user
                    setSuccessMessage('User updated successfully!');
                }
            } catch (error) {
                console.error("Failed to update/create user:", error);
                setErrorMessage('Failed to update user. Please try again.');
            } finally {
                setIsUpdating(false);
                setShouldCloseModal(true);
            }
        }
    };

    useEffect(() => {
        if (isOpen) {
            setShouldCloseModal(false);
        }
    }, [isOpen]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setSuccessMessage('');
        }, 3000);
        return () => clearTimeout(timer);
    }, [successMessage]);

    if (!isOpen) {
        return null;
    }

    const formFields = isCreatingUser
        ? (
            <>
                <label>
                    Org Node
                    <select name="orgNode" value={formData.orgNode} onChange={handleChange} required>
                        <option value="">Select Org Node</option>
                        {availableOrgNodes.map(node => (
                            <option key={node.id} value={node.id}>
                                {node.name}
                            </option>
                        ))}
                    </select>
                </label>
                <label>
                    Role
                    <select name="role" value={formData.role} onChange={handleChange} required>
                        <option value="">Select Role</option>
                        {roles.map(role => (
                            <option key={role} value={role}>{role.charAt(0).toUpperCase() + role.slice(1)}</option>
                        ))}
                    </select>
                </label>
                <label>
                    Name
                    <input type="text" name="name" value={formData.name} onChange={handleChange} required/>
                </label>
                <label>
                    Email
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required/>
                </label>
            </>
        )
        : (
            <>
                <label>
                    Org Node
                    <select name="orgNode" value={formData.orgNode} onChange={handleChange} required>
                        <option value="">Select Org Node</option>
                        {availableOrgNodes.map(node => (
                            <option key={node.id} value={node.id}>
                                {node.name}
                            </option>
                        ))}
                    </select>
                </label>
                <label>
                    Role
                    <select name="role" value={formData.role} onChange={handleChange} required>
                        <option value="">Select Role</option>
                        {roles.map(role => (
                            <option key={role} value={role}>{role.charAt(0).toUpperCase() + role.slice(1)}</option>
                        ))}
                    </select>
                </label>
                <label>
                    First Name
                    <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required/>
                </label>
                <label>
                    Last Name
                    <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required/>
                </label>
            </>
        );

    return (
        <div className="update-user-modal">
            <div className="modal-content">
                {successMessage && <div className="success-message">{successMessage}</div>}
                {errorMessage && <div className="error-message">{errorMessage}</div>}
                {isUpdating && !shouldCloseModal && <div className="loading-indicator">Updating...</div>}
                <div className="modal-header">
                    <h2>{isCreatingUser ? 'Create User' : 'Update User'}</h2>
                </div>
                <form onSubmit={handleUpdate}>
                    {formFields}
                    <div className="form-button-container">
                        <button type="submit" disabled={isUpdating}>
                            {isCreatingUser ? 'Create User' : 'Save Changes'}
                        </button>
                        <button type="button" onClick={onClose} disabled={isUpdating}>
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

    export default UserManagementForm;