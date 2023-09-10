import React, { useState } from 'react';
import { fetchAllUsers } from '../services/fetch-data';
import './Login.css';

function Login(props) {
    const [accountId, setAccountId] = useState('');
    const [secretKey, setSecretKey] = useState('');
    const [error, setError] = useState('');
    const [helpDialogOpen, setHelpDialogOpen] = useState(false);

    const getUsers = async (credentials) => {
        return await fetchAllUsers(credentials);
    };

    const handleLogin = async () => {
        const credentials = window.btoa(accountId + ":" + secretKey);

        try {
            const users = await getUsers(credentials);

            if (users.length > 0) { // Check if the response contains users
                props.onLoginSuccess(users, credentials); // Successful login
            } else {
                setError('Login failed! Please check your credentials.');
                setTimeout(() => setError(''), 5000);
            }
        } catch (error) {
            console.error("Login error:", error);
            setError('An error occurred while logging in.');
            setAccountId('');
            setSecretKey('');
        }
    };

    const openHelpDialog = () => {
        setHelpDialogOpen(true);
    };

    const closeHelpDialog = () => {
        setHelpDialogOpen(false);
    };

    return (
        <div className="login-page">
            <div className="login-container">
                <div className="login-header">
                    <h1>Sign In</h1>
                </div>
                <div className="login-header-description">
                    <h1>Use your Account ID and Secret Key from Gridspace.</h1>
                </div>
                <div className="account-id-container">
                    <input
                        type="text"
                        className="login-input"
                        placeholder="Account ID"
                        onChange={e => setAccountId(e.target.value)}
                    />
                </div>
                <div className="password-container">
                    <input
                        type="password"
                        className="login-input"
                        placeholder="Secret Key"
                        onChange={e => setSecretKey(e.target.value)}
                    />
                </div>
                <div className="button-container">
                    <button className="login-button" onClick={handleLogin}>
                        Sign In
                    </button>
                    <button className="back-button" onClick={props.handleBack}>
                        Back
                    </button>
                </div>
                {error && <div className="input-error">{error}</div>}
                <div className="help-button-container">
                    <button className="help-button" onClick={openHelpDialog}>
                        Need Help?
                    </button>
                </div>
            </div>
            {helpDialogOpen && (
                <div className="help-dialog-overlay">
                    <div className="help-dialog">
                        <h2>Need Help?</h2>
                        <p>To find your Account ID and Secret Key:</p>
                        <ol>
                            <li>Open your web browser and visit <a href="https://api.gridspace.com/account" target="_blank" rel="noopener noreferrer">https://api.gridspace.com/account</a></li>
                            <li>Login using your Gridspace credentials.</li>
                            <li>Once logged in, your Account ID and Secret Key are displayed on the page</li>
                        </ol>
                        <button className="close-button" onClick={closeHelpDialog}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Login;
