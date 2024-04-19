const task = document.getElementById("task");
const time = document.getElementById("time");
const date = document.getElementById("date");
const list = document.getElementById("list");
const completed = document.getElementById("completed");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let completedTasks = JSON.parse(localStorage.getItem("completedTasks")) || [];

render()
renderCompleted()

function addTask() {
  if (task.value == "" || time.value == "" || date.value == "") {
    window.alert("Please fill all the fields");
    return;
  } else {
    tasks.push({
      task: task.value,
      time: time.value,
      date: date.value,
    });
    render();
    task.value = "";
    time.value = "";
    date.value = "";
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
}

function render() {
  let html = "";
  for (let i = 0; i < tasks.length; i++) {
    html += `
    <tr>
      <td>${tasks[i].task}</td>
      <td>${tasks[i].time}</td>
      <td>${tasks[i].date}</td>
      <td><button onclick="markCompleted(${i})">Done</button></td>
    </tr>
    `;
  }
  list.innerHTML = html;
}

function renderCompleted() {
  let html = "";
  for (let i = 0; i < completedTasks.length; i++) {
    html += `
    <tr>
      <td>${completedTasks[i].task}</td>
      <td>${completedTasks[i].time}</td>
      <td>${completedTasks[i].date}</td>
      <td><button onclick="deleteTask(${i})">Delete</button></td>
    </tr>
    `;
  }
  completed.innerHTML = html;
}

function markCompleted(i) {
  completedTasks.push(tasks[i]);
  tasks.splice(i, 1);
  renderCompleted()
  render();
  localStorage.setItem("completedTasks", JSON.stringify(completedTasks));
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function deleteTask(i) {
  completedTasks.splice(i, 1);
  renderCompleted();
  localStorage.setItem("completedTasks", JSON.stringify(tasks));
}
