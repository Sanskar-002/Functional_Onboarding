// Handles task operations
const fs = require('fs');
const path = require('path');
const tasksFile = path.join(__dirname, 'tasks.json');

function loadTasks() {
  if (!fs.existsSync(tasksFile)) return [];
  const data = fs.readFileSync(tasksFile, 'utf8');
  return data ? JSON.parse(data) : [];
}

function saveTasks(tasks) {
  fs.writeFileSync(tasksFile, JSON.stringify(tasks));
}

function addTask(task) {
  const tasks = loadTasks();
  tasks.push({ id: Date.now(), task });
  saveTasks(tasks);
  console.log('Task added.');
}

function listTasks() {
  const tasks = loadTasks();
  if (tasks.length === 0) return console.log('No tasks found.');
  tasks.forEach(t => console.log(`${t.id}: ${t.task}`));
}

function removeTask(id) {
  let tasks = loadTasks();
  const initialLength = tasks.length;
  tasks = tasks.filter(t => t.id !== id);
  saveTasks(tasks);
  if (tasks.length < initialLength) {
    console.log('Task removed.');
  } else {
    console.log('Task not found.');
  }
}

module.exports = { addTask, listTasks, removeTask };
