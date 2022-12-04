
 selectLanguage.addEventListener("click", lang);
languageCurrent[0].innerHTML = idioma?.language.toUpperCase();
flag.src= idioma?.flag;

function lang (e) {

idioma = e.target.getAttribute("value");


if(idioma == "en") {
  localStorage.setItem('idiomaSelect',JSON.stringify({"language": idioma, "flag": "src/img/American-Flag-Fractal.svg"}))
  location.reload();

}
else if(idioma == "es")
{
    localStorage.setItem('idiomaSelect',JSON.stringify({"language": idioma, "flag": "src/img/flag-spain.svg"}))
    location.reload();
   
}

else if(idioma == "fr")
{
    localStorage.setItem('idiomaSelect',JSON.stringify({"language": idioma, "flag": "src/img/frenchflag.svg"}))
    location.reload();
 
}

 }
 

const titlesHeader = nav.querySelector('.header-nav');

if(idioma?.language == "en") {
  //Home
  titlesHeader.children[0].children[1].textContent = "Home";
  titlesHeader.children[1].children[1].textContent = "Categories";
  inputSearch.placeholder = "Search Movie";
  containerPelisTreding.querySelectorAll("h2")[0].textContent = "Trends";
  containerPelisTreding.querySelectorAll("button")[0].textContent = "View more";
  containerPelisUpcoming.querySelectorAll("h2")[0].textContent = "Coming soon";
  containerPelisUpcoming.querySelectorAll("button")[0].textContent = "View More";
  containerFavorites.querySelectorAll("h2")[0].textContent = "Favorites";
 


  btnObtainVideo.textContent = "Watch Now";
  titleSimilarMovies.textContent = "Similar Movies";
  }
  else if (idioma?.language == "fr") {
  //Home
  titlesHeader.children[0].children[1].textContent = "Maison";
  titlesHeader.children[1].children[1].textContent = "Catégories";
  titlesHeader.children[2].children[1].textContent = "série";
  inputSearch.placeholder = "Rechercher Film";
  containerPelisTreding.querySelectorAll("h2")[0].textContent = "Les tendances";
  containerPelisTreding.querySelectorAll("button")[0].textContent = "Voir plus";
  containerPelisUpcoming.querySelectorAll("h2")[0].textContent = "Bientôt disponible";
  containerPelisUpcoming.querySelectorAll("button")[0].textContent = "Voir plus";
  containerFavorites.querySelectorAll("h2")[0].textContent = "Favoris";

  btnObtainVideo.textContent = "Regarde maintenant";
  titleSimilarMovies.textContent = "Films similaires";
  console.log( alternativeContainerTitle);
  }




  //para tildes
  var normalize = (function() {
    var from = "ÃÀÁÄÂÈÉËÊÌÍÏÎÒÓÖÔÙÚÜÛãàáäâèéëêìíïîòóöôùúüûÑñÇç", 
        to   = "AAAAAEEEEIIIIOOOOUUUUaaaaaeeeeiiiioooouuuunncc",
        mapping = {};
   
    for(var i = 0, j = from.length; i < j; i++ )
        mapping[ from.charAt( i ) ] = to.charAt( i );
   
    return function( str ) {
        var ret = [];
        for( var i = 0, j = str.length; i < j; i++ ) {
            var c = str.charAt( i );
            if( mapping.hasOwnProperty( str.charAt( i ) ) )
                ret.push( mapping[ c ] );
            else
                ret.push( c );
        }      
        return ret.join( '' );
    }
   
  })();