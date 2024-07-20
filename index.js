import addBtnCompleteTask from "./src/components/completeTask.js";
import addBtnDeleteTask from "./src/components/deleteTask.js";

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.forEach(task => {
    createTaskElement(task);
  });
}

function createTaskElement(task) {
  const list = document.querySelector('[data-list]');
  const taskElement = document.createElement('li');
  taskElement.classList.add('task');
  if (task.completed) {
    taskElement.classList.add('done');
  }

  const content = document.createElement('p');
  content.classList.add('content');
  content.textContent = task.value;

  const btnCompleteTask = addBtnCompleteTask(task);
  btnCompleteTask.checked = task.completed;
  taskElement.appendChild(btnCompleteTask);

  taskElement.appendChild(content);
  taskElement.appendChild(addBtnDeleteTask());

  list.appendChild(taskElement);
}

const newTask = (event) => {
  event.preventDefault();

  const input = document.querySelector('[data-form-input]');
  const valueInput = input.value;

  if (valueInput === "") {
    alert("Digite uma tarefa! 🚫");
    return;
  }

  const task = {
    value: valueInput,
    completed: false
  };

  createTaskElement(task);

  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));

  input.value = "";
};

document.addEventListener('DOMContentLoaded', loadTasks);

const btnNewTask = document.querySelector('[data-form-button]');
btnNewTask.addEventListener('click', newTask);
  
