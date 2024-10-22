import React, { useState, useEffect } from 'react';
import './MyWatchlist.css';
import MovieModal from './MovieModal'; 
import axios from 'axios'; 

const MyWatchlist = ({ user, watchlist, setWatchlist }) => {
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const API_KEY = process.env.REACT_APP_OMDB_API_KEY;

    useEffect(() => {
        if (!API_KEY) {
            console.error("API Key is not defined. Please check your .env file.");
            setErrorMessage("API Key is not defined. Please check your .env file.");
        }
    }, [API_KEY]);

    const removeFromWatchlist = (movieId) => {
        const updatedWatchlist = watchlist.filter(movie => movie.imdbID !== movieId);
        setWatchlist(updatedWatchlist);
        localStorage.setItem(localStorage.getItem('userEmail'), JSON.stringify(updatedWatchlist));
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
        <div className="my-watchlist-container">
            <h2>My Watchlist</h2>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <div className="movie-results">
                {watchlist.length === 0 ? (
                    <p className="no-movies-message">No movies in your watchlist.</p>
                ) : (
                    watchlist.map(movie => (
                        <div className="movie-thumbnail" key={movie.imdbID}>
                            <img src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/150"} alt={movie.Title} />
                            <h4>{movie.Title} ({movie.Year})</h4>
                            <div className="button-group">
                                <button className="remove-button" onClick={() => removeFromWatchlist(movie.imdbID)}>Remove from watchlist</button>
                                <button className="details-button" onClick={() => viewDetails(movie.imdbID)}>View Details</button>
                            </div>
                        </div>
                    ))
                )}
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

export default MyWatchlist;
