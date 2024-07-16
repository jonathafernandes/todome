const addBtnDeleteTask = () => {
    const btnDeleteTask = document.createElement('button');
    btnDeleteTask.classList.add('delete-button');

    btnDeleteTask.innerText = '🗑️';
    btnDeleteTask.addEventListener('click', deleteTask);

    return btnDeleteTask; // O botão precisa ser retornado para ser usado na função que cria tarefa
}

const deleteTask = (event) => {
    const btnDeleteTask = event.target; // O `target` serve para verificar em qual elemento foi clicado

    const taskDelete = btnDeleteTask.parentElement;

    taskDelete.remove();

    return btnDeleteTask;
}

export default addBtnDeleteTask;