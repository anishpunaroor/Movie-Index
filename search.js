// Use TMDB API

const API_KEY = 'api_key=a262fb1998a2c64c05a5d5e7a7635772'; 
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&' + API_KEY;
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const SEARCH_URL = BASE_URL + '/search/movie?' + API_KEY; 

const main = document.getElementById('main'); 
const form = document.getElementById('form'); 
const tags = document.getElementById('tags');

const prev = document.getElementById('prev'); 
const next = document.getElementById('next');
const curr = document.getElementById('current'); 

var selectedGenre = []

var currPage = 1; 
var nextPage = 2; 
var prevPage = 3; 
var lastUrl = ''; 
var totalPages = 100; 

setGenre(); 

// Dynamically initialize each genre tag and choose genre(s). 
function setGenre() {
    tags.innerHTML='';
    genres.forEach(genre => {
        const t = document.createElement('div'); 
        t.classList.add('tag'); 
        t.id = genre.id; 
        t.innerText = genre.name; 
        t.addEventListener('click', () => {
            if (selectedGenre.length == 0) {
                selectedGenre.push(genre.id); 
            } else {
                if (selectedGenre.includes(genre.id)) {
                    selectedGenre.forEach((id, index) => {
                        if (id == genre.id) {
                            selectedGenre.splice(index, 1); 
                        }
                    })
                } else {
                    selectedGenre.push(genre.id); 
                }
            }
        })
        tags.append(t); 
    })
}

getMovies(API_URL);

// Use TMDB API to send request for movie data. 
function getMovies(url) {
    lastUrl = url;
    fetch(url).then(res => res.json()).then(data => {
        console.log(data.results); 
        if (data.results.length !== 0) {
            showMovies(data.results);
            currPage = data.page; 
            nextPage = currPage + 1; 
            prevPage = currPage - 1;
            totalPages = data.total_pages; 
            
                      
            current.innerText = currPage; 
            // Toggle page navigation options. 
            if (currPage <= 1) {
                prev.classList.add('disabled');
                next.classList.remove('disabled')
            } else if (currPage >= totalPages) {
                prev.classList.remove('disabled'); 
                next.classList.add('disabled')
            } else {
                prev.classList.remove('disabled');
                next.classList.remove('disabled') 
            }
            search.scrollIntoView({behavior : 'smooth'})
            
        } else {
            main.innerHTML = `<h1 class="no-results"> No Results Found </h1>`
        }
    })
}

// Display movie information as an HTML element for the website. 
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

// Determine the color that the vote average should be displayed in. 
function getColor(vote) {
    if (vote >= 8.0) {
        return 'green'
    } else if (vote >= 5) {
        return 'orange'
    } else {
        return 'red'
    }
}

// Link search form to movie API.
form.addEventListener('submit', (e) => {
    e.preventDefault(); 

    const searchTerm = search.value; 

    if(searchTerm) {
        getMovies(SEARCH_URL + '&query=' + searchTerm)
    } else {
        getMovies(API_URL); 
    }
})

// Go to previous page when clicked.
prev.addEventListener('click', () => {
    if (prevPage > 0) {
        pageCall(prevPage);
    }
})

// Go to next page when clicked.
next.addEventListener('click', () => {
    if (nextPage <= totalPages) {
        pageCall(nextPage);
    }
})

// Go to specified page by querying and modifying url. 
function pageCall(page) {
    let urlSplit = lastUrl.split('?'); 
    let queryParams = urlSplit[1].split('&');
    let key = queryParams[queryParams.length-1].split('='); 
    if (key[0] != 'page') {
        let url = lastUrl + "&page=" + page
        getMovies(url); 
    } else {
        key[1] = page.toString(); 
        let a = key.join('='); 
        queryParams[queryParams.length-1] = a; 
        let b = queryParams.join('&'); 
        let url = urlSplit[0] + '?' + b
        getMovies(url); 
    }
}
