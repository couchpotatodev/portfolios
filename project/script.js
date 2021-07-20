const APIkey ='api_key=2d3a7f07b5e0c3387e92eb8fb2497ad3';
const base = 'https://api.themoviedb.org/3';
const APIurl = base + '/discover/movie?sort_by=popularity.desc&'+APIkey;
const image = 'https://image.tmdb.org/t/p/w500';
const searchURL = base + '/search/movie?'+APIkey;
const main = document.getElementById('main');

getMovies(APIurl);

function getMovies(url){
    fetch(url).then(res => res.json()).then(data => {
        console.log(data); //ok
        show(data.results);
    })
}

function show(data){
   main.innerHTML='';

   data.foreach(movie =>{
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
           <h3>Plot</h3>
            ${overview}
       </div>
       `
     main.appendChild(movieCard);
    })
}

function color(vote_average){
    if (vote_average >= 8){
        return 'green'
    } else if (vote_average >=5){
        return 'orange'
    } else {
        return 'red'
    }
}