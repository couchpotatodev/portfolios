const APIkey ='api_key=2d3a7f07b5e0c3387e92eb8fb2497ad3';
const base = 'https://api.themoviedb.org/3';
const APIurl = base + '/discover/movie?sort_by=popularity.desc&'+APIkey;
const image = 'https://image.tmdb.org/t/p/w500';
const searchURL = base + '/search/movie?'+APIkey;
 

const main = document.getElementById('main');
const search = document.getElementById('search');
const form = document.getElementById('form');


let myMovieList = [];

const save_button = document.getElementById('addList')
save_button.onclick = saveData;

function saveData(){
    var input = document.getElementById("saveServer");
    localStorage.setItem("server", input.value);
    var storedValue = localStorage.getItem("server");
  }

todoForm.addEventListener('submit', function(event) {
    event.preventDefault();
    addTodo(todoInput.value); 
  });



function addTodo(item) {
    if (item !== '') {
        const todo = {
       id: Date.now(),
       name: item,
       completed: false
     };
 
     todos.push(todo);
     addToLocalStorage(todos);
     todoInput.value = '';
   }
}




//form for movies
todoForm.addEventListener('submit', function(event) {
    event.preventDefault();
    addTodo(todoInput.value); 
  });








//function call to get movies from tmdb
getMovies(APIurl);



//get movies from tmdb
function getMovies(url){
    fetch(url).then(res => res.json()).then(data => {
      show(data.results);
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
        <div><h3>Plot</h3><button id="addList" class="disable">Add to my list</button></div>
            ${overview}
       </div>
       `
       //save mo d2 using using function sa localstorage ung html address. moviveCard gamitin mo
       

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

  if (searchMovie){
      getMovies(searchURL+'&query='+searchMovie);
  }

})
 
 
 