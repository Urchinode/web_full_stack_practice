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

function addTodo(title){
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

// Event handler for Register Button
function activateRegisterEvent(){
    const registerBtn = document.getElementById(DOM.ID_NAME.TODO_FORM);
    registerBtn.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent default form submit
        const title = document.getElementById(DOM.ID_NAME.TODO_INPUT).value;
        addTodo(title);
    });
}

activateRegisterEvent();