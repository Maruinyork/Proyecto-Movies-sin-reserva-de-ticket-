const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=4680afa6426d42dd5e62aac310d2d6fc&language=es&page=1';
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=4680afa6426d42dd5e62aac310d2d6fc&&language=es&query="'; //es igual que la primera url pero cambio discover por search

const main = document.getElementById('main')
const form = document.getElementById('form')
const search = document.getElementById('search')

obtenerPelis(API_URL)

async function obtenerPelis(url){
    const res= await fetch(url)
    const data = await res.json()

    showMovies(data.results) //En la consola se puede ver un array de 20 objetos que son las peliculas, con toda su informacion
}

function showMovies(movies){
    main.innerHTML = ''

    movies.forEach((movie) => {
        const {title, poster_path, vote_average, overview} = movie
        const movieElement = document.createElement('div')
        movieElement.classList.add('movie')
        movieElement.innerHTML = `
        <div class="movie">
            <img src="${IMG_PATH + poster_path}" alt="${title}">
            <div class="movie-info">
                <span class="${getClassByRate(vote_average)}">${vote_average}</span>
            </div>
            <div class="overview">
            <h3>${title}</h3>
           ${overview}
            </div>
       </div>  
        `
        main.appendChild(movieElement)
    })
}

function getClassByRate(vote) {
    if(vote >=8){
        return 'green'
    } else if (vote>=5) {
        return 'orange'
    } else {
        return 'red'
    }
}

form.addEventListener('submit', (e) =>{
    e.preventDefault()

    const searchTerm = search.value

    if(searchTerm && searchTerm !== ''){
        obtenerPelis(SEARCH_API + searchTerm)
        search.value = ''
    } else{
        window.location.reload()
    }
})