// App.js 
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Route, Routes, useLocation } from 'react-router-dom'; // Changed to HashRouter
import Login from './components/Login';
import Home from './components/Home';
import MyWatchlist from './components/MyWatchlist';
import Header from './components/Header';
import './App.css';

const AppContent = ({ user, handleLogout, handleLogin, watchlist, setWatchlist }) => {
    const location = useLocation(); // To get the current location

    // To determine the current page based on the pathname
    const currentPage = location.pathname === '/mywatchlist' ? 'mywatchlist' : 'home';

    return (
        <>
            {user && <Header user={user} onLogout={handleLogout} currentPage={currentPage} />} {/* Pass currentPage */}
            <div className="main-content">
                <Routes>
                    <Route 
                        path="/home" 
                        element={user ? <Home user={user} watchlist={watchlist} setWatchlist={setWatchlist} /> : <Login onLogin={handleLogin} />} 
                    />
                    <Route 
                        path="/mywatchlist" 
                        element={user ? <MyWatchlist watchlist={watchlist} setWatchlist={setWatchlist} /> : <Login onLogin={handleLogin} />} 
                    />
                    <Route 
                        path="/" 
                        element={<Login onLogin={handleLogin} />} 
                    />
                </Routes>
            </div>
        </>
    );
};

const App = () => {
    const [user, setUser] = useState(null);
    const [watchlist, setWatchlist] = useState([]);

    useEffect(() => {
        const storedEmail = localStorage.getItem('userEmail');
        if (storedEmail) {
            setUser({ email: storedEmail });
            setWatchlist(JSON.parse(localStorage.getItem(storedEmail)) || []);
        }
    }, []);

    const handleLogin = (email) => {
        localStorage.setItem('userEmail', email);
        setUser({ email });
        setWatchlist(JSON.parse(localStorage.getItem(email)) || []);
    };

    const handleLogout = () => {
        localStorage.removeItem('userEmail');
        setUser(null);
        setWatchlist([]);
    };

    return (
        <Router>
            <AppContent 
                user={user} 
                handleLogout={handleLogout} 
                handleLogin={handleLogin} 
                watchlist={watchlist} 
                setWatchlist={setWatchlist} 
            />
        </Router>
    );
};

export default App;
