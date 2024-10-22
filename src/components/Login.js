// Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import  useNavigate
import './Login.css';
import icon1 from "../components/login-logo.png";

const Login = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const navigate = useNavigate(); // Initialize useNavigate

    const handleLogin = (e) => {
        e.preventDefault();
        if (email) {
            onLogin(email);
            navigate('/home'); // To redirect to Home page after login
        }
    };

    return (
        <div className="login-container">
            <img src={icon1} alt="Login" className="login-image" />
            <form onSubmit={handleLogin} className="login-form">
                <h2>Login / Create Account</h2>
                <input 
                    type="email" 
                    placeholder="Enter your email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
