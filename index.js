'use strict';

const tasksList = [
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

const createNewTask = function () {

	let newTask = {
		id: getId(tasksList),
		text: "выучить css",
		completed: true
	};
	tasksList.push(newTask);
	renderTasks();
};

createNewTask();

const deleteTask = function (arr, id) {
	var i = 0;
	while (i < arr.length) {
		if (arr[i].id === id) {
			arr.splice(i, 1);
		} else {
			++i;
		}
	}
	return arr;
};

todoList.addEventListener('click', function (event) {

	let closeButtons = todoList.querySelectorAll('.destroy');
	let closeBtn = event.target;

	if (closeBtn && closeBtn.matches('.destroy')) {
		for (let i = 0; i < closeButtons.length; i++) {
			if (closeBtn == closeButtons[i]) {
				deleteTask(tasksList, tasksList[i].id + '');
				break;
			}
		}
	}
	renderTasks();
});