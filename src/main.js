
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

async function getMovies(endpoint, tagName){
   const {data} = await api(endpoint);
   const movies = data.results.slice(0,3);
   const cards = movies.map(movie => {
      const movieUrl = `${URLIMG}/${movie.poster_path}`;
      const movieRaking = movie.vote_average.toFixed(1);
      return templateMovieCard(movieUrl,movieRaking,movie.id);
      
   })
   tagName.innerHTML = cards.join("");
}
 

async function getTredingMoviesPreview () {
   
 await getMovies('trending/movie/day',containerTreding);
 eventClikcByCards(containerTreding);
}




async function getUpcomin () {
   await getMovies('movie/upcoming',containeUpcoming);
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
       console.log("Detalles", movie);
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
        location.hash = `#movie=${cards.childNodes[1].id}`;
     })
   })
}
