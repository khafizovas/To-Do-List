window.onload = () => {
    document.querySelector('#add-task-button').onclick = addNewTask;

    for (let button of document.querySelectorAll('.delete-btn')) {
        button.onclick = deleteTask;
    }
}

function addNewTask() {
    const inputField = document.querySelector("#input-task");
    const tasksList = document.querySelector("#task-list");

    if (inputField.value !== '') {
        const newTask = document.createElement('li');

        newTask.appendChild(newTaskCheckbox());
        newTask.appendChild(newTaskName(inputField.value));

        const newTaskDeleteBtn = document.createElement('button');
        newTaskDeleteBtn.className = 'delete-btn';
        newTaskDeleteBtn.textContent = 'x';
        newTaskDeleteBtn.onclick = deleteTask;

        newTask.appendChild(newTaskDeleteBtn);

        tasksList.appendChild(newTask);
    }

    inputField.value = '';
}

function newTaskCheckbox() {
    const newTaskCheckbox = document.createElement('input');
    newTaskCheckbox.type = 'checkbox';

    return newTaskCheckbox;
}

function newTaskName(text) {
    const newTaskName = document.createElement('span');
    newTaskName.className = 'task';
    newTaskName.textContent = text;

    return newTaskName;
}

function deleteTask(e) {
    e.target.parentElement.remove();
}

