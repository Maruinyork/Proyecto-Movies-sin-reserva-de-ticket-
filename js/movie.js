const API_URL = "https://api.themoviedb.org";
const API_KEY = "4680afa6426d42dd5e62aac310d2d6fc";
let MOVIE_ID = "";

document.addEventListener("DOMContentLoaded", () => {
    MOVIE_ID = obtenerUrl().id;
    showDetallePelis(MOVIE_ID);
});

const obtenerUrl = () => {
    let vars = {};
    window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
        vars[key] = value;
    });
    return vars;
}

const obtenerDetallePelis = (movieId) => {
    const url = `${API_URL}/3/movie/${movieId}?api_key=${API_KEY}&language=es-ES`;

    return fetch(url)
        .then(response => response.json())
        .then(result => result)
        .catch(error => console.log(error))
}

const showDetallePelis = async (movieId) => {
    const movieDetails = await obtenerDetallePelis(movieId);
    const { backdrop_path, poster_path, title, overview, genres, release_date } = movieDetails;
    showBackground(backdrop_path);
    showPoster(poster_path, title);
    showDataPelis(title, overview, genres, release_date);
}

const showBackground = (backdrop_path) => {
    const urlBackground = `https://image.tmdb.org/t/p/original${backdrop_path}`;
    document.getElementsByClassName('movie-info')[0].style.backgroundImage = `url('${urlBackground}')`;
}

const showPoster = (poster_path, title) => {
    const urlPoster = `https://image.tmdb.org/t/p/original${poster_path}`;
    const html = `<img src="${urlPoster}" class="img-fluid movie-info__poster-img" alt="${title}" />`;
    document.getElementsByClassName('movie-info__poster')[0].innerHTML = html;
}

const showDataPelis = (title, overview, genres, relese_date) => {
    const dataSplit = relese_date.split('-');

    let htmlGenres = "";
    genres.forEach(genre => {
        htmlGenres += `<li>${genre.name}</li>`;
    })


    const html = `
        <h1>
            ${title}
            <span class="date-any">${dataSplit[0]}</span>
        </h1>
        <h5>General</h5>
        <p>${overview}</p>
        <h5>Generos</h5>
        <ul>
            ${htmlGenres}
        </ul>
    `;
    document.getElementsByClassName('movie-info__data')[0].innerHTML = html;
}
