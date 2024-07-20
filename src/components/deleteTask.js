const addBtnDeleteTask = () => {
    const btnDeleteTask = document.createElement('button');
    btnDeleteTask.classList.add('delete-button');

    btnDeleteTask.innerHTML = '<i class="ph ph-trash"></i>';
    btnDeleteTask.addEventListener('click', deleteTask);

    return btnDeleteTask;
}

const deleteTask = (event) => {
    const confirmDelete = window.confirm('Você realmente deseja excluir esta tarefa? ⚠️');
    alert(`${confirmDelete ? 'Tarefa excluída! ✅' : 'Tarefa não excluída! 😉'}`);

    let targetElement = event.target;

    while (!targetElement.classList.contains('task') && targetElement.parentElement) {
        targetElement = targetElement.parentElement;
    }

    if (targetElement.classList.contains('task') && confirmDelete) {
        const taskContent = targetElement.querySelector('.content').textContent;

        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        const updatedTasks = tasks.filter(task => task.value !== taskContent);
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));

        targetElement.remove();
    }
}

export default addBtnDeleteTask;