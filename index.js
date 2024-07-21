import addBtnCompleteTask from "./src/components/completeTask.js";
import addBtnDeleteTask from "./src/components/deleteTask.js";
import { currentDate, tomorrowDate } from "./src/utils/date.js";

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.forEach((task, index) => {
    createTaskElement(task, index);
  });
}

function createTaskElement(task, index) {
  const list = document.querySelector('[data-list]');
  const taskElement = document.createElement('li');
  const inputDate = document.createElement('input');

  taskElement.classList.add('task');
  inputDate.value = task.date;
  inputDate.type = 'date';

  if (task.completed) {
    taskElement.classList.add('done');
  }

  const content = document.createElement('p');
  content.classList.add('content');
  content.textContent = task.value;

  const btnCompleteTask = addBtnCompleteTask(task);
  btnCompleteTask.checked = task.completed;

  const divider = document.createElement('div');
  divider.classList.add('divider');
  divider.appendChild(btnCompleteTask);
  divider.appendChild(content);

  taskElement.appendChild(divider);
  taskElement.appendChild(inputDate);

  const todayText = document.createElement('span');
  todayText.textContent = 'hoje';
  todayText.classList.add('today');

  const tomorrowText = document.createElement('span');
  tomorrowText.textContent = 'amanhã';
  tomorrowText.classList.add('tomorrow');

  if (task.date === currentDate()) {
    taskElement.appendChild(todayText);
  } else if (task.date === tomorrowDate()) {
    taskElement.appendChild(tomorrowText);
  }

  taskElement.appendChild(addBtnDeleteTask());

  inputDate.addEventListener('change', () => {
    updateTaskDate(index, inputDate.value, taskElement, todayText, tomorrowText);
  });

  list.appendChild(taskElement);
}

function updateTaskDate(index, newDate, taskElement, todayText, tomorrowText) {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks[index].date = newDate;
  localStorage.setItem('tasks', JSON.stringify(tasks));

  if (newDate === currentDate()) {
    if (!taskElement.contains(todayText)) {
      taskElement.insertBefore(todayText, taskElement.lastChild);
    }
  } else {
    if (taskElement.contains(todayText)) {
      taskElement.removeChild(todayText);
    }
  }

  if (newDate === tomorrowDate()) {
    if (!taskElement.contains(tomorrowText)) {
      taskElement.insertBefore(tomorrowText, taskElement.lastChild);
    }
  } else {
    if (taskElement.contains(tomorrowText)) {
      taskElement.removeChild(tomorrowText);
    }
  }
}

const newTask = (event) => {
  event.preventDefault();

  const input = document.querySelector('[data-form-input]');
  const valueInput = input.value;
  const dateInput = document.querySelector('[data-form-date]');

  if (valueInput === "") {
    alert("Digite uma tarefa! 🚫");
    return;
  }

  const task = {
    value: valueInput,
    completed: false,
    date: dateInput.value
  };

  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));

  createTaskElement(task, tasks.length - 1);

  input.value = "";
  dateInput.value = "";
};

document.addEventListener('DOMContentLoaded', loadTasks);

const btnNewTask = document.querySelector('[data-form-button]');
btnNewTask.addEventListener('click', newTask);

export { addBtnCompleteTask, createTaskElement };
