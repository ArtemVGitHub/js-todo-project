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

listItemTemplate.querySelector('div').classList.add('view');
listItemTemplate.querySelector('input').classList.add('toggle');
listItemTemplate.querySelector('input').setAttribute('type', 'chekbox');
listItemTemplate.querySelector('button').classList.add('destroy');

const createListItem = function (task) {

	let listItem = listItemTemplate.cloneNode(true);

	listItem.querySelector('label').textContent = task.text;

	return listItem;
};

const fragment = document.createDocumentFragment();

const renderTasks = function () {

	todoList.textContent = "";

	for (let i = 0; i < tasksList.length; i++) {
		fragment.appendChild(createListItem(tasksList[i]));
	}

	todoList.appendChild(fragment);
};

renderTasks();

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
	renderTasks();
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
	return tasksList;
};

todoList.addEventListener('click', function (event) {

	let closeButtons = todoList.querySelectorAll('.destroy');
	let closeBtn = event.target;

	if (closeBtn && closeBtn.matches('.destroy')) {
		for (let i = 0; i < closeButtons.length; i++) {
			if (closeBtn == closeButtons[i]) {
				deleteTask(tasksList[i].id + '');
				break;
			}
		}
	}
	renderTasks();
});
