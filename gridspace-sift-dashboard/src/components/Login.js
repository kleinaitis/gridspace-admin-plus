import React, { useState } from 'react';
import { fetchAllUsers } from '../services/fetch-data';
import './Login.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons/faQuestionCircle";

function Login(props) {
    const [accountId, setAccountId] = useState('');
    const [secretKey, setSecretKey] = useState('');
    const [error, setError] = useState('');
    const [helpDialogOpen, setHelpDialogOpen] = useState(false);

    const handleLogin = async () => {
        const credentials = window.btoa(accountId + ":" + secretKey);

        try {
            const users = await fetchAllUsers(credentials);
            if (users.error) {
                setError('Login failed!');
                setTimeout(() => setError(''), 5000); // Clear the error after 5 seconds
            } else {
                props.onLoginSuccess(users, credentials);
            }
        } catch (error) {
            console.error("Login error:", error);
            setError('An error occurred while logging in.');
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
                            <li>Visit <a href="https://api.gridspace.com/account" target="_blank" rel="noopener noreferrer">https://api.gridspace.com/account</a></li>
                            <li>Log in to your Gridspace account</li>
                            <li>Locate your Account ID and Secret Key on the page</li>
                        </ol>
                        <button className="close-button" onClick={closeHelpDialog}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Login;
