const addBtnCompleteTask = () => {
    const btnCompleteTask = document.createElement('button');
    btnCompleteTask.classList.add('check-button');

    btnCompleteTask.innerHTML = 'concluir';

    btnCompleteTask.addEventListener('click', completeTask);

    return btnCompleteTask; // O botão precisa ser retornado para ser usado na função que cria tarefa
}

const completeTask = (event) => {
    const btnCompleteTask = event.target; // O `target` serve para verificar em qual elemento foi clicado

    const taskComplete = btnCompleteTask.parentElement;

    taskComplete.classList.toggle('done');
}

export default addBtnCompleteTask;