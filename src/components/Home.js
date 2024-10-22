import React, { useState, useEffect } from 'react';
import './Home.css';
import MovieModal from './MovieModal'; // Modal component for movie details
import axios from 'axios'; // Import axios for API calls

const Home = ({ user, watchlist, setWatchlist }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

    const API_KEY = process.env.REACT_APP_OMDB_API_KEY;

    useEffect(() => {
        if (!API_KEY) {
            console.error("API Key is not defined. Please check your .env file.");
            setErrorMessage("API Key is not defined. Please check your .env file.");
        }
    }, [API_KEY]);

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!searchTerm.trim()) {
            alert("Please enter a search term.");
            return;
        }

        try {
            const response = await axios.get(`https://www.omdbapi.com/?s=${searchTerm}&apikey=${API_KEY}`);
            if (response.data.Response === 'True') {
                setMovies(response.data.Search);
            } else {
                setMovies([]);
                alert("No movies found for your search term.");
            }
        } catch (error) {
            console.error("Error fetching movies:", error);
            alert("An error occurred while fetching movies.");
        }
    };

    const addToWatchlist = (movie) => {
        if (!watchlist.some(w => w.imdbID === movie.imdbID)) {
            const updatedWatchlist = [...watchlist, movie];
            setWatchlist(updatedWatchlist);
            localStorage.setItem(user.email, JSON.stringify(updatedWatchlist));
        } else {
            alert("This movie is already in your watchlist.");
        }
    };

    const removeFromWatchlist = (movieId) => {
        const updatedWatchlist = watchlist.filter(movie => movie.imdbID !== movieId);
        setWatchlist(updatedWatchlist);
        localStorage.setItem(user.email, JSON.stringify(updatedWatchlist));
    };

    const viewDetails = async (imdbID) => {
        try {
            const response = await axios.get(`https://www.omdbapi.com/?i=${imdbID}&apikey=${API_KEY}`);
            if (response.data.Response === 'True') {
                setSelectedMovie(response.data);
            } else {
                alert("Unable to fetch movie details.");
            }
        } catch (error) {
            console.error("Error fetching movie details:", error);
            alert("An error occurred while fetching movie details.");
        }
    };

    return (
        <div className="home-container">
            <h2>Browse movies and add them to your watchlist</h2>
            <form onSubmit={handleSearch} className="search-form">
                <input 
                    type="text" 
                    placeholder="Search for a movie..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button type="submit">Search</button>
            </form>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <div className="movie-results"> 
                {movies.map(movie => (
                    <div className="movie-thumbnail" key={movie.imdbID}>
                        <img src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/150"} alt={movie.Title} />
                        <h4>{movie.Title} ({movie.Year})</h4>
                        <div className="button-group">
                            {watchlist.some(w => w.imdbID === movie.imdbID) ? (
                                <button className="remove-button" onClick={() => removeFromWatchlist(movie.imdbID)}>Remove from watchlist</button>
                            ) : (
                                <button className="add-button" onClick={() => addToWatchlist(movie)}>Add to watchlist</button>
                            )}
                            <button className="details-button" onClick={() => viewDetails(movie.imdbID)}>View Details</button>
                        </div>
                    </div>
                ))}
            </div>
            {selectedMovie && (
                <MovieModal 
                    movie={selectedMovie} 
                    onClose={() => setSelectedMovie(null)} 
                />
            )}
        </div>
    );
};

export default Home;
