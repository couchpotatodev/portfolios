const APIkey ='api_key=2d3a7f07b5e0c3387e92eb8fb2497ad3';
const base = 'https://api.themoviedb.org/3';
const APIurl = base + '/discover/movie?sort_by=popularity.desc&'+APIkey;
const image = 'https://image.tmdb.org/t/p/w500';
const searchURL = base + '/search/movie?'+APIkey;


getMovies(APIurl);

function getMovies(url){
    fetch(url).then(res => res.json()).then(data => {
        console.log(data);
    })
}