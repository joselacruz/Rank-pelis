let page = 1;
let maxPage;
let infinityScroll;

window.addEventListener("DOMContentLoaded", navigator, false);
window.addEventListener("hashchange", navigator, false);
window.addEventListener("scroll", infinityScroll, { passive: false });
logoBack.addEventListener("click", clickLogoBack);

function navigator() {
  if (infinityScroll) {
    window.removeEventListener("scroll", infinityScroll);
    infinityScroll = undefined;
  }
  console.log({ location });
  if (location.hash.startsWith("#home")) {
    homePage();
  } else if (location.hash.startsWith("#search=")) {
    searchPage();
  } else if (location.hash.startsWith("#movie=")) {
    moviePage();
  } else if (location.hash.startsWith("#category=")) {
    categoryPage();
  } else {
    homePage();
  }

  window.scroll(0, 0);
  getCategorys();

  if (infinityScroll) {
    window.addEventListener("scroll", infinityScroll, { passive: false });
    infinityScroll = undefined;
  }
}

function homePage() {
  containerPelisUpcoming.classList.remove("inactive");
  containerPelisTreding.classList.remove("inactive");
  alternativeContainer.classList.add("inactive");
  movieDetail.classList.add("inactive");
  nav.classList.remove("header-mobile");
  main.classList.remove("main-mobile");
  containerFavorites.classList.remove("inactive");
  getTredingMoviesPreview(6);
  getUpcomin(6);
  getFavoriteMovie();
}

function searchPage() {
  alternativeContainer.classList.remove("inactive");
  containerPelisUpcoming.classList.add("inactive");
  containerPelisTreding.classList.add("inactive");
  movieDetail.classList.add("inactive");
  nav.classList.remove("header-mobile");
  main.classList.remove("main-mobile");
  containerFavorites.classList.add("inactive");

  const [_, query] = location.hash.split("=");
  logoBack.classList.remove("inactive");

  switch(idioma.language) {
    case "es":
    getMoviesBySearch(query, `Resultados para: ${query.replaceAll("/", " ")}`);
    break;
    case "en":
      getMoviesBySearch(query, `Results for: ${query.replaceAll("/", " ")}`);
      break;
    case "fr":
    getMoviesBySearch(query, `Résultats pour: ${query.replaceAll("/", " ")}`);
    break;
  }
  infinityScroll = viewInfinityResults(
    "search/movie",{query}
  );
}

function moviePage() {
  movieViewContainer.classList.remove("inactive");
  alternativeContainer.classList.add("inactive");
  containerPelisUpcoming.classList.add("inactive");
  containerPelisTreding.classList.add("inactive");
  main.classList.add("main-mobile");
  nav.classList.add("header-mobile");
  containerFavorites.classList.add("inactive");
  const [_, movieId] = location.hash.split("=");
  getMovieById(movieId);
}

function categoryPage() {
  containerPelisUpcoming.classList.add("inactive");
  containerPelisTreding.classList.add("inactive");
  alternativeContainer.classList.remove("inactive");
  movieDetail.classList.add("inactive");
  nav.classList.remove("header-mobile");
  main.classList.remove("main-mobile");
  logoBack.classList.remove("inactive");
  containerFavorites.classList.add("inactive");
  

  const [_, categoryDAta] = location.hash.split("=");
  const [categoryId, categoryName] = categoryDAta.split("-");
  const nameCategoryFinal = categoryName.split("%20").join(" ");
  getMoviesByCategory(categoryId, nameCategoryFinal);


  infinityScroll = viewInfinityResults(
    "/discover/movie?with_genres=",
    { with_genres: categoryId },
    categoryId
  );
}


iconHome.addEventListener("click", () => {
  location.hash = "#home";
});

iconSearch.addEventListener("click", clikSearch);

function clikSearch() {
  if (inputSearch.value == "") {
    alert("Nada que Buscar");
  } else {
    location.hash = `#search=${inputSearch.value.replaceAll(" ", "/")}`;
    location.reload();
  }
}
inputSearch.addEventListener("keyup", (event) => {
  if (event.keyCode == 13) {
    clikSearch();
  }
});


function clickLogoBack() {
  history.back();
}

movieBackIcon.addEventListener("click", () => {
  history.back();
});

btnViewMoreUpcoming.addEventListener("click", async () => {
  if (btnViewMoreUpcoming.textContent == "ver mas") {
    await getUpcomin(20);
    btnViewMoreUpcoming.textContent = "ver menos";
  } else {
    getUpcomin(6);
    btnViewMoreUpcoming.textContent = "ver mas";
  }
});

btnViewMoreTrends.addEventListener("click", () => {
  if (btnViewMoreTrends.textContent == "ver mas") {
    getTredingMoviesPreview(20);
    btnViewMoreTrends.textContent = "ver menos";
  } else {
    getTredingMoviesPreview(6);
    btnViewMoreTrends.textContent = "ver mas";
  }
});


btnObtainVideo.addEventListener("click", function btn(e) {
  const [_, movieId] = location.hash.split("=");
  getVideoProviders(movieId);
  movieStreamContainer.innerHTML = "";
});



//al hacer scroll cambiamos el opacity al head NO;
// window.onscroll = function (){
//     // Obtenemos la posicion del scroll en pantall
//     var scroll = document.documentElement.scrollTop || document.body.scrollTop;

//     // Realizamos alguna accion cuando el scroll este entre la posicion 300 y 400
//     if(scroll > 30 ){
//         console.log("Pasaste la posicion 300 del scroll");
//         nav.style.opacity = "0.8";
//     }
//     else{
//         nav.style.opacity = "1";
//     }
// }
//  var mediaqueryList = window.matchMedia("(max-width: 700px)");
//  mediaqueryList.addListener( function(EventoMediaQueryList) {
//       console.log("se ejecuta")
//  });
