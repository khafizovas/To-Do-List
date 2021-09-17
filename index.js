let taskList = JSON.parse(localStorage.getItem("tasks")) || [];

window.onload = () => {
    taskList.forEach(elem => addNewTask(elem));

    document.querySelector('#add-task-button').onclick = addNewTask;

    for (let button of document.querySelectorAll('.delete-btn')) {
        button.onclick = deleteTask;
    }
}

function addNewTask(cachedTask) {
    const inputField = document.querySelector("#input-task");
    const tasksList = document.querySelector("#task-list");

    // TODO: adding doesn't work right but caching is OK
    if (inputField.value || cachedTask) {
        tasksList.appendChild(newTask(inputField.value || cachedTask));

        if (inputField.value) {
            taskList.push({text: inputField.value, checked: false});
            localStorage.setItem("tasks", JSON.stringify(taskList));

            inputField.value = '';
        }
    }
}

function newTask(cachedTask) {
    const newTask = document.createElement('li');

    newTask.appendChild(newTaskCheckbox());
    newTask.appendChild(newTaskName(cachedTask));
    newTask.appendChild(newTaskDeleteBtn());

    return newTask;
}

function newTaskCheckbox() {
    const newTaskCheckbox = document.createElement('input');

    newTaskCheckbox.type = 'checkbox';
    newTaskCheckbox.onclick = toggleCompletion;

    return newTaskCheckbox;
}

function newTaskName(cachedTask) {
    const newTaskName = document.createElement('span');

    newTaskName.className = 'task';
    newTaskName.textContent = cachedTask.text;

    if (cachedTask.checked) {
        newTaskName.previousSibling.checked = true;
    }

    return newTaskName;
}

function newTaskDeleteBtn() {
    const newTaskDeleteBtn = document.createElement('button');

    newTaskDeleteBtn.className = 'delete-btn';
    newTaskDeleteBtn.textContent = 'x';
    newTaskDeleteBtn.onclick = deleteTask;

    return newTaskDeleteBtn;
}

function deleteTask(e) {
    e.target.parentElement.remove();
    
    taskList = taskList.filter(task => task.text !== e.target.previousSibling.textContent);

    localStorage.setItem("tasks", JSON.stringify(taskList));
}

function toggleCompletion(e) {
    const taskText = e.target.nextSibling;
    let isComplete = taskText.style.textDecoration === 'line-through';

    taskText.style.textDecoration = isComplete ? 'none' : 'line-through';
    isComplete = taskText.style.textDecoration === 'line-through';

    taskList = taskList.map(task => {
        if (task.text === taskText.textContent) {
            task.checked = isComplete;
        }
        return task;
    });

    localStorage.setItem("tasks", JSON.stringify(taskList));
}