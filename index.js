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

    const taskText = inputField.value || cachedTask.text;

    if (taskText) {
        tasksList.appendChild(newTask({text: taskText, checked: cachedTask?.checked}));

        if (inputField.value) {
            taskList.push({text: inputField.value, checked: false});
            localStorage.setItem("tasks", JSON.stringify(taskList));

            inputField.value = '';
        }
    }
}

function newTask(newTaskFields) {
    const newTask = document.createElement('li');

    newTask.appendChild(newTaskCheckbox(newTaskFields.checked));
    newTask.appendChild(newTaskName(newTaskFields));
    newTask.appendChild(newTaskDeleteBtn());

    return newTask;
}

function newTaskCheckbox(isChecked) {
    const newTaskCheckbox = document.createElement('input');

    newTaskCheckbox.type = 'checkbox';
    newTaskCheckbox.checked = isChecked;
    newTaskCheckbox.onclick = toggleCompletion;

    return newTaskCheckbox;
}

function newTaskName(newTaskFields) {
    const newTaskName = document.createElement('span');

    newTaskName.className = 'task';
    newTaskName.textContent = newTaskFields.text;

    if (newTaskFields.checked) {
        newTaskName.style.textDecoration = 'line-through';
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