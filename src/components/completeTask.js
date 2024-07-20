const addBtnCompleteTask = (task) => {
    const btnCompleteTask = document.createElement('input');
    btnCompleteTask.type = 'checkbox';
    btnCompleteTask.classList.add('check-button');

    btnCompleteTask.addEventListener('click', (event) => completeTask(event, task));

    return btnCompleteTask;
}

const completeTask = (event) => {
    const btnCompleteTask = event.target;

    const taskElement = btnCompleteTask.parentElement;
    taskElement.classList.toggle('done');

    const taskContent = taskElement.querySelector('.content').textContent;

    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const updatedTasks = tasks.map(t => {
        if (t.value === taskContent) {
            t.completed = btnCompleteTask.checked;
        }
        return t;
    });
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
}

export default addBtnCompleteTask;