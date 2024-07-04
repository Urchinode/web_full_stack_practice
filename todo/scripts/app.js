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

class TodoItem{
    constructor(title, completed = false){
        this.title = title;
        this.isCompleted = completed;
    }

    complete(){
        this.isCompleted = true;
    }

    toJSON(){
        return {
            title: this.title, 
            isCompleted: this.isCompleted
        }
    }

    static fromJSON(json){
        return new TodoItem(json.title, json.isCompleted);
    }
}

// Store in local storage
function storeTodo(title){
    const newTodoItem = new TodoItem(title);
    const todos = JSON.parse(localStorage.getItem('todos')) || [];
    todos.push(newTodoItem);
    localStorage.setItem('todos', JSON.stringify(todos));
}

// Remove local storage
function removeTodo(index){
    console.log(index);
    const todos = JSON.parse(localStorage.getItem('todos')) || [];
    todos.splice(index, 1);
    localStorage.setItem('todos', JSON.stringify(todos));
}

// Save todo list state
function completeTodo(index){
    const todos = JSON.parse(localStorage.getItem('todos')) || [];
    const todo = TodoItem.fromJSON(todos[index]);
    todo.complete();
    // 완료된 todo가 저장되도록 로컬 스토리지에 저장
    todos[index] = todo;
    localStorage.setItem('todos', JSON.stringify(todos));
}

// Load todo from local storage
// Execute when the page is loaded
function loadTodo(){
    const todos = JSON.parse(localStorage.getItem('todos')) || [];
    for (const todo of todos){
        renderTodo(todo.title, todo.isCompleted);
    }
}

// Render new todo card
function renderTodo(title, isCompleted){
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
    if(isCompleted){
        todoTitle.style.textDecoration = 'line-through';
    }

    // Complete button
    const completeBtn = document.createElement(DOM.ELEMENT.BUTTON);
    completeBtn.className = DOM.CLASS_NAME.COMPLETE_BTN;
    completeBtn.textContent = '완료';
    if(isCompleted){
        completeBtn.style.textDecoration = 'line-through';
    }

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
            const todoListItem = event.target.closest(DOM.ELEMENT.LIST);
            const index = Array.from(todoList.children).indexOf(todoListItem);
            completeTodo(index);
            const button = todoListItem.querySelector(`.${DOM.CLASS_NAME.COMPLETE_BTN}`);
            button.style.textDecoration = 'line-through';
            const todoCard = todoListItem.querySelector(`#${DOM.ID_NAME.TOOD_CARD}`);
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
