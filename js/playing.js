const API_URL = "https://api.themoviedb.org";
const API_KEY = "fb37a91f7fb50c5584d5639d85e54b67"; //**This is personal**

document.addEventListener("DOMContentLoaded", () => {
    let { page } = obtenerUrl();
    page == undefined ? page = 1 : null;
    showPelisNuevas(page);
});

const obtenerUrl = () => {  //Podran verse los ultimos lanzamientos al cargar
    let vars = {};
    window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
        vars[key] = value;
    });
    return vars;
}

const obtenerPelisNuevas = (page) => {
    const url = `${API_URL}/3/movie/now_playing?api_key=${API_KEY}&language=es-ES&page=${page}`;

    return fetch(url) //el fetch retorna una promesa
        .then(response => response.json())
        .then(result => result.results)
        .catch(error => console.log(error))
}

const showPelisNuevas = async (page) => { //lo renderizo
    const movies = await obtenerPelisNuevas(page);

    let html = "";
    movies.forEach(movie => { //recorro el array pelicula por pelicula
        const { id, title, poster_path } = movie; //traigo la info que me interesa mostrar
        const urlImage = `https://image.tmdb.org/t/p/w500${poster_path}`;

        const urlMoreInfo = `../pages/movie.html?id=${id}`; //al clickear la peli te dirige al html de movie

        html += `
            <div class="col-sm-12 col-md-4 col-lg-3 col-custom">
                <a href="${urlMoreInfo}" class="card custom-card">
                   <img src="${urlImage}" class="card-img-top" alt="${title}" />
                </a>
            </div>
        `;
    });
    document.getElementsByClassName('list-cards')[0].innerHTML = html;

}
