const clearCompletedButton = document.querySelector('.clear-completed');
const checkClearCompleted = function (tasks) {
	for (let i = 0; i < tasks.length; i++) {
		clearCompletedButton.style = "display: none";
		if (tasks[i].completed) {
			clearCompletedButton.style = "display: block";
			break;
		}
	}
};
clearCompletedButton.addEventListener('click', function () {
	deleteCompletedTasks(tasksList);
});

const getId = function (idsDataArray) {
	let currentTaskId = 0;

	for (let i = 0; i < idsDataArray.length; i++) {
		if (+idsDataArray[i].id > currentTaskId) {
			currentTaskId = +idsDataArray[i].id;
		}
	}

	return (currentTaskId + 1) + '';
};

const createNewTask = function (text) {
	let newTask = {
		id: getId(tasksList),
		text: text,
		completed: false
	};
	tasksList.push(newTask);
	renderTasks(tasksList);
};

const taskInput = document.querySelector('.new-todo');

taskInput.addEventListener('keydown', function (event) {
	if (event.code == 'Enter' && taskInput.value !== '') {
		let taskInputValue = taskInput.value;
		createNewTask(taskInputValue);
		taskInput.value = '';
	}
});

const deleteTask = function (id) {
	tasksList = tasksList.filter((task) => task.id !== id);
	renderTasks(tasksList);
};

const toogleTask = function (task, taskCheckElement) {
	task.completed = !task.completed;
	taskCheckElement.checked = task.completed;
	taskCheckElement.parentElement.parentElement.classList.toggle('completed');
	countActiveTasks(tasksList);
	checkClearCompleted(tasksList);
	updateLocalStorage(tasksList);
};

const deleteCompletedTasks = function (tasks) {
	tasks = tasks.filter((task) => !task.completed);
	tasksList = tasks;
	renderTasks(tasksList);
};