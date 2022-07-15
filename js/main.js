const API_URL = "https://api.themoviedb.org"; //la constante sera usada para no tener que copiar toda la url
const API_KEY = "fb37a91f7fb50c5584d5639d85e54b67"; //**This is personal**

document.addEventListener("DOMContentLoaded", () => { //cuando la pagina este cargada llamara a las siguientes funciones:
    showPelisNuevas();
    showPelisEnLista('popular', 'now-playing__list');
    showPelisEnLista('top_rated', 'top-rated-playing__list');
})

const obtenerPelis = (type) => { 
    const url = `${API_URL}/3/movie/${type}?api_key=${API_KEY}&language=es-ES&page=1`; //sustituyo la URL y la API KEY

    return fetch(url) //peticion con fetch
        .then(response => response.json()) //transformamos la respuesta en json para que se lea
        .then(result => result.results) //el resultado seran las peliculas
        .catch(error => console.log(error)) //se mostrara cualquier error
}

const showPelisNuevas = async () => { //con esto renderizamos los componentes
    const newMovies = await obtenerPelis('now_playing'); //Hago la peticion de las peliculas

    let html = ''; //Aqui se formara el html

    newMovies.forEach((movie, index) => { //voy a recorrer peli por peli
        const { id, title, overview, backdrop_path} = movie; //con destructuring extraigo el contenido que necesito del objeto
        const urlImage = `https://image.tmdb.org/t/p/original${backdrop_path}`;
        const urlMovie = `../pages/movie.html?id=${id}`;
    

        //Agrego el primer poster movie desde JS para  que este actualizado, ya que sera estatico
        html += ` 
            <div class="carousel-item  ${index === 0 ? "active" : null}" data-bs-interval="4000" style="background-image: url('${urlImage}')">
                <div class="carousel-caption">
                  <h5>${title}</h5>
                   <p>${overview}</p>
                   <a href="${urlMovie}" class="btn btn-dark">Ver mas</a>
                </div>
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#carousel-news-movies"  data-bs-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carousel-news-movies"  data-bs-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
        `;
    });

    document.getElementsByClassName('list-news-movies')[0].innerHTML = html;

}

const showPelisEnLista = async (type, classLoc) => {
    const movies = await obtenerPelis(type);

    let html = "";
    movies.forEach((movie, index) => {
        const { id, title, poster_path} = movie; //Selecciono los parametros que quiero mostrar, en la web de movieDB estan para elegir
        const movieCover = `https://image.tmdb.org/t/p/w500${poster_path}`; //puedo ajustar el tamaño de imagen desde aqui, pero sera pequeña
        const urlMovie = `../pages/movie.html?id=${id}`; //esta constante permite que a traves de la url se acceda al link de la peli elegida solo se cambia el id
        

        if (index < 3) { //Pido el top 3 de las mejores peliculas, mientras index sea menor a 3 las agrego al html
            html += `
                <li class="list-group-item">
                    <img src="${movieCover}" alt="${title}">
                    <a href="${urlMovie}"><h5>${title}</h5></a> 
                </li>
            `;
        }
        document.getElementsByClassName(classLoc)[0].innerHTML = html;
    })

}
