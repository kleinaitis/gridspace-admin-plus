import React, { useState } from 'react';
import './WelcomePage.css';
import Login from "./Login";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCogs, faFileExcel, faKey, faSignInAlt, faUserPlus, faUsersCog} from "@fortawesome/free-solid-svg-icons";

function WelcomePage(props) {
    const [showLogin, setShowLogin] = useState(false);

    const handleGetStarted = () => {
        setShowLogin(true);
    };

    return (
        <div className="welcome-page">
            <section className="welcome-section">
                <div className="welcome-content">
                    <h2 className="welcome-title">[Welcome text]</h2>
                    <p className="welcome-description">
                        [description here]
                    </p>
                    {!showLogin && (
                        <button onClick={handleGetStarted} className="cta-button">
                            Get Started
                        </button>
                    )}
                </div>
            </section>
            {showLogin && (
                <section className="login-section">
                    <Login onLoginSuccess={props.onLoginSuccess} />
                </section>
            )}
            <section className="features-section">
                <div className="features-content">
                    <h2 className="features-title">Key Features</h2>
                    <ul className="features-list">
                        <li className="features-item">
                            <div className="features-icon">
                                <FontAwesomeIcon icon={faCogs} />
                            </div>
                            [feature 0]
                        </li>
                        <li className="features-item">
                            <div className="features-icon">
                                <FontAwesomeIcon icon={faUserPlus} />
                            </div>
                            [feature 1]
                        </li>
                        <li className="features-item">
                            <div className="features-icon">
                                <FontAwesomeIcon icon={faUsersCog} />
                            </div>
                            [feature 1]
                        </li>
                        <li className="features-item">
                            <div className="features-icon">
                                <FontAwesomeIcon icon={faFileExcel} />
                            </div>
                            [feature 3]
                        </li>
                    </ul>
                </div>
            </section>
            <section className="how-it-works-section">
                <div className="how-it-works-content">
                    <h2 className="how-it-works-title">How It Works</h2>
                    <div className="how-it-works-steps">
                        <div className="step">
                            <div className="step-icon">
                                <FontAwesomeIcon icon={faUserPlus} />
                            </div>
                            <h3>Sign Up</h3>
                            <p>[text]</p>
                        </div>
                        <div className="step">
                            <div className="step-icon">
                                <FontAwesomeIcon icon={faKey} />
                            </div>
                            <h3>Get Credentials</h3>
                            <p>[text]</p>
                        </div>
                        <div className="step">
                            <div className="step-icon">
                                <FontAwesomeIcon icon={faSignInAlt} />
                            </div>
                            <h3>Log In</h3>
                            <p>[text]</p>
                        </div>
                    </div>
                </div>
            </section>
            <footer className="footer">
                <p>&copy; 2023 Gridspace Sift Account Tool. All rights reserved.</p>
            </footer>
        </div>
    );
}

export default WelcomePage;
