const taskInput = document.querySelector('#taskInput');
const addTask = document.querySelector('#addTask');
const taskList = document.querySelector('#taskList');
const themeToggle = document.querySelector('#themeToggle');

// Set the theme based on saved preference
document.addEventListener('DOMContentLoaded', () => {
    loadTasks();

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.body.classList.remove('light-theme', 'dark-theme');
        document.body.classList.add(savedTheme);
    }
});

themeToggle.addEventListener('click', function () {
    document.body.classList.toggle('dark-theme');
    document.body.classList.toggle('light-theme');

    const currentTheme = document.body.classList.contains('dark-theme') ? 'dark-theme' : 'light-theme';
    localStorage.setItem('theme', currentTheme);
});

addTask.addEventListener('click', function () {
    const task = taskInput.value.trim();
    if (task === "") {
        alert("Please enter a task");
    } else {
        addTaskDom(task);
        saveDataLocalStorage(task);
        taskInput.value = "";
    }
});

function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    if (!Array.isArray(tasks)) {
        tasks = [];
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
    tasks.forEach(task => {
        addTaskDom(task);
    });
}

function addTaskDom(task) {
    const taskData = document.createElement("li");
    taskData.innerHTML = `
        <span>${task}</span>
        <button class="update">Update</button>
        <button class="delete">Delete</button>
    `;
    taskList.appendChild(taskData);

    const deleteBtn = taskData.querySelector('button.delete');
    const editBtn = taskData.querySelector('button.update');

    deleteBtn.addEventListener('click', () => {
        deleteLocalStorage(task, taskData);
    });

    editBtn.addEventListener('click', () => {
        const editInput = prompt("Update task", task);
        if (editInput !== null && editInput.trim() !== "") {
            taskData.querySelector('span').textContent = editInput.trim();
            updateTaskInLocalStorage(task, editInput.trim());
        }
    });
}

function saveDataLocalStorage(task) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function deleteLocalStorage(task, taskData) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = tasks.filter(t => t !== task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    taskData.remove();
}

function updateTaskInLocalStorage(oldTask, newTask) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    let index = tasks.indexOf(oldTask);
    if (index !== -1) {
        tasks[index] = newTask;
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
}
