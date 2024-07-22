import addBtnCompleteTask from "./src/components/completeTask.js";
import addBtnDeleteTask from "./src/components/deleteTask.js";
import { currentDate, tomorrowDate } from "./src/utils/date.js";

document.addEventListener('DOMContentLoaded', loadTasks);

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.forEach((task, index) => createTaskElement(task, index));
}

function createTaskElement(task, index) {
  const list = document.querySelector('[data-list]');
  const taskElement = document.createElement('li');
  taskElement.classList.add('task');

  const inputDate = createInputDate(task.date);
  const btnCompleteTask = addBtnCompleteTask(task);
  btnCompleteTask.checked = task.completed;

  const content = createContent(task.value);

  const leftContainer = createLeftContainer(btnCompleteTask, content);
  const notes = createNotes(task.notes, index);
  const rightContainer = createRightContainer(task, inputDate);

  inputDate.addEventListener('change', () => updateTaskDate(index, inputDate.value, taskElement, rightContainer));

  if (task.completed) {
    taskElement.classList.add('done');
  }

  taskElement.append(leftContainer, notes, rightContainer);
  list.appendChild(taskElement);
}

function createInputDate(value) {
  const inputDate = document.createElement('input');
  inputDate.type = 'date';
  inputDate.value = value;
  inputDate.classList.add('task-date');
  return inputDate;
}

function createContent(value) {
  const content = document.createElement('p');
  content.classList.add('content');
  content.textContent = value;
  return content;
}

function createLeftContainer(btnCompleteTask, content) {
  const leftContainer = document.createElement('div');
  leftContainer.classList.add('left-container');
  leftContainer.append(btnCompleteTask, content);
  return leftContainer;
}

function createNotes(noteContent, index) {
  const notes = document.createElement('textarea');
  notes.placeholder = 'Adicione uma nota...';
  notes.classList.add('task-notes');
  notes.value = noteContent || '';

  notes.addEventListener('input', (event) => {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks[index].notes = event.target.value;
    localStorage.setItem('tasks', JSON.stringify(tasks));
  });

  return notes;
}

function createRightContainer(task, inputDate) {
  const rightContainer = document.createElement('div');
  rightContainer.classList.add('right-container');

  const todayText = createTextSpan('hoje', 'today');
  const tomorrowText = createTextSpan('amanhã', 'tomorrow');

  rightContainer.append(inputDate);
  updateDateIndicators(task.date, todayText, tomorrowText, rightContainer);
  rightContainer.append(addBtnDeleteTask());

  return rightContainer;
}

function createTextSpan(text, className) {
  const span = document.createElement('span');
  span.textContent = text;
  span.classList.add(className);
  return span;
}

function updateDateIndicators(date, todayText, tomorrowText, container) {
  const deleteButton = container.querySelector('button');

  if (date === currentDate()) {
    if (!container.contains(todayText)) {
      container.insertBefore(todayText, deleteButton);
    }
  } else if (container.contains(todayText)) {
    container.removeChild(todayText);
  }

  if (date === tomorrowDate()) {
    if (!container.contains(tomorrowText)) {
      container.insertBefore(tomorrowText, deleteButton);
    }
  } else if (container.contains(tomorrowText)) {
    container.removeChild(tomorrowText);
  }
}

function updateTaskDate(index, newDate, taskElement, rightContainer) {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks[index].date = newDate;
  localStorage.setItem('tasks', JSON.stringify(tasks));

  const todayText = rightContainer.querySelector('.today') || createTextSpan('hoje', 'today');
  const tomorrowText = rightContainer.querySelector('.tomorrow') || createTextSpan('amanhã', 'tomorrow');

  updateDateIndicators(newDate, todayText, tomorrowText, rightContainer);
}

function newTask(event) {
  event.preventDefault();

  const input = document.querySelector('[data-form-input]');

  if (!input.value.trim()) {
    alert("Digite uma tarefa! 🚫");
    return;
  }

  const task = {
    value: input.value,
    completed: false,
    date: "",
    notes: ""
  };

  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));

  createTaskElement(task, tasks.length - 1);

  input.value = "";
}

const btnNewTask = document.querySelector('[data-form-button]');
btnNewTask.addEventListener('click', newTask);

