import addBtnCompleteTask from "./components/completeTask.js";
import addBtnDeleteTask from "./components/deleteTask.js";

const newTask = (event) => {
    event.preventDefault();

    const input = document.querySelector('[data-form-input]');
    const valueInput = input.value;
    const list = document.querySelector('[data-list]');
    const task = document.createElement('li'); // Criando elemento HTML
    task.classList.add('task'); // Adicionado uma classe

    const content = `<p class="content">${valueInput}</p>`;

    task.innerHTML = content;

    list.appendChild(task); // Atribuindo o elemento criado a um elemento pai
    task.appendChild(addBtnCompleteTask());
    task.appendChild(addBtnDeleteTask());
    input.value = ""; // Mudando o valor do input
}

const btnNewTask = document.querySelector('[data-form-button]');

btnNewTask.addEventListener('click', newTask);