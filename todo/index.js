// Entry point for CLI todo app
const { addTask, listTasks, removeTask } = require('./taskManager');

const [,, command, ...args] = process.argv;

switch(command) {
  case 'add':
    addTask(args.join(' '));
    break;
  case 'list':
    listTasks();
    break;
  case 'remove':
    removeTask(parseInt(args[0], 10));
    break;
  default:
    console.log('Please enter a valid command: add, list, or remove.');
}
