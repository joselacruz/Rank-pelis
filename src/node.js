const containerPelisUpcoming = document.querySelector(
  ".pelis-container-gratis"
);

const containerPelisTreding = document.querySelector(
  ".pelis-container-tendencias"
);
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

header.classList.add("inactive");
