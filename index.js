'use strict';

let tasksList = [
	{ id: "1", text: "выучить html", completed: true },
	{ id: "2", text: "выучить css", completed: true },
	{ id: "3", text: "выучить js", completed: false },
	{ id: "4", text: "выучить фреймворк", completed: false },
	{ id: "5", text: "написать несколько учебных проектов", completed: false },
	{ id: "6", text: "пройти собеседование", completed: false },
	{ id: "7", text: "получить работу", completed: false }
];

const todoList = document.querySelector('.todo-list');
const listItemTemplate = document.querySelector('#list-item-template').content.querySelector('li');
let todoCountValue = document.querySelector('.todo-count strong');

listItemTemplate.querySelector('div').classList.add('view');
listItemTemplate.querySelector('input').classList.add('toggle');
listItemTemplate.querySelector('input').setAttribute('type', 'chekbox');
listItemTemplate.querySelector('button').classList.add('destroy');

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


const fragment = document.createDocumentFragment();

const renderTasks = function (tasks) {

	todoList.textContent = "";
	for (let i = 0; i < tasks.length; i++) {
		fragment.appendChild(createListItem(tasks[i]));
	}
	todoList.appendChild(fragment);
	countActiveTasks(tasksList);	
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
};

const deleteCompletedTasks = function (tasks) {
	tasks = tasks.filter((task) => task.completed === false);
	tasksList = tasks;
	renderTasks(tasksList);
};

const clearCompletedButton = document.querySelector('.clear-completed');

clearCompletedButton.addEventListener('click', function () {
	deleteCompletedTasks(tasksList);
});