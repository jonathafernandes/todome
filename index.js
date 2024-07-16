import addBtnCompleteTask from "./src/components/completeTask.js";
import addBtnDeleteTask from "./src/components/deleteTask.js";

const newTask = (event) => {
    event.preventDefault();
  
    const input = document.querySelector('[data-form-input]');
    const valueInput = input.value;
    const list = document.querySelector('[data-list]');
    const task = document.createElement('li');
    task.classList.add('task');
  
    if (valueInput === "") {
      alert("Digite uma tarefa!");
      return;
    }
  
    const content = document.createElement('p');
    content.classList.add('content');
    content.textContent = valueInput;
  
    task.appendChild(addBtnCompleteTask());
    task.appendChild(content);
    task.appendChild(addBtnDeleteTask());
  
    list.appendChild(task);
    input.value = "";
  };
  
const btnNewTask = document.querySelector('[data-form-button]');
btnNewTask.addEventListener('click', newTask);
  
