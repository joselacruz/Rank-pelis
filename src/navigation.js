window.addEventListener('DOMContentLoaded', navigator,false);
window.addEventListener('hashchange', navigator,false);
logoBack.addEventListener("click", clickLogoBack)

function navigator () {
    console.log({location});
    if(location.hash.startsWith('#home')) {
      homePage()
      getUpcomin();
      getTredingMoviesPreview();
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
   

  
  
    
}

function searchPage() {
   
    alternativeContainer.classList.remove('inactive');
    containerPelisUpcoming.classList.add('inactive');
    containerPelisTreding.classList.add('inactive');

   const [_, query] = location.hash.split('=');
   logoBack.classList.remove('inactive');
   getMoviesBySearch(query, `Resultados para: ${query}`);
   function clickLogoBack () {
    console.log("no");
   }
console.log("Por FUERA"); 
}

function moviePage() {
    console.log("Movie!!");
const [_, movieId] = location.hash.split('=');
alternativeContainer.classList.add('inactive');
containerPelisUpcoming.classList.add('inactive');
containerPelisTreding.classList.add('inactive');
console.log(movieId);
getMovieById(movieId);
}
function categoryPage() {
    alternativeContainer.classList.remove('inactive');
    containerPelisUpcoming.classList.add('inactive');
    containerPelisTreding.classList.add('inactive');

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
