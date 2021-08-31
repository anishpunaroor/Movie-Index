// Use TMDB API

const API_KEY = 'api_key=a262fb1998a2c64c05a5d5e7a7635772'; 
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&' + API_KEY;

getMovies(API_URL);

// Use API_URL to send request for data 
function getMovies(url) {

    fetch(url).then(res => res.json()).then(data => {
        showMovies(data.results); 
    })
}

// Display movie information as an HTML element for websote
function showMovies(data) {

    data.forEach(movie => {
        const movieObj = document.createElement('div'); 
        movieObj.classList.add('movie'); 
    })
}
