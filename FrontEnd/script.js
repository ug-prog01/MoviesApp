//TMDB API Usage
const API_KEY = 'api_key=2e65e5f5c5ba081b6ec96ea651bafe73';
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = BASE_URL + '/movie/popular?language=en-US&page=1&' +API_KEY;
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const SEARCH_URL = BASE_URL + '/search/movie?' + API_KEY;

const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');
const overlay = document.getElementById('overlay-content');


getMovies(API_URL);

function getMovies(url){
    //fetching data from URL
    //Then getting the data
    fetch(url).then(res=>res.json()).then(data => {
        showMovies(data.results);
        // console.log(data.results);
    })
}

function showMovies(data){
    main.innerHTML = ('');
    data.forEach(movie => {
        const {title, poster_path, vote_average, overview, id} = movie;
        const movieElement = document.createElement('div');
        movieElement.classList.add('movie');

        movieElement.innerHTML = `
        <img src="${IMG_URL + poster_path}" alt="${title}">

        <div class ="movieInfo">
            <h3>${title}</h3>
            <span class="${getcolor(vote_average)}">${vote_average}</span>
        </div>
        <div class ="movieOverview">
            <h3>Overview</h3>
            ${overview}
            <br/>
            <button class = "trailer" id = ${id}> Trailer </button>
        </div>`

        main.appendChild(movieElement);
        document.getElementById(id).addEventListener('click', () =>{
            console.log(id);
            openNav(movie);
        })
    });
}
/* Open when someone clicks on the span element */
function openNav(movie) {
    let movie_Id = movie.id;
    fetch(BASE_URL + '/movie/' + movie_Id + '/videos?' + API_KEY).then(res => res.json())
    .then(videoData =>{
        console.log(videoData);
        if(videoData){
            document.getElementById("myNav").style.width = "100%";

            if(videoData.results.length>0){
                let embed = [];
                videoData.results.forEach(video => {
                    let {name, key, site} = video;

                    if(site == 'YouTube'){
                    embed.push(`
                    <iframe width="560" height="315" src="https://www.youtube.com/embed/${key}"
                     title="${name}" class = "embed" frameborder="0" allow="accelerometer; autoplay;
                     clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                    `)
                    }
                })
                overlay.innerHTML = embed.join('');
            }
            else{
                overlay.innerHTML = `<h1>No Trailers Found</h1>`;
            }
        }
        
    })
  }
  
  /* Close when someone clicks on the "x" symbol inside the overlay */
  function closeNav() {
    document.getElementById("myNav").style.width = "0%";
  }

function getcolor(vote){
    if(vote >= 8){
        return 'promoter';
    }
    if(vote >= 6){
        return 'moderate';
    }
    else{
        return 'poor';
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const searchTerm = search.value;

    if(searchTerm){
        getMovies(SEARCH_URL + '&query=' + searchTerm)
    }
    else{
        // WIll let me come back to home if search empty
        getMovies(API_URL)
    }
})

