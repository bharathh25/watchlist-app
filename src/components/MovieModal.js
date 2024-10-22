//MovieModal.js
import React from 'react';
import './MovieModal.css';

const MovieModal = ({ movie, onClose }) => {
    if (!movie) return null; 

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="close-button" onClick={onClose}>×</button>
                <div className="modal-body">
                    <div className="modal-left">
                        <img src={movie.Poster} alt={movie.Title} />
                        <h4>{movie.Title}</h4>
                    </div>
                    <div className="modal-right"> 
                        <p><strong>Year:</strong> {movie.Year || 'N/A'}</p>
                        <p><strong>Rated:</strong> {movie.Rated || 'N/A'}</p>
                        <p><strong>Released:</strong> {movie.Released || 'N/A'}</p>
                        <p><strong>Runtime:</strong> {movie.Runtime || 'N/A'}</p>
                        <p><strong>Genre:</strong> {movie.Genre || 'N/A'}</p>
                        <p><strong>Director:</strong> {movie.Director || 'N/A'}</p>
                        <p><strong>Writer:</strong> {movie.Writer || 'N/A'}</p>
                        <p><strong>Actors:</strong> {movie.Actors || 'N/A'}</p>
                        <p><strong>Plot:</strong> {movie.Plot || 'N/A'}</p>
                        <p><strong>IMDb Rating:</strong> {movie.imdbRating || 'N/A'}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MovieModal;
