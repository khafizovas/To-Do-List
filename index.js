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

        const newTaskCheckbox = document.createElement('input');
        newTaskCheckbox.type = 'checkbox';

        const newTaskName = document.createElement('span');
        newTaskName.className = 'task';
        newTaskName.textContent = inputField.value;

        const newTaskDeleteBtn = document.createElement('button');
        newTaskDeleteBtn.className = 'delete-btn';
        newTaskDeleteBtn.textContent = 'x';
        newTaskDeleteBtn.onclick = deleteTask;

        newTask.appendChild(newTaskCheckbox);
        newTask.appendChild(newTaskName);
        newTask.appendChild(newTaskDeleteBtn);

        tasksList.appendChild(newTask);
    }

    inputField.value = '';
}

function deleteTask(e) {
    e.target.parentElement.remove();
}

