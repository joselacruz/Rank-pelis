//Data
let idioma = JSON.parse(localStorage.getItem('idiomaSelect'))||{"language": "es","flag": "src/img/flag-spain.svg"};
const api = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  headers: {
    "Content-Type": "application/json;charset=utf-8",
  },
  params: {
    api_key: API_KEY,
    language:idioma?.language,
  },
});


//
function favoritesMoviesList() {
  const item = JSON.parse(localStorage.getItem('favorite_movie'));
  let movies;
  if(item){
    movies = item;
  }
  else {
    movies = {};
  }
  return movies;
};

function favoriteMovie(movie) {

  const favoritesMovies = favoritesMoviesList();
  console.log(favoritesMovies);
  if(favoritesMovies[movie.id]){
  favoritesMovies[movie.id] = undefined;
  }
  else{
    favoritesMovies[movie.id] = movie;
  }
  const rx = localStorage.setItem('favorite_movie',JSON.stringify(favoritesMovies));

}

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
<button class="btn-movie"> </button>
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
    li.addEventListener("click", async(event) => {
      const categorySelect = normalize (li.textContent);
      location.hash = `#category=${li.id}-${categorySelect}`;
      categoryContainer.classList.add("inactive");
      await location.reload();
      page = await page - page;
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
  maxPage = data.total_pages;
  const movies = data.results;
  const cards = obtain(movies);
  alternativeContainerTitle.textContent = name;
   alternativeContainerPelis.innerHTML =  cards.join("");
  eventClikcByCards(alternativeContainerPelis);
  addLazyloader(alternativeContainerPelis);
  console.log(name);
 
}

async function getMoviesBySearch(query, titleSearch) {

  const { data } = await api("search/movie", {
    params: { query },
  });
  maxPage = data.total_pages;
  const movies = data.results;
  const cards = obtain(movies);
  alternativeContainerTitle.textContent = titleSearch;
  alternativeContainerPelis.innerHTML = cards.join("");
  eventClikcByCards(alternativeContainer);
  addLazyloader(alternativeContainer);
  imgError(alternativeContainer);
}

async function getMovieById(id) {
  const { data: movie } = await api(`movie/${id}`);
  console.log(movie,"movies");
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
   switch(idioma?.language){
    case "es":
      htmlWrite(movieAds, "Gratis con anuncios");
      htmlWrite(movieStream, "Stream");
      htmlWrite(movieBuy, "Comprar");
      htmlWrite(movieRent, "Alquilar");
      break;
      case "en":
        htmlWrite(movieAds, "Free with ads");
        htmlWrite(movieStream, "streaming");
        htmlWrite(movieBuy, "Buy");
        htmlWrite(movieRent, "Rent");
      break;
        case "fr":
          htmlWrite(movieAds, "Gratuit avec publicités");
          htmlWrite(movieStream, "Flux");
          htmlWrite(movieBuy, "Acheter");
          htmlWrite(movieRent, "Location");
        break;
   }
  } else {
    switch(idioma?.language){
      case "es":
        movieStreamContainer.innerHTML =
        '<h3 style="padding-top:40px;padding-bottom: 30px;color:#ff5722">No hay Fuentes de videos disponibles</h3>'
      break;

      case "en": 
      movieStreamContainer.innerHTML =
      '<h3 style="padding-top:40px;padding-bottom: 30px;color:#ff5722">No video sources available</h3>';
      break;

      case "fr":
        movieStreamContainer.innerHTML =
        '<h3 style="padding-top:40px;padding-bottom: 30px;color:#ff5722">Aucune source vidéo disponible</h3>';
      break;
     
    }
   

   
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
    let movieUrl = `${URLIMG}/${movie.poster_path}`;
    // if(movie.poster_path === null) {
    //   movieUrl = 'https://t4.ftcdn.net/jpg/05/17/53/57/240_F_517535712_q7f9QC9X6TQxWi6xYZZbMmw5cnLMr279.jpg';
    // }
    const movieRaking = movie.vote_average.toFixed(1);
    return templateMovieCard(movieUrl, movieRaking, movie.id);
  })
 
}

function eventClikcByCards(tagName) {
  
  const eventCards = tagName.querySelectorAll("article");
  return eventCards.forEach((cards) => {
    cards.addEventListener("click", (e) => {
      
      console.log(e.target.tagName);
      if(e.target.tagName === 'IMG') {
      location.hash = `#movie=${cards.childNodes[1].id}`;
      movieStreamContainer.innerHTML = "";}
      else if(e.target.tagName === 'BUTTON') {
        e.target.classList.toggle('btn-movie--liked');
    
        const idimgFavorite = cards.querySelector('img').id*1;
        const urlImgFavorite = cards.querySelector('img').src;
        const  rankImgFavorite = cards.querySelector('p').textContent;
        const obj ={id:idimgFavorite, url: urlImgFavorite, rank:rankImgFavorite};

        favoriteMovie(obj);
        getFavoriteMovie();
      }
    });

    //recordar si ya esta en favorito y conservar la clase del botoncito ❤️ 
    const bt = cards.querySelector('button');
    const id = cards.querySelector('img').id;
    favoritesMoviesList()[id]&&bt.classList.add("btn-movie--liked");
  });
}

function addLazyloader(tagName) {
  const contenedor = tagName.querySelectorAll("article");
  return contenedor.forEach((cards) => {
    const obtainImg = cards.childNodes[1];
    lazyLoader.observe(obtainImg);
  });
}

function imgError(tagName) {
  const contenedor = tagName.querySelectorAll("article");
  return contenedor.forEach((cards) => {
    const obtainImg = cards.childNodes[1];
    obtainImg.addEventListener("error",() => {
      obtainImg.setAttribute('src','https://t4.ftcdn.net/jpg/05/17/53/57/240_F_517535712_q7f9QC9X6TQxWi6xYZZbMmw5cnLMr279.jpg');
    })
  });
}



 function viewInfinityResults (endPoint,param={},id) {
return async function () {
  const {
    scrollTop,
    scrollHeight,
    clientHeight} = document.documentElement;
  
  const scrollIsBottom = (scrollTop + clientHeight) >= (scrollHeight-15);
  const pageIsNotMax = page < maxPage;

  if(scrollIsBottom&&pageIsNotMax) {
    page++;
    const { data } = await api(endPoint, {
      params: {...param, page },
    });
    
    const movies = data.results;
    const cards = obtain(movies);
    alternativeContainerPelis.innerHTML += cards.join("");
    eventClikcByCards(alternativeContainerPelis);
    addLazyloader(alternativeContainerPelis);
    console.log("another page", page,maxPage);
    imgError(alternativeContainer);
    return
  }
}

 
}

function getFavoriteMovie(){
  
  const likedMovies = favoritesMoviesList();
  const moviesArray = Object.values(likedMovies);

  if(moviesArray.length > 0) {
    containerFavorites.classList.remove("inactive");
    const likeds = moviesArray.map((liked) => {
      return templateMovieCard(liked.url, liked.rank, liked.id);
      });
      containerPelisFavorites.innerHTML = likeds;
      addLazyloader(containerPelisFavorites);
      eventClikcByCards(containerPelisFavorites);
  }
  else{
    containerFavorites.classList.add("inactive");
  }
  

}