const todoForm = document.querySelector('.todoForm');
const todoInput = document.querySelector('.todoInput');
const todoItemsList = document.querySelector('.todoItems');

let todos = [];

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

function renderTodos(todos) {
    todoItemsList.innerHTML = '';
  
    todos.forEach(function(item) {
       const checked = item.completed ? 'checked': null;
      
       const li = document.createElement('li');
  
        li.setAttribute('class', 'item');
        li.setAttribute('data-key', item.id);  
     
       if (item.completed === true) {
           li.classList.add('checked');
        }
    

      li.innerHTML = `<input type="checkbox" class="checkbox" ${checked}> ${item.name} <button class="delete-button">X</button>`;
   todoItemsList.append(li);
  });

   updateCount(todos);
    
}

function addToLocalStorage(todos) {
  localStorage.setItem('todos', JSON.stringify(todos));
  renderTodos(todos);
  }

function getFromLocalStorage() {
  const reference = localStorage.getItem('todos');

  if (reference) {
    todos = JSON.parse(reference);
    renderTodos(todos);
  }
}

function toggle(id) {
  todos.forEach(function(item) {
     if (item.id == id) {
       item.completed = !item.completed;
    }
  });

  addToLocalStorage(todos);
}

 
function deleteTodo(id) {
  
  todos = todos.filter(function(item) {
       return item.id != id;
    });
  
     addToLocalStorage(todos);
  }


getFromLocalStorage();


todoItemsList.addEventListener('click', function(event) {
  
  if (event.target.type === 'checkbox') {
    toggle(event.target.parentElement.getAttribute('data-key'));
  }

 if (event.target.classList.contains('delete-button')) {
    deleteTodo(event.target.parentElement.getAttribute('data-key'));
  }
});

 
function updateCount(todos){
  const taskCounter = document.getElementById('counter');
  if(todos != null) {
      
      taskCounter.innerHTML = `${todos.length} task(s) found`;

  } else {
      taskCounter.innerHTML = `0 tasks found`;
  }
  
}

function active(todos){
  const taskCounter = document.getElementById('counter');
  ctr=0; 
   
    todos.forEach(function(item) {
       if (item.completed != true){
        ctr++;
        taskCounter.innerHTML = `${ctr} task(s) active`;
    } 
   
      if (ctr == 0){
        taskCounter.innerHTML =  `0 tasks active`;
          }
     });
 }

function completed(todos){
  const taskCounter = document.getElementById('counter');
  ctr1=0;
 
  todos.forEach(function(item) {
  
    if (item.completed == true){
      ctr1++;
      taskCounter.innerHTML = `${ctr1} task(s) completed`;
    }  

    if (ctr1 == 0){
      taskCounter.innerHTML =  `0 tasks completed`;
        }
   });

 } 

