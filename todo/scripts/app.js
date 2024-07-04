'use strict';

const DOM = {
    CLASS_NAME: {
        TODO_TITLE_TEXT: 'todo-title-text',
        REGISTER_BTN: 'register-btn',
        COMPLETE_BTN: 'complete-btn',
        DELETE_BTN: 'delete-btn',
    },
    ID_NAME: {
        TODO_LIST: 'todo-list',
        TODO_INPUT: 'todo-input',
        TOOD_CARD: 'todo-card',
        TODO_FORM: 'todo-form',
    },
    ELEMENT: {
        DIV: 'div',
        SPAN: 'span',
        BUTTON: 'button',
        LIST: 'li'
    }
}

// Store in local storage
function storeTodo(title){
    const todos = JSON.parse(localStorage.getItem('todos')) || [];
    todos.push(title);
    localStorage.setItem('todos', JSON.stringify(todos));
}

// Remove local storage
function removeTodo(index){
    const todos = JSON.parse(localStorage.getItem('todos')) || [];
    todos.splice(index, 1);
    localStorage.setItem('todos', JSON.stringify(todos));
}

// Load todo from local storage
// Execute when the page is loaded
function loadTodo(){
    const todos = JSON.parse(localStorage.getItem('todos')) || [];
    for (const todo of todos){
        renderTodo(todo);
    }
}

// Render new todo card
function renderTodo(title){
    // Init todo card
    const todoList = document.getElementById(DOM.ID_NAME.TODO_LIST);
    const newTodo = document.createElement(DOM.ELEMENT.LIST);
    const newTodoCard = document.createElement(DOM.ELEMENT.DIV);
    newTodoCard.id = DOM.ID_NAME.TOOD_CARD;
    newTodo.appendChild(newTodoCard);

    // Title
    const todoTitle = document.createElement(DOM.ELEMENT.SPAN);
    todoTitle.className = DOM.CLASS_NAME.TODO_TITLE_TEXT;
    todoTitle.textContent = title;

    // Complete button
    const completeBtn = document.createElement(DOM.ELEMENT.BUTTON);
    completeBtn.className = DOM.CLASS_NAME.COMPLETE_BTN;
    completeBtn.textContent = '완료';

    // Delete button
    const deleteBtn = document.createElement(DOM.ELEMENT.BUTTON);
    deleteBtn.className = DOM.CLASS_NAME.DELETE_BTN;
    deleteBtn.textContent = '삭제';

    // Append child
    newTodoCard.appendChild(todoTitle);
    newTodoCard.appendChild(completeBtn);
    newTodoCard.appendChild(deleteBtn);

    // Append todo card
    todoList.appendChild(newTodo);
}

function addTodo(title){
    if(!title || title.trim().length === 0){
        alert('Please input any text.');
        return;
    }
    storeTodo(title);
    renderTodo(title);
}

// Event handler for Register Button
function activateRegisterEvent(){
    const registerBtn = document.getElementById(DOM.ID_NAME.TODO_FORM);
    registerBtn.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent default form submit
        const title = document.getElementById(DOM.ID_NAME.TODO_INPUT).value;
        addTodo(title);
    });
}

// Event handler for Delete Button
function activateDeleteEvent(){
    const todoList = document.getElementById(DOM.ID_NAME.TODO_LIST);
    todoList.addEventListener('click', (event) => {
        // Find Todo Card index
        if(event.target.classList.contains(DOM.CLASS_NAME.DELETE_BTN)){
            const todoListItem = event.target.closest(DOM.ELEMENT.LIST);
            const index = Array.from(todoList.children).indexOf(todoListItem);
            removeTodo(index);
            todoListItem.remove();
        }
    }
)
}

// Event handler for Complete Button
function activateCompleteEvent(){
    const todoList = document.getElementById(DOM.ID_NAME.TODO_LIST);
    todoList.addEventListener('click', (event) => {
        if(event.target.classList.contains(DOM.CLASS_NAME.COMPLETE_BTN)){
            const button = event.target.closest(`.${DOM.CLASS_NAME.COMPLETE_BTN}`);
            button.style.textDecoration = 'line-through';
            const todoCard = event.target.closest(`#${DOM.ID_NAME.TOOD_CARD}`);
            const todoTitle = todoCard.querySelector(`.${DOM.CLASS_NAME.TODO_TITLE_TEXT}`);
            todoTitle.style.textDecoration = 'line-through';
        }
    });

}

function init(){
    loadTodo();
    activateRegisterEvent();
    activateDeleteEvent();
    activateCompleteEvent();
}

document.addEventListener('DOMContentLoaded', init);
