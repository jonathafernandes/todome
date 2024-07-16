import addBtnCompleteTask from "./src/components/completeTask.js";
import addBtnDeleteTask from "./src/components/deleteTask.js";

const newTask = (event) => {
    event.preventDefault();

    const input = document.querySelector('[data-form-input]');
    const valueInput = input.value;
    const list = document.querySelector('[data-list]');
    const task = document.createElement('li'); // Criando elemento HTML
    task.classList.add('task'); // Adicionado uma classe

    if (valueInput === "") {
        alert("Digite uma tarefa!");
        return;
    }

    const content = `<p class="content">${valueInput}</p>`;

    task.innerHTML = content;

    list.appendChild(task); // Atribuindo o elemento criado a um elemento pai
    task.insertBefore(addBtnCompleteTask(), task.firstChild); // Adicionando o botão antes do conteúdo da task
    task.appendChild(addBtnDeleteTask());
    input.value = ""; // Mudando o valor do input
}

const btnNewTask = document.querySelector('[data-form-button]');

btnNewTask.addEventListener('click', newTask);
