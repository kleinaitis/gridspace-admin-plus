import React, { useState } from 'react';
import { fetchAllUsers } from '../services/fetch-data';
import './Login.css';

function Login(props) {
    const [accountId, setAccountId] = useState('');
    const [secretKey, setSecretKey] = useState('');
    const [error, setError] = useState('');

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
            setError('An error occurred while logging in.');
        }
    };

    return (
        <div className="login-page">
            <div className="login-container">
                <input type="text" placeholder="Account ID" onChange={e => setAccountId(e.target.value)} />
                <input type="password" placeholder="Secret Key" onChange={e => setSecretKey(e.target.value)} />
                <button onClick={handleLogin}>Login</button>
                {error && <div className="error-message">{error}</div>}
            </div>
        </div>
    );
}

export default Login;