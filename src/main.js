
const api = axios.create({
   baseURL: 'https://api.themoviedb.org/3/',
   headers: {
      'Content-Type': 'application/json;charset=utf-8',
   },
   params: {
     'api_key': API_KEY,
   },
});

const URLIMG = 'https://image.tmdb.org/t/p/w500';
const containerTreding = document.querySelector('.pelis-container-tendencias .flex-card-pelis');
const containeUpcoming = document.querySelector('.pelis-container-gratis .flex-card-pelis');
const categoryicon = document.querySelector('#category-icon');
const categoryContainer = document.querySelector('.category-container')
const templateMovieCard = (imgUrl,raking,id) => { return `<article class="pelis-card">
<img src="${imgUrl}" alt="" id ="${id}">
<div class="pelis-card-raking">
    <span></span>
    <p>${raking}</p>
</div>
</article> `};

async function getMovies(endpoint, tagName,nr){
   const {data} = await api(endpoint);
   const movies = data.results.slice(0,nr);
   const cards = movies.map(movie => {
      const movieUrl = `${URLIMG}/${movie.poster_path}`;
      const movieRaking = movie.vote_average.toFixed(1);
      return templateMovieCard(movieUrl,movieRaking,movie.id);
      
   })
   tagName.innerHTML = cards.join("");
}
 

async function getTredingMoviesPreview (nr) {
   
 await getMovies('trending/movie/day',containerTreding,nr);
 eventClikcByCards(containerTreding);
}




async function getUpcomin (nr) {
   await getMovies('movie/upcoming',containeUpcoming,nr);
   eventClikcByCards(containeUpcoming);

    }





async function getCategorys() {
    const {data} = await api(`genre/movie/list`);
    const categorias = data.genres;
    const listCategory = categorias.map(categorys => {
      return `<li id = "${categorys.id}">${categorys.name} </li>`
    })
    categoryContainer.innerHTML = listCategory.join("");
    const eventCategorys = header.querySelectorAll('li');
    eventCategorys.forEach(li => {
      li.addEventListener("click", (event) => {
         location.hash = `#category=${li.id}-${li.textContent}`;
         categoryContainer.classList.add('inactive');
      })
    })
   }



   
    categoryicon.addEventListener("click",() =>  {categoryContainer.classList.toggle('inactive');
    
   }
   )
 
   async function getMoviesByCategory (id,name) {

    const {data} = await api('/discover/movie?with_genres=',{
      params:
      {with_genres: id,},
    });
    const movies = data.results;
    const cards = obtain(movies);
    alternativeContainerTitle.textContent = name;
    alternativeContainerPelis.innerHTML = cards.join('');
    eventClikcByCards(alternativeContainerPelis);
   
   }

   
   
 
   async function  getMoviesBySearch (query,titleSearch) {
      const { data} = await api('search/movie',{
         params:
         {query,},
       });
       const movies = data.results;
      const cards = obtain(movies);
      alternativeContainerTitle.textContent = titleSearch;
      alternativeContainerPelis.innerHTML = cards.join('')
      eventClikcByCards(alternativeContainer);
   }

   async function getMovieById (id) {
       const { data: movie} = await api(`movie/${id}`);
       const title = movie.title;
       const movieImg = `${URLIMG}/${movie.poster_path}`;
       const movieImgBig = `https://image.tmdb.org/t/p/original/${movie.backdrop_path}`
       const year = movie.release_date.split('-')[0];
       const genres = `${movie.genres[0].name} / ${ movie.genres[1].name }`;
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
   
       console.log(movie,"movie");

   }

async function getSimiliarsbyId (id){
   const {data} = await api(`movie/${id}/similar`);
   const result = data.results
   const similarMovies = obtain(result)
   console.log(similarMovies);
   movieContainerSimilar.innerHTML += similarMovies.join("");
   eventClikcByCards(movieContainerSimilar);
  
}
   function obtain (result ) {
      return result.map(movie => {
         const movieUrl = `${URLIMG}/${movie.poster_path}`;
         const movieRaking = movie.vote_average.toFixed(1);
         return templateMovieCard(movieUrl,movieRaking,movie.id);
      })
   }

function eventClikcByCards(tagName) {
   const eventCards =  tagName.querySelectorAll('article') 
    return eventCards.forEach(cards => {
     cards.addEventListener("click", () => {
        console.log(cards.childNodes[1].id)
        location.hash = `#movie=${cards.childNodes[1].id}`;
     })
   })
}
