//API declaration
const APIkey ='api_key=2d3a7f07b5e0c3387e92eb8fb2497ad3';
const base = 'https://api.themoviedb.org/3';
const APIurl = base + '/discover/movie?sort_by=popularity.desc&'+APIkey;
const image = 'https://image.tmdb.org/t/p/w500';
const searchURL = base + '/search/movie?'+APIkey;
//const searchYear = base + '/discover/movie?primary_release_year=2010&sort_by=vote_average.desc&'+APIkey;
//const year = document.getElementById('currentYear');

const main = document.getElementById('main');
const search = document.getElementById('search');
const form = document.getElementById('form');

//get data and store in localstorage
/*
const getDataFromLocalStorage = () => {
    const dataStringified = localStorage.getItem('data');
    return data && JSON.parse(dataStringified) || null;
  };
/*
const fetchData = () => {
    fetch("https://coronavirus-tracker-api.herokuapp.com/deaths")
       .then(res=> {
         // instead of storing directly your response, construct a object that will store also the date
         localStorage.setItem("data", JSON.stringify({response: res.json(), receivedAt: new Date()}));
         console.log(localStorage.getItem("data"))
       })
  }

const data = getDataFromLocalStorage();
  if (!data) {
     fetchData();

  }
*/

//pagination
const prev = document.getElementById('prev');
const current = document.getElementById('current');
const next = document.getElementById('next');

var currentPage = 1;
var prevPage = 3;
var nextPage = 2;
var lastURL = '';
var totalPages = 100;
/*
//function call to get movies from tmdb
const data = getDataFromLocalStorage();
  if (!data) {
    // fetchData();
    getMovies(APIurl);
  }*/
/*
getMovies(APIurl);
*/


getMovies(APIurl);


 //get movies from tmdb
 function getMovies(url){
    lastURL = url;
      fetch(url).then(res => res.json()).then(data => {
        console.log(data.results)
        if (data.results.length !== 0) {
         show(data.results);
         currentPage = data.page;
         nextPage = currentPage +1;
         prevPage = currentPage -1;
         totalPages = data.total_pages;
         
         current.innerText = currentPage;
         //enable or disable options for bottom nav
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






//function to get from localstorage after na save sa function show


//show all movies
function show(data){
   main.innerHTML='';

   //loop through all the movies and create movie card
   data.forEach(movie =>{
       const {title, poster_path, vote_average, overview} = movie;
       const movieCard = document.createElement('div');
       movieCard.classList.add('movie');
       
       movieCard.innerHTML=`      
            <img src="${image+poster_path}" alt="${title}">        
       <div class="movieDetails">
           <h3 class="title">${title}</h3>
           <span class="${color(vote_average)}">${vote_average}</span>
       </div>
       <div class="overview">
        <div><h3>Plot</h3><button class="addMovie disabled">Add to my list</button></div>
            ${overview}
       </div>
       `
       
       //save mo d2 using using function sa localstorage ung html address. moviveCard gamitin mo
       /* saveList();*/
       //add to movieCard
       main.appendChild(movieCard);
    })
}
/*
//save to localstorage
function saveList{
     
}*/


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

  if (searchMovie){
      getMovies(searchURL+'&query='+searchMovie);
  }

})
 
//next page
next.addEventListener('click',() => {
    if (nextPage <= totalPages){
      pageCall(nextPage);
     }
  })
  
//prev page
prev.addEventListener('click',() => {
    if (prevPage > 0){
      pageCall(prevPage);
     }
  })

//get page
function pageCall(page){
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
/*
addMovie.addEventListener('click',() => {


})  
*/
/*
//add to my movie list
function addtomyList{
   
} */

/*
//search current year
year.addEventListener('onclick',(e) =>{
    e.preventDefault();
    getMovies(searchYear);
})
*/
 