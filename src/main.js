const api = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  headers: {
    "Content-Type": "application/json;charset=utf-8",
  },
  params: {
    api_key: API_KEY,
  },
});

//Utils

const lazyLoader = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const url = entry.target.getAttribute("data-img");
      entry.target.setAttribute("src", url);
    }
  });
});

const URLIMG = "https://image.tmdb.org/t/p/w500";
const containerTreding = document.querySelector(
  ".pelis-container-tendencias .flex-card-pelis"
);
const containeUpcoming = document.querySelector(
  ".pelis-container-gratis .flex-card-pelis"
);
const categoryicon = document.querySelector("#category-icon");
const categoryContainer = document.querySelector(".category-container");
const templateMovieCard = (imgUrl, raking, id) => {
  return `<article class="pelis-card ">
<img data-img="${imgUrl}" alt="" id ="${id}">
<div class="pelis-card-raking">
    <span></span>
    <p>${raking}</p>
</div>
</article> `;
};

async function getMovies(endpoint, tagName, nr) {
  const { data } = await api(endpoint);
  const movies = data.results.slice(0, nr);
  const cards = movies.map((movie) => {
    const movieUrl = `${URLIMG}/${movie.poster_path}`;
    const movieRaking = movie.vote_average.toFixed(1);
    return templateMovieCard(movieUrl, movieRaking, movie.id);
  });
  tagName.innerHTML = cards.join("");
  addLazyloader(tagName);
}

async function getTredingMoviesPreview(nr) {
  await getMovies("trending/movie/day", containerTreding, nr);
  await eventClikcByCards(containerTreding);
}

async function getUpcomin(nr) {
  await getMovies("movie/upcoming", containeUpcoming, nr);
  await eventClikcByCards(containeUpcoming);
}

async function getCategorys() {
  const { data } = await api(`genre/movie/list`);
  const categorias = data.genres;
  const listCategory = categorias.map((categorys) => {
    return `<li id = "${categorys.id}">${categorys.name} </li>`;
  });
  categoryContainer.innerHTML = listCategory.join("");
  const eventCategorys = header.querySelectorAll("li");
  eventCategorys.forEach((li) => {
    li.addEventListener("click", (event) => {
      location.hash = `#category=${li.id}-${li.textContent}`;
      categoryContainer.classList.add("inactive");
    });
  });
}

categoryicon.addEventListener("click", () => {
  categoryContainer.classList.toggle("inactive");
});

async function getMoviesByCategory(id, name) {
  const { data } = await api("/discover/movie?with_genres=", {
    params: { with_genres: id },
  });
  const movies = data.results;
  const cards = obtain(movies);
  alternativeContainerTitle.textContent = name;
  alternativeContainerPelis.innerHTML = cards.join("");
  eventClikcByCards(alternativeContainerPelis);
  addLazyloader(alternativeContainerPelis);
}

async function getMoviesBySearch(query, titleSearch) {
  const { data } = await api("search/movie", {
    params: { query },
  });
  const movies = data.results;
  const cards = obtain(movies);
  alternativeContainerTitle.textContent = titleSearch;
  alternativeContainerPelis.innerHTML = cards.join("");
  eventClikcByCards(alternativeContainer);
  addLazyloader(alternativeContainer);
}

async function getMovieById(id) {
  const { data: movie } = await api(`movie/${id}`);
  const title = movie.title;
  const movieImg = `${URLIMG}/${movie.poster_path}`;
  const movieImgBig = `https://image.tmdb.org/t/p/original/${movie.backdrop_path}`;
  const year = movie.release_date.split("-")[0];
  let genres = `${movie.genres[0].name}`;

  if (movie.genres.length > 1) {
    genres = `${movie.genres[0].name} / ${movie.genres[1].name}`;
  }
  const rank = movie.vote_average.toFixed(1);
  const sipnosis = movie.overview;

  const templateViewMovie = `  <div class ="movie-img-container">
       <img src="${movieImg}" alt="imagen de la pelicula ${title} class ="movie-img">
   <img src="${movieImgBig}" alt="imagen de la pelicula ${title}" id ="movie-poster">
   </div>
   <div class="movie-container-info">

       <h2>${title} (${year})</h2>
       <h3>${genres}</h3>
       <div class="movie-container-info-rank">
           <span class="movie-logo-rank"> </span>
           <span class="movie-value-rank">${rank}</span>
       </div>
       <p class="movie-sipnosis">${sipnosis}</p>`;
  movieSection1.innerHTML = templateViewMovie;
  getSimiliarsbyId(id);
}

async function getSimiliarsbyId(id) {
  const { data } = await api(`movie/${id}/similar`);
  const result = data.results;
  const similarMovies = obtain(result);

  movieContainerSimilar.innerHTML = similarMovies.join("");
  eventClikcByCards(movieContainerSimilar);
  addLazyloader(movieContainerSimilar);
}

async function getVideoProviders(id) {
  const { data } = await api(`movie/${id}/watch/providers`);
  const movieProviders = data.results.VE || false;
  const movieStream = movieProviders?.flatrate || false;
  const movieBuy = movieProviders?.buy || false;
  const movieAds = movieProviders?.ads || false;
  const movieRent = movieProviders?.rent || false;
  const movieLink = movieProviders?.link || false;

  if (movieProviders) {
    htmlWrite(movieAds, "Gratis con anuncios");
    htmlWrite(movieStream, "Stream");
    htmlWrite(movieBuy, "Comprar");
    htmlWrite(movieRent, "Alquilar");
  } else {
    movieStreamContainer.innerHTML =
      '<h3 style="padding-top:40px;padding-bottom: 30px;color:#ff5722">No hay Fuentes de videos disponibles</h3>';
  }

  function htmlWrite(obj, title) {
    if (obj) {
      movieStreamContainer.innerHTML += `<h3>${title}</h3>`;
      obj.map((item) => {
        movieStreamContainer.innerHTML += `
            <figure>
                <img src="https://image.tmdb.org/t/p/w300/${item.logo_path}" alt="logo de">
            </figure>`;
      });
    }
    const eventMovieIconProviders =
      movieStreamContainer.querySelectorAll("img");
    eventMovieIconProviders.forEach((provider) => {
      provider.addEventListener("click", () => {
        const [url, _] = movieLink.split("?");
        window.open(url);
      });
    });
  }
}
function obtain(result) {
  return result.map((movie) => {
    const movieUrl = `${URLIMG}/${movie.poster_path}`;
    const movieRaking = movie.vote_average.toFixed(1);
    return templateMovieCard(movieUrl, movieRaking, movie.id);
  });
}

function eventClikcByCards(tagName) {
  const eventCards = tagName.querySelectorAll("article");
  return eventCards.forEach((cards) => {
    cards.addEventListener("click", () => {
      location.hash = `#movie=${cards.childNodes[1].id}`;
      movieStreamContainer.innerHTML = "";
    });
  });
}

function addLazyloader(tagName) {
  const contenedor = tagName.querySelectorAll("article");
  return contenedor.forEach((cards) => {
    const obtainImg = cards.childNodes[1];
    lazyLoader.observe(obtainImg);
    console.log(obtainImg);
  });
}
