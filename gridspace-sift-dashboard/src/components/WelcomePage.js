import React, { useState } from 'react';
import './WelcomePage.css';
import Login from "./Login";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";

import {
    faCogs,
    faEnvelope,
    faFileExcel,
    faKey,
    faSignInAlt,
    faUserPlus,
    faUsersCog
} from "@fortawesome/free-solid-svg-icons";

function WelcomePage(props) {
    const [showLogin, setShowLogin] = useState(false);

    const handleGetStarted = () => {
        setShowLogin(true);
    };

    return (
        <div className="welcome-page">
            <section className="welcome-section">
                <div className="welcome-content">
                    <h2 className="welcome-title">Gridspace Admin+</h2>
                    <p className="welcome-description">
                        The Gridspace Admin+ tool introduces a pivotal feature to the existing functionality—exporting users to Excel. This enhancement directly addresses a void in the Gridspace site by enabling seamless data export. Furthermore, the tool extends its utility to encompass fundamental user management tasks, such as user addition and updates. This holistic approach streamlines administrative operations and demonstrates the tool's value in optimizing user management workflows.                    </p>
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
                            Manage user roles and permissions seamlessly.
                        </li>
                        <li className="features-item">
                            <div className="features-icon">
                                <FontAwesomeIcon icon={faUserPlus} />
                            </div>
                            Perform actions such as adding, updating, and deleting users.
                        </li>
                        <li className="features-item">
                            <div className="features-icon">
                                <FontAwesomeIcon icon={faUsersCog} />
                            </div>
                            Customize user roles to align with your organization's structure.
                        </li>
                        <li className="features-item">
                            <div className="features-icon">
                                <FontAwesomeIcon icon={faFileExcel} />
                            </div>
                            Export user data to Excel for effortless reporting.
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
                            <p>[desc]</p>
                        </div>
                        <div className="step">
                            <div className="step-icon">
                                <FontAwesomeIcon icon={faKey} />
                            </div>
                            <h3>Get Credentials</h3>
                            <p>[desc]</p>
                        </div>
                        <div className="step">
                            <div className="step-icon">
                                <FontAwesomeIcon icon={faSignInAlt} />
                            </div>
                            <h3>Log In</h3>
                            <p>[desc]</p>
                        </div>
                    </div>
                </div>
            </section>
            <hr className="section-divider" />
            <section className="about-me-section">
                <div className="about-me-content">
                    <h2 className="about-me-title">Meet the Developer</h2>
                    <p className="about-me-description">
                        Hi there! I'm Jeff Kleinaitis, a recent Computer Science graduate who is passionate about solving real-world problems through software solutions. Gridspace Admin+ was created to address a practical issue I encountered at work: the lack of a user export function on the native Gridspace site. As a perpetual learner, I'm continually exploring opportunities to refine my skills and streamline my approaches. If you have insights on enhancing Gridspace Admin+, I'd greatly appreciate your input. Your thoughts could make a valuable difference in shaping its future.                    </p>
                    <p className="get-in-touch-message">Get in Touch:</p>
                    <div className="contact-icons">
                        <a href="https://github.com/kleinaitis" target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faGithub} className="icon" />
                        </a>
                        <a href="https://www.linkedin.com/in/kleinaitis/" target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faLinkedin} className="icon" />
                        </a>
                        <a href="mailto:jeffkleinaitis@gmail.com">
                            <FontAwesomeIcon icon={faEnvelope} className="icon" />
                        </a>
                    </div>
                </div>
            </section>
            <footer className="footer">
                <p>&copy; 2023 Gridspace Admin+. All rights reserved.</p>
            </footer>
        </div>
    );
}

export default WelcomePage;
