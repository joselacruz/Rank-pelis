const containerPelisUpcoming = document.querySelector(
  ".pelis-container-gratis"
);

const containerPelisTreding = document.querySelector(
  ".pelis-container-tendencias"
);
const containerFavorites = document.querySelector('.pelis-container-favorites');
const containerPelisFavorites = document.querySelector('.pelis-container-favorites .flex-card-pelis ');
const alternativeContainer = document.querySelector(".alternative-container");
const alternativeContainerPelis = document.querySelector(
  ".alternative-container .flex-card-pelis"
);
const iconSearch = document.querySelector("#iconSearch");
const iconHome = document.querySelector("#iconHome");
const header = document.querySelector(".category-container");
const alternativeContainerTitle = document.querySelector(
  "#alternative-container-title"
);
const inputSearch = document.querySelector("#input-search");
const logoBack = document.querySelector(".alternative-container-logo");
const nav = document.querySelector(`.header`);
const movieDetail = document.querySelector(".movie-details");
const main = document.querySelector(".main");
const movieViewContainer = document.querySelector(".movie-details");
const movieBackIcon = document.querySelector(".movie-details-icon");
const movieSection1 = document.querySelector(".movie");
const movieContainerSimilar = document.querySelector(
  ".movie-container-similar .flex-card-pelis"
);
const btnViewMoreUpcoming = document.querySelector("#view-more-upcoming");
const btnViewMoreTrends = document.querySelector("#view-more-tendencias");
const btnObtainVideo = document.querySelector(".movie-stream-title");
const movieStreamContainer = document.querySelector(".movie-stream-container");
const titleSimilarMovies = document.querySelector(".movie-container-similar").querySelectorAll("h3")[0];


header.classList.add("inactive");

const selectLanguage = document.querySelector("#languages");
const languageContainer = document.querySelector('.language-container');
const languageCurrent = languageContainer.querySelectorAll("span");
const flagLanguage = document.querySelector("#flag");