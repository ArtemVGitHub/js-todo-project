'use strict';

const todoList = document.querySelector('.todo-list');
const listItemTemplate = document.querySelector('#list-item-template').content.querySelector('li');
const todoCountValue = document.querySelector('.todo-count strong');
const clearCompletedButton = document.querySelector('.clear-completed');
const filtersLinks = document.querySelectorAll('.filters a');
const footerSection = document.querySelector('footer');

listItemTemplate.querySelector('div').classList.add('view');
listItemTemplate.querySelector('input').classList.add('toggle');
listItemTemplate.querySelector('input').setAttribute('type', 'chekbox');
listItemTemplate.querySelector('button').classList.add('destroy');


const getLocalstorage = function () {
	return JSON.parse(localStorage.getItem('tasksList')) ?? [];
};

let tasksList = getLocalstorage();

const updateLocalStorage = (tasks) => {
	localStorage.setItem('tasksList', JSON.stringify(tasks));
	return JSON.parse(localStorage.getItem('tasksList')) ?? [];
};

const createListItem = function (task) {

	let listItem = listItemTemplate.cloneNode(true);

	if (task.completed) {
		listItem.classList.add('completed');
	}
	listItem.querySelector('label').textContent = task.text;
	listItem.querySelector('.destroy').addEventListener('click', function () {
		deleteTask(task.id);
	});
	listItem.querySelector('input').addEventListener('click', function (evt) {
		toogleTask(task, evt.target);
	});

	return listItem;
};
const countActiveTasks = function (tasks) {
	let activeTasksCounter = 0;
	for (let i = 0; i < tasks.length; i++) {
		if (!tasks[i].completed) {
			activeTasksCounter++;
		}
	};
	todoCountValue.textContent = activeTasksCounter;
};
const checkClearCompleted = function (tasks) {
	for (let i = 0; i < tasks.length; i++) {
		clearCompletedButton.style = "display: none";
		if (tasks[i].completed) {
			clearCompletedButton.style = "display: block";
			break;
		}
	}
};
const checkFooter = function () {
	footerSection.style = tasksList.length > 0 ? "display: block" : "display: none";
};

const fragment = document.createDocumentFragment();

const renderTasks = function (tasks) {

	todoList.textContent = "";
	for (let i = 0; i < tasks.length; i++) {
		fragment.appendChild(createListItem(tasks[i]));
	}
	todoList.appendChild(fragment);
	countActiveTasks(tasks);
	checkClearCompleted(tasks);
	checkFooter();
	updateLocalStorage(tasksList);
};

renderTasks(tasksList);

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

clearCompletedButton.addEventListener('click', function () {
	deleteCompletedTasks(tasksList);
});

const filterTasks = function (tasks, filter) {
	let sortedTaskList = [];
	switch (filter) {
		case "#/active":
			sortedTaskList = tasks.filter((task) => !task.completed);
			break;
		case "#/completed":
			sortedTaskList = tasks.filter((task) => task.completed);
			break;
		default:
			sortedTaskList = tasks;
			break;
	}
	renderTasks(sortedTaskList);
};

const selectActiveFilter = function (filter) {
	filtersLinks.forEach(link => {
		link.classList.remove('selected');
	});
	filter.classList.add('selected');
};

const switchFilters = function (evt) {
	selectActiveFilter(evt.target)
	let filterHref = evt.target.getAttribute('href');
	filterTasks(tasksList, filterHref);
};

const checkFilter = function (tasks) {
	const hash = window.location.hash;
	filterTasks(tasksList, hash);
	filtersLinks.forEach(link => {
		if (link.getAttribute('href') == hash) {
			selectActiveFilter(link);
		}
	});
};

checkFilter();