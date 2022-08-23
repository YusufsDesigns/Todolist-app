// Get Elements
const todoBox1 = document.querySelector('#todo-box-1');
const todoBox2 = document.querySelector('#todo-box-2');
const callTodoBox = document.querySelector('.call-todo-box');
const illustration = document.querySelector('.illustration');
const cancelBtn1 = document.querySelector('.cancel-btn');
const cancelBtn2 = document.querySelector('.cancel-btn-2');
const list = document.querySelector('.todos');
const menuBtn = document.querySelector('.menu-btn');
const sidebar = document.querySelector('.side-bar');
const todoList = document.querySelector('.todo-list');
const projectToggle = document.querySelector('.project-toggle');
const searchBar = document.querySelector('.search-bar');
const closeSearch = document.querySelector('.close-search');
const tspans = document.querySelectorAll('.t-span');
const spanDate = document.querySelector('.span-date');
const radios = document.querySelectorAll('.radio');

let num = 0;
const number = document.querySelector('.num');

if(list.innerHTML === ''){
    illustration.style.display = 'block';
} else{
    illustration.style.display = 'none';
}

// Define classes
class Todo{
    constructor(name, description){
        this.name = name;
        this.description = description;
    }
}

class UI{
    addTodoToList(todo){
        const list = document.querySelector('.todos');
        // Create li
        const li = document.createElement('li');
        // Add class
        li.className = 'todo';
        // Add inner html
        li.innerHTML = `
        <input type="radio" name="radio" class="radio">
        <div>
            <h4>${todo.name}</h4>
            <p>${todo.description}</p>
        </div>
        `
        // Append li
        list.appendChild(li);
    }

    clearValues(){
        document.querySelector('#todo-name').value = '';
        document.querySelector('#description').value = '';
        document.querySelector('#todo-name-2').value = '';
        document.querySelector('#description-2').value = '';
    }

    removeTodo(target){
        if(target.name == 'radio'){
            target.classList.add('checked');
            setTimeout(function(){
                target.parentElement.remove();
            // Remove todo from localStorage
            Store.removeTodo(target.nextElementSibling.firstElementChild.textContent, num);
            }, 400);
        }
        
    }

    showAlert(msg){
        const alert = document.querySelector('.alert');
        alert.textContent = msg;
        alert.classList.add('show');
        setTimeout(function(){
            alert.classList.remove('show');
        }, 4000);
    }


    static cancelBtn(todoBox, callTodoBox){
        todoBox.style.display = 'none';
        callTodoBox.style.display = 'flex';
    }

    static menuBar(){
            sidebar.classList.toggle('hide');
            todoList.classList.toggle('extend');
    }
}

// Local storage
class Store{
    static getTodos(){
        let todos;
        if(localStorage.getItem('todos') == null){
            todos = [];
        } else {
            todos = JSON.parse(localStorage.getItem('todos'));
        }

        return todos;
    }

    static displayTodos(){
        const todos = Store.getTodos();
        todos.forEach(function(todo){
            const ui = new UI();
            ui.addTodoToList(todo);
        });
    }

    static addTodos(todo){
        const todos = Store.getTodos();
        todos.push(todo);
        localStorage.setItem('todos', JSON.stringify(todos));
    }

    static removeTodo(name){
        const todos = Store.getTodos();
        todos.forEach(function(todo, index){
            if(todo.name === name){
                todos.splice(index, 1);
            }
        })

        localStorage.setItem('todos', JSON.stringify(todos));
    }
}

// DOM load event
document.addEventListener('DOMContentLoaded', Store.displayTodos());

// Add event listener for call todo book
document.querySelector('.call-todo-box').addEventListener('click', function(){
    // Display box
    todoBox1.style.display = 'block';
    illustration.style.display = 'none';
    callTodoBox.style.display = 'none';
})

// Add event listener to add todo btn
document.querySelector('.add-todo-btn').addEventListener('click', function(){
        // Get values
        const name = document.querySelector('#todo-name').value;
        const description = document.querySelector('#description').value;
    
        // Instantiate Todo
        const todo = new Todo(name, description);
    
        // Instantiate UI
        const ui = new UI();
    
        // Validate
        if(name == ''){
            addTodoBtn.disabled = true;
        } else{
            // Add todo to list
            ui.addTodoToList(todo);
            // Add to localstorage
            Store.addTodos(todo);
            // Remove illustration
            illustration.style.display = 'none';
            // Show alert
            ui.showAlert('Todo added successfully');
            // Clear values
            ui.clearValues();
        }
})

// Add event listener for add btn
document.querySelector('.add-btn').addEventListener('click', function(){
    // Display box
    todoBox2.style.display = 'block';
})

// Add event listener to add todo btn 2
document.querySelector('.add-todo-btn-2').addEventListener('click', function(){
    // Get values
    const name = document.querySelector('#todo-name-2').value;
    const description = document.querySelector('#description-2').value;

    // Instantiate Todo
    const todo2 = new Todo(name, description);

    // Instantiate UI
    const ui = new UI();

    // Validate
    if(name == ''){
        addTodoBtn.disabled = true;
    } else{
        // Add todo to list
        ui.addTodoToList(todo2);
        // Add todo to localStorage
        Store.addTodos(todo2);
        // Remove illustration
        illustration.style.display = 'none';
        // Remove todobox
        todoBox2.style.display = 'none';
        // Show alert
        ui.showAlert('Todo added successfully');
        // Clear Values
        ui.clearValues();
    }
})

// Remove todo from list
list.addEventListener('click', function(e){
    // Instantiate new ui
    const ui = new UI();
    // Remove todo from list
    ui.removeTodo(e.target);
    // Show Alert
    ui.showAlert('1 task completed');
})

// Add event listener to cancel btn
cancelBtn1.addEventListener('click', function(){
    UI.cancelBtn(todoBox1, callTodoBox);
})

// Add event listener to cancel btn 2
cancelBtn2.addEventListener('click', function(){
    UI.cancelBtn(todoBox2);
})

// Call menu 
menuBtn.addEventListener('click', function(){
    UI.menuBar();
})

// Toggle projects
projectToggle.addEventListener('click', function(){
    projectToggle.classList.toggle('active');
    const content = projectToggle.nextElementSibling;
    if(projectToggle.classList.contains('active')){
        content.style.height = content.scrollHeight + 'px';
    } else{
        content.style.height = 0;
    }
})

// Display date
const date = new Date();
const getDate = date.getDate();
tspans.forEach(function(tspan){
    tspan.textContent = getDate;
})

const day = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
const months = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];

const fullDate = day[date.getDay()] + ' ' + months[date.getMonth()] + ' ' + date.getDate();
spanDate.textContent = fullDate;