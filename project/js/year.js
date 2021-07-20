const APIkey ='api_key=2d3a7f07b5e0c3387e92eb8fb2497ad3';
const base = 'https://api.themoviedb.org/3';
const APIurl = base + '/discover/movie?sort_by=popularity.desc&'+APIkey;
const image = 'https://image.tmdb.org/t/p/w500';
const searchURL = base + '/search/movie?'+APIkey;
//const searchYear = base + '/discover/movie?primary_release_year=2021&'+APIkey;
const showing = base + '/discover/movie?primary_release_date.gte=2021-07-01&primary_release_date.lte=2021-07-31&'+APIkey;
 
const year = document.getElementById('currentYear');
const main = document.getElementById('main');
const search = document.getElementById('search');
const form = document.getElementById('form');

//function call current year
//getYear(searchYear);
getShowing(showing);


//get movies from tmdb
function getMovies(url){
    fetch(url).then(res => res.json()).then(data => {
      show(data.results);
    })
}

//get showing this month from tmdb
//function getYear(url){
  function getShowing(url){
    fetch(url).then(res => res.json()).then(data => {
        show(data.results);
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
        
        movieCard.innerHTML=`      
             <img src="${image+poster_path}" alt="${title}">        
        <div class="movieDetails">
            <h3 class="title">${title}</h3>
            <span class="${color(vote_average)}">${vote_average}</span>
        </div>
        <div class="overview">
         <div><h3>Plot</h3><button class="addList disable">Add to my list</button></div>
             ${overview}
        </div>
        `
     
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
//search current year
year.addEventListener('onclick',(e) =>{
    e.preventDefault();
    getMovies(searchYear);
})
*/
 