const addBtn = document.getElementById("add-btn");
const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");


document.addEventListener("DOMContentLoaded", loadTasks);

addBtn.addEventListener("click", () => {
  const taskText = taskInput.value.trim();
  if (taskText === "") {
    alert("Please enter a task!");
    return;
  }

  const task = {
    text: taskText,
    completed: false,
  };
  addTaskToDOM(task);
  saveTaskToLocalStorage(task);

  taskInput.value = "";
});

function addTaskToDOM(task) {
  const li = document.createElement("li");
  if (task.completed) li.classList.add("completed");

  const taskContent = document.createElement("div");
  taskContent.classList.add("task-content");

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = task.completed;

  const taskSpan = document.createElement("span");
  taskSpan.textContent = task.text;
  taskSpan.classList.add("task-text");

  taskContent.appendChild(checkbox);
  taskContent.appendChild(taskSpan);

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "✖";
  deleteBtn.classList.add("delete-btn");

  li.appendChild(taskContent);
  li.appendChild(deleteBtn);
  taskList.appendChild(li);

  checkbox.addEventListener("change", () => {
    li.classList.toggle("completed");
    updateTaskStatus(task.text, checkbox.checked);
  });

  deleteBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    li.remove();
    deleteTaskFromLocalStorage(task.text);
  });
}

function saveTaskToLocalStorage(task) {
  const tasks = getTasksFromLocalStorage();
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  const tasks = getTasksFromLocalStorage();
  tasks.forEach(addTaskToDOM);
}

function getTasksFromLocalStorage() {
  return JSON.parse(localStorage.getItem("tasks")) || [];
}

function deleteTaskFromLocalStorage(taskText) {
  const tasks = getTasksFromLocalStorage();
  const updatedTasks = tasks.filter((task) => task.text !== taskText);
  localStorage.setItem("tasks", JSON.stringify(updatedTasks));
}

function updateTaskStatus(taskText, completed) {
  const tasks = getTasksFromLocalStorage();
  const updatedTasks = tasks.map((task) =>
    task.text === taskText ? { ...task, completed } : task
  );
  localStorage.setItem("tasks", JSON.stringify(updatedTasks));
}
