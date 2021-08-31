// Use TMDB API

const API_KEY = 'api_key=a262fb1998a2c64c05a5d5e7a7635772'; 
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&' + API_KEY;
const IMG_URL = 'https://image.tmdb.org/t/p/w500';

const main = document.getElementById('main'); 

getMovies(API_URL);

// Use API_URL to send request for data 
function getMovies(url) {

    fetch(url).then(res => res.json()).then(data => {
        showMovies(data.results); 
    })
}

// Display movie information as an HTML element for website
function showMovies(data) {
    main.innerHTML = ''; 
    
    data.forEach(movie => {
        const {title, poster_path, vote_average, overview} = movie; 
        const movieObj = document.createElement('div'); 
        movieObj.classList.add('movie'); 
        movieObj.innerHTML = `
            <img src="${IMG_URL+poster_path}" alt="${title}">

            <div class="movie-info">
                <h3> ${title} </h3>
                <span class ="${getColor(vote_average)}"> ${vote_average} </span>
            </div>

            <div class = "overview">
                <h3> Plot </h3>
                ${overview}
            </div>      
        `
        main.appendChild(movieObj); 
    })
}

// Determine the color that the vote average should be displayed in
function getColor(vote) {
    if (vote >= 8.0) {
        return 'green'
    } else if (vote >= 5) {
        return 'orange'
    } else {
        return 'red'
    }
}
