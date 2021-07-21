//API declaration
const APIkey ='api_key=2d3a7f07b5e0c3387e92eb8fb2497ad3';
const base = 'https://api.themoviedb.org/3';
const APIurl = base + '/discover/movie?sort_by=popularity.desc&'+APIkey;
const image = 'https://image.tmdb.org/t/p/w500';
const searchURL = base + '/search/movie?'+APIkey;
//const searchYear = base + '/discover/movie?primary_release_year=2010&sort_by=vote_average.desc&'+APIkey;


const main = document.getElementById('main');
const search = document.getElementById('search');
const form = document.getElementById('form');
 

//pagination
const prev = document.getElementById('prev');
const current = document.getElementById('current');
const next = document.getElementById('next');

var currentPage = 1;
var prevPage = 3;
var nextPage = 2;
var lastURL = '';
var totalPages = 200;
 

getMovies(APIurl);


 //get movies from tmdb
 function getMovies(url){
    lastURL = url;
      fetch(url).then(res => res.json()).then(data => {
    
        //save to localstorage
        localStorage.setItem('localData', JSON.stringify(data.results));
        let fromLocal = JSON.parse(localStorage.getItem("localData"));
     
       
       if (fromLocal.length !== 0) {
         show(fromLocal);
         currentPage = data.page;
         nextPage = currentPage +1;
         prevPage = currentPage -1;
         totalPages = data.total_pages;
         
         current.innerText = currentPage;
         //disable options for bottom nav
         if (currentPage <=1){
            prev.classList.add('disable');
            next.classList.remove('disable');
          }else if (currentPage>=totalPages){
            prev.classList.remove('disable');
            next.classList.add('disable');
          }else{
            prev.classList.remove('disable');
            next.classList.remove('disable');
          }
        //move to the top of the screen
          form.scrollIntoView({behavior: 'smooth'})
      //no results message
    }else {
       main.innerHTML = `<h1 class="noResults">No results found</h1>` 
         }
    })
    
   }


//show all movies
function show(data){
   main.innerHTML='';

   //loop through all the movies and create movie card
   data.forEach(movie =>{
       const {title, poster_path, vote_average, overview} = movie;
       const movieCard = document.createElement('div');
       movieCard.classList.add('movie');
     
     //  movieCard.
       movieCard.innerHTML=`      
            <img src="${image+poster_path}" alt="${title}">        
       <div class="movieDetails">
           <h3 class="title"> </h3>
           <span class="${color(vote_average)}">${vote_average}</span>
       </div>
       <div class="overview"><h3>Plot</h3>
               ${overview}
       </div>     
       `
       
       //add to movieCard
       main.appendChild(movieCard);
    })
 
    
}
 
//color for rating
function color(vote_average){
    if (vote_average >= 8){
        return 'green'
    } else if (vote_average >=6){
        return 'orange'
    } else {
        return 'red'
    }
}

//search movie
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const searchMovie = search.value;
 // localStorage.setItem('searchHistory', JSON.stringify(searchMovie));
  if (searchMovie){
      getMovies(searchURL+'&query='+searchMovie);
  }

})
 
//next page
next.addEventListener('click',() => {
    if (nextPage <= totalPages){
      getPage(nextPage);
     }
  })
  
//prev page
prev.addEventListener('click',() => {
    if (prevPage > 0){
      getPage(prevPage);
     }
  })

//get page
function getPage(page){
    let urlSplit = lastURL.split('?');
    let queryParams = urlSplit[1].split('&');
    let key = queryParams[queryParams.length -1].split('=');
    if (key[0] != 'page'){
     let url = lastURL + '&page=' + page;
    getMovies(url);
  }else{
   key[1] = page.toString();
   let a = key.join('=');
   queryParams[queryParams.length -1] = a;
   let b = queryParams.join('&');
   let url = urlSplit[0]+'?'+b;
   getMovies(url);
  }
}
 
 