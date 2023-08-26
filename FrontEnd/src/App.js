// Import React and necessary hooks from the 'react' library
import React, { useState, useEffect } from 'react';

// Import the CSS for styling
import './App.css';

// Import the Header and MovieList components
import Header from './header';
import MovieList from './movielist';

// Define your API endpoints as constants
export const API_KEY = 'api_key=2e65e5f5c5ba081b6ec96ea651bafe73';
export const BASE_URL = 'https://api.themoviedb.org/3';
export const API_URL = BASE_URL + '/movie/popular?language=en-US&page=1&' + API_KEY;
export const IMG_URL = 'https://image.tmdb.org/t/p/w500';
export const SEARCH_URL = BASE_URL + '/search/movie?' + API_KEY;

// Function to determine the color class based on the vote average
export function getcolor(vote) {
  if (vote >= 8) {
    return 'promoter';
  }
  if (vote >= 6) {
    return 'moderate';
  } else {
    return 'poor';
  }
}

function App() {
  // Define and initialize state variables using the 'useState' hook
  const [movies, setMovies] = useState([]); // Stores the list of movies
  const [searchTerm, setSearchTerm] = useState(''); // Stores the search term
  const [overlayContent, setOverlayContent] = useState(''); // Stores content for the overlay

  // Use the 'useEffect' hook to fetch popular movies when the component mounts
  useEffect(() => {
    getMovies(API_URL);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Function to fetch movies from the API
  const getMovies = (url) => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        // Update the 'movies' state with the fetched data
        showMovies(data.results);
      });
  };

  // Function to update the 'movies' state with fetched data
  const showMovies = (data) => {
    setMovies(data);
  };

  // Function to open the overlay and fetch movie trailers
  const openNav = (movie) => {
    const movie_Id = movie.id;
    fetch(BASE_URL + '/movie/' + movie_Id + '/videos?' + API_KEY)
      .then((res) => res.json())
      .then((videoData) => {
        if (videoData.results.length > 0) {
          let embed = [];
          videoData.results.forEach((video) => {
            const { name, key, site } = video;

            if (site === 'YouTube') {
              // Create an iframe for each trailer and add it to the 'embed' array
              embed.push(
                <iframe
                  key={key}
                  width="560"
                  height="315"
                  src={`https://www.youtube.com/embed/${key}`}
                  title={name}
                  className="embed"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
              );
            }
          });
          // Update the 'overlayContent' state with the trailer(s) or a message
          setOverlayContent(embed);
        } else {
          setOverlayContent(<h1>No Trailers Found</h1>);
        }
        // Open the overlay by adjusting its width
        document.getElementById('myNav').style.width = '100%';
      });
  };

  // Function to close the overlay
  const closeNav = () => {
    document.getElementById('myNav').style.width = '0%';
  };

  // Function to handle the search form submission
  const handleSearch = (e) => {
    e.preventDefault();

    if (searchTerm) {
      // If a search term is provided, fetch movies based on the search query
      getMovies(SEARCH_URL + '&query=' + searchTerm);
    } else {
      // If no search term is provided, fetch popular movies
      getMovies(API_URL);
    }
  };

  // Render the application with the Header and MovieList components
  return (
    <div className="App">
      {/* Use the Header component */}
      <Header
        searchTerm={searchTerm} // Pass the search term as a prop
        onSearchChange={(e) => setSearchTerm(e.target.value)} // Update the search term state on input change
        onSearchSubmit={handleSearch} // Handle search form submission
      />
      <div id="myNav" className="overlay">
      {/* Close button for the overlay */}
      <button className="closebtn" onClick={closeNav}>&times;</button>
        {/* Overlay content */}
        <div className="overlay-content" id="overlay-content">
          {overlayContent}
        </div>
      </div>
      {/* Use the MovieList component */}
      <MovieList
        movies={movies} // Pass the list of movies as a prop
        onMovieClick={(movie) => openNav(movie)} // Handle movie click to open the overlay
      />
    </div>
  );
}

export default App;
