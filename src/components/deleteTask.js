const addBtnDeleteTask = () => {
    const btnDeleteTask = document.createElement('button');
    btnDeleteTask.classList.add('delete-button');

    btnDeleteTask.innerHTML = '<i class="ph ph-trash"></i>';
    btnDeleteTask.addEventListener('click', deleteTask);

    return btnDeleteTask; // O botão precisa ser retornado para ser usado na função que cria tarefa
}

const deleteTask = (event) => {
    let targetElement = event.target;

    // Loop para subir na árvore do DOM até encontrar o elemento da tarefa
    while (!targetElement.classList.contains('task') && targetElement.parentElement) {
        targetElement = targetElement.parentElement;
    }

    // Se o elemento da tarefa foi encontrado, remova-o.
    if (targetElement.classList.contains('task')) {
        targetElement.remove();
    }
}

export default addBtnDeleteTask;