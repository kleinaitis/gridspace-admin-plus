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
                    <h1>Login</h1>
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
                        Login
                    </button>
                    <div className="help-button-container">
                        <button className="help-button" onClick={openHelpDialog}>
                            <FontAwesomeIcon icon={faQuestionCircle} />
                        </button>
                    </div>
                </div>
                {error && <div className="input-error">{error}</div>}
            </div>
            {helpDialogOpen && (
                <div className="help-dialog-overlay">
                    <div className="help-dialog">
                        <h2>Need Help?</h2>
                        <p>If you're experiencing any issues....</p>
                        <button className="close-button" onClick={closeHelpDialog}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Login;
