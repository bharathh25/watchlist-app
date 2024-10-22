// Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import icon2 from "../components/home-logo.png";

const Header = ({ user, onLogout, currentPage }) => {
    return (
        <header className="header">
            <img src={icon2} alt="Logo" className="logo" />
            <span className="hello-note">Hello, {user.email}</span>
            <nav className="nav-buttons">
                <Link to="/home" className={`nav-button ${currentPage === 'home' ? 'active' : ''}`}>Home</Link>
                <Link to="/mywatchlist" className={`nav-button ${currentPage === 'mywatchlist' ? 'active' : ''}`}>My Watchlist</Link>
                <button onClick={onLogout} className="logout-button">Logout</button>
            </nav>
        </header>
    );
};

export default Header;

