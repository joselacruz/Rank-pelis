window.addEventListener('DOMContentLoaded', navigator,false);
window.addEventListener('hashchange', navigator,false);
logoBack.addEventListener("click", clickLogoBack)

function navigator () {
    console.log({location});
    if(location.hash.startsWith('#home')) {
      homePage();
      getTredingMoviesPreview(6);
      getUpcomin(6);
     
    }
    else if (location.hash.startsWith('#search=')) {
     searchPage();

    }
    else if (location.hash.startsWith('#movie=')) {
        moviePage();
    }
    else if (location.hash.startsWith('#category=')) {
        categoryPage();
    }
    else {
        homePage();
        getUpcomin();
        getTredingMoviesPreview();
    }
  
    window.scroll(0,0)
    getCategorys();
}

 function homePage() {
    containerPelisUpcoming.classList.remove('inactive');
    containerPelisTreding.classList.remove('inactive');
    alternativeContainer.classList.add('inactive');
    movieDetail.classList.add('inactive');
    nav.classList.remove('header-mobile');   
    main.classList.remove('main-mobile');
}

function searchPage() {
   
    alternativeContainer.classList.remove('inactive');
    containerPelisUpcoming.classList.add('inactive');
    containerPelisTreding.classList.add('inactive');
    movieDetail.classList.add('inactive');
    nav.classList.remove('header-mobile');
    main.classList.remove('main-mobile');

   const [_, query] = location.hash.split('=');
   logoBack.classList.remove('inactive');
   getMoviesBySearch(query, `Resultados para: ${query}`);
   function clickLogoBack () {
    console.log("no");
   }
console.log("Por FUERA"); 
}

function moviePage() {
movieViewContainer.classList.remove('inactive');
alternativeContainer.classList.add('inactive');
containerPelisUpcoming.classList.add('inactive');
containerPelisTreding.classList.add('inactive');
main.classList.add('main-mobile');
nav.classList.add('header-mobile');

const [_, movieId] = location.hash.split('=');
getMovieById(movieId);


}

function categoryPage() {
   
    alternativeContainer.classList.remove('inactive');
    containerPelisUpcoming.classList.add('inactive');
    containerPelisTreding.classList.add('inactive');
    movieDetail.classList.add('inactive');
    nav.classList.remove('header-mobile');
    main.classList.remove('main-mobile');

   const [_, categoryDAta] =  location.hash.split('=');
   const [categoryId, categoryName] = categoryDAta.split('-'); 
   const nameCategoryFinal = categoryName.split("%20").join(" ");
    getMoviesByCategory(categoryId,nameCategoryFinal);
    
}


iconHome.addEventListener("click", () => {
    location.hash = "#home";
 });

 iconSearch.addEventListener("click",clikSearch);

 function clikSearch () {
    if(inputSearch.value == "") {
        alert("Nada que Buscar");
     }
     else{
        location.hash = `#search=${inputSearch.value}`
     }
     
 }


   
function clickLogoBack() {
    history.back();
 }
//  var mediaqueryList = window.matchMedia("(max-width: 700px)");
//  mediaqueryList.addListener( function(EventoMediaQueryList) {
//       console.log("se ejecuta")
//  });

 movieBackIcon.addEventListener("click", () => {
    history.back();
}); 

btnViewMoreUpcoming.addEventListener("click",  async () => {

   
    
    if(btnViewMoreUpcoming.textContent == 'ver mas') {
        await getUpcomin(20);
        btnViewMoreUpcoming.textContent = 'ver menos';
        window.scroll(0,300);
       }
       else{
        getUpcomin(6);
        btnViewMoreUpcoming.textContent = 'ver mas';
       }
});

btnViewMoreTrends.addEventListener("click", () => {
   if(btnViewMoreTrends.textContent == 'ver mas') {
    getTredingMoviesPreview(20);
    btnViewMoreTrends.textContent = 'ver menos';
   }
   else{
    getTredingMoviesPreview(6);
    btnViewMoreTrends.textContent = 'ver mas';
   }

});