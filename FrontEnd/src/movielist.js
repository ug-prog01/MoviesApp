import React from 'react';

// Import variables and functions from App.js
import { IMG_URL, getcolor } from './App';

// MovieList component receives props: movies (an array of movie data) and onMovieClick
function MovieList({ movies, onMovieClick }) {
  return (
    <main id="main">
      {/* Map through the movies and render each movie */}
      {movies.map((movie) => (
        <div key={movie.id} className="movie" onClick={() => onMovieClick(movie)}>
          {/* Movie poster */}
          <img src={`${IMG_URL}${movie.poster_path}`} alt={movie.title} />

          {/* Movie information */}
          <div className="movieInfo">
            <h3>{movie.title}</h3>
            {/* Display vote average with appropriate color */}
            <span className={getcolor(movie.vote_average)}>{movie.vote_average}</span>
          </div>

          {/* Movie overview and trailer button */}
          <div className="movieOverview">
            <h3>Overview</h3>
            {movie.overview}
            <br />
            <button className="trailer" id={movie.id}>Trailer</button>
          </div>
        </div>
      ))}
    </main>
  );
}

export default MovieList;
