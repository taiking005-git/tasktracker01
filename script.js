const taskTitleInput = document.getElementById('task-title');
const taskDescriptionInput = document.getElementById('task-description');
const addTaskButton = document.getElementById('add-task');
const filterSelect = document.getElementById('filter');
const taskList = document.getElementById('task-list');

loadTasks();
console.log(taskList);



addTaskButton.addEventListener('click', () => {
    const title = taskTitleInput.value;
    const description = taskDescriptionInput.value;

    if (title) {
        addTask(title, description);
        taskTitleInput.value = '';
        taskDescriptionInput.value = '';
    }
});

filterSelect.addEventListener('change', filterTasks);

taskList.addEventListener('click', (event) => {
    if (event.target.classList.contains('complete-button')) {
        markTaskAsComplete(event.target.parentElement);
    } else if (event.target.classList.contains('delete-button')) {
        deleteTask(event.target.parentElement);
    }
});


function addTask(title, description) {
    const task = {
        title,
        description,
        completed: false,
    };

    const tasks = getTasks();
    tasks.push(task);
    saveTasks(tasks);
    displayTasks(tasks);
}

function getTasks() {
    const tasksJSON = localStorage.getItem('tasks');
    return JSON.parse(tasksJSON) || [];
}

function saveTasks(tasks) {
    const tasksJSON = JSON.stringify(tasks);
    localStorage.setItem('tasks', tasksJSON);
}

function displayTasks(tasks) {
    taskList.innerHTML = '';

    tasks.forEach((task, index) => {
        const taskElement = document.createElement('div');
        taskElement.classList.add('task');
        if (task.completed) {
            taskElement.classList.add('completed');
        }

        taskElement.innerHTML = `
            <h3>${task.title}</h3>
            <p>${task.description}</p>
            <button class="complete-button">${task.completed ? 'Mark Incomplete' : 'Mark Complete'}</button>
            <button class="delete-button">Delete</button>
        `;

        taskList.appendChild(taskElement);
    });
}

function markTaskAsComplete(taskElement) {
    const tasks = getTasks();
    const index = Array.from(taskList.children).indexOf(taskElement);
    tasks[index].completed = !tasks[index].completed;
    saveTasks(tasks);
    displayTasks(tasks);
}

function deleteTask(taskElement) {
    const tasks = getTasks();
    const index = Array.from(taskList.children).indexOf(taskElement);
    tasks.splice(index, 1);
    saveTasks(tasks);
    displayTasks(tasks);
}

function filterTasks() {
    const filterValue = filterSelect.value;
    const tasks = getTasks();
    let filteredTasks = [];

    if (filterValue === 'completed') {
        filteredTasks = tasks.filter(task => task.completed);
    } else if (filterValue === 'incomplete') {
        filteredTasks = tasks.filter(task => !task.completed);
    } else {
        filteredTasks = tasks;
    }

    displayTasks(filteredTasks);
}

function loadTasks() {
    const tasks = getTasks();
    displayTasks(tasks);
}

