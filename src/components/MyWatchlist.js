// MyWatchlist.js
import React, { useState } from 'react';
import './MyWatchlist.css';
import MovieModal from './MovieModal'; // Modal component for movie details

const MyWatchlist = ({ watchlist, setWatchlist }) => {
    const [selectedMovie, setSelectedMovie] = useState(null);

    const removeFromWatchlist = (movieId) => {
        const updatedWatchlist = watchlist.filter(movie => movie.imdbID !== movieId);
        setWatchlist(updatedWatchlist);
        localStorage.setItem(localStorage.getItem('userEmail'), JSON.stringify(updatedWatchlist));
    };

    const viewDetails = async (movieId) => {
        const response = await fetch(`http://www.omdbapi.com/?i=${movieId}&apikey=85dc34f4`); //fetching data from API key
        const data = await response.json();
        if (data.Response === 'True') {
            setSelectedMovie(data); // Set selected movie details to show in modal
        } else {
            alert("Unable to fetch movie details.");
        }
    };

    return (
        <div className="my-watchlist-container">
            <h2>My Watchlist</h2>
            <div className="movie-results">
                {watchlist.length === 0 ? (
                    <p className="no-movies-message">No movies in your watchlist.</p>
                ) : (
                    watchlist.map(movie => (
                        <div className="movie-thumbnail" key={movie.imdbID}>
                            <img src={movie.Poster} alt={movie.Title} />
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
