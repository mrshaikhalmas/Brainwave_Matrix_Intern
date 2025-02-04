const inputBox = document.getElementById('inputBox');
const addBtn = document.getElementById('addBtn');
const todoList = document.getElementById('todoList');

let editTodo = null;

const addTodo = () => {
    const inputText = inputBox.value.trim();
    if (inputText.length <= 0) {
        alert("Please enter a task");
        return;
    }

    let todos = JSON.parse(localStorage.getItem("todos")) || [];
    if (todos.includes(inputText) && addBtn.innerText !== "Edit") {
        alert("Task already exists!");
        return;
    }

    if (addBtn.innerText === "Edit" && editTodo) {
        editTodo.target.previousElementSibling.innerText = inputText;
        editLocalTodos(editTodo.target.previousElementSibling.dataset.oldValue, inputText);
        addBtn.innerText = "Add";
        inputBox.value = "";
        editTodo = null;
    } else {
        const li = document.createElement("li");

        const p = document.createElement("p");
        p.innerText = inputText;
        p.dataset.oldValue = inputText;
        li.appendChild(p);

        const editBtn = document.createElement("button");
        editBtn.classList.add("Button", "editBtn");
        editBtn.innerText = "Edit";
        li.appendChild(editBtn);

        const deleteBtn = document.createElement("button");
        deleteBtn.classList.add("Button", "deleteBtn");
        deleteBtn.innerText = "Remove";
        li.appendChild(deleteBtn);

        todoList.appendChild(li);
        saveLocalTodos(inputText);
        inputBox.value = "";
    }
};

const updateTodo = (e) => {
    if (e.target.classList.contains("deleteBtn")) {
        let todoText = e.target.parentElement.firstChild.innerText;
        deleteLocalTodos(todoText);
        e.target.parentElement.remove();
    }
    
    if (e.target.classList.contains("editBtn")) {
        inputBox.value = e.target.previousElementSibling.innerText;
        inputBox.focus();
        addBtn.innerText = "Edit";
        editTodo = e;
    }
};

const saveLocalTodos = (todo) => {
    let todos = JSON.parse(localStorage.getItem("todos")) || [];
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
};

const getLocalTodos = () => {
    let todos = JSON.parse(localStorage.getItem("todos")) || [];
    todos.forEach(todo => {
        const li = document.createElement("li");

        const p = document.createElement("p");
        p.innerText = todo;
        p.dataset.oldValue = todo;
        li.appendChild(p);

        const editBtn = document.createElement("button");
        editBtn.classList.add("Button", "editBtn");
        editBtn.innerText = "Edit";
        li.appendChild(editBtn);

        const deleteBtn = document.createElement("button");
        deleteBtn.classList.add("Button", "deleteBtn");
        deleteBtn.innerText = "Remove";
        li.appendChild(deleteBtn);

        todoList.appendChild(li);
    });
};

const deleteLocalTodos = (todoText) => {
    let todos = JSON.parse(localStorage.getItem("todos")) || [];
    todos = todos.filter(todo => todo !== todoText);
    localStorage.setItem("todos", JSON.stringify(todos));
};

const editLocalTodos = (oldValue, newValue) => {
    let todos = JSON.parse(localStorage.getItem("todos")) || [];
    let todoIndex = todos.indexOf(oldValue);
    if (todoIndex !== -1) {
        todos[todoIndex] = newValue;
        localStorage.setItem("todos", JSON.stringify(todos));
    }
};

document.addEventListener('DOMContentLoaded', getLocalTodos);
addBtn.addEventListener('click', addTodo);
todoList.addEventListener('click', updateTodo);
