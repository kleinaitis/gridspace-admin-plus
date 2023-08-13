import React, { useState, useEffect } from 'react';
import './UpdateUser.css';
import { updateUser } from '../services/send-data';
import { fetchOrgNodes } from '../services/fetch-data';

function UpdateUser({ isOpen, onClose, user, onUpdateSuccess, roles }) {
    const [orgNodes, setOrgNodes] = useState([]);
    const [formData, setFormData] = useState({
        orgNode: user?.orgNode?.id || '',
        role: user.role || '',
        firstName: user.firstName || '',
        lastName: user.lastName || '',
    });
    const [successMessage, setSuccessMessage] = useState('');
    const [isUpdating, setIsUpdating] = useState(false);
    const [shouldCloseModal, setShouldCloseModal] = useState(false);

    useEffect(() => {
        const getOrgNodes = async () => {
            const nodes = await fetchOrgNodes();
            const mappedNodes = nodes.map(node => ({ id: node.id, name: node.name }));
            setOrgNodes(mappedNodes);
        };
        getOrgNodes();

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
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleUpdate = async (e) => {
        e.preventDefault();

        const selectedOrgNode = orgNodes.find(node => node.id === formData.orgNode);
        const apiData = {
            org_node: { id: selectedOrgNode.id, name: selectedOrgNode.name },
            role: formData.role,
            first_name: formData.firstName,
            last_name: formData.lastName,
            userId: user.userId
        };

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

        const confirmationMessage = `You are about to make the following changes:\n${userChanges.join('\n')}\nAre you sure you want to proceed?`;

        if (window.confirm(confirmationMessage)) {
            setIsUpdating(true);
            try {
                await updateUser(apiData);
                onUpdateSuccess(apiData);
                setSuccessMessage('User updated successfully!');
            } catch (error) {
                console.error("Failed to update user:", error);
            } finally {
                onClose(); // Close the modal after API call completed
                setIsUpdating(false);
            }
        }
    };

    useEffect(() => {
        if (isOpen) {
            setShouldCloseModal(false);
        }
    }, [isOpen]);

    if (!isOpen) {
        return null;
    }

    return (
        <div className="update-user-modal">
            <div className="modal-content">
                {successMessage && <div className="success-message">{successMessage}</div>}
                {isUpdating && !shouldCloseModal && <div className="loading-indicator">Updating...</div>}
                <button className="close-button" onClick={onClose}>X</button>
                <h2>Update User</h2>
                <form onSubmit={handleUpdate}>
                    <label>Org Node:
                        <select name="orgNode" value={formData.orgNode} onChange={handleChange} required>
                            {orgNodes.map(node => (
                                <option key={node.id} value={node.id}>{node.name}</option>
                            ))}
                        </select>
                    </label>
                    <label>Role:
                        <select name="role" value={formData.role} onChange={handleChange} required>
                            <option value="">Select Role</option>
                            {roles.map(role => (
                                <option key={role} value={role}>{role}</option>
                            ))}
                        </select>
                    </label>
                    <label>First Name: <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required /></label>
                    <label>Last Name: <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required /></label>
                    <button type="submit">Update User</button>
                </form>
            </div>
        </div>
    );
}

export default UpdateUser;
