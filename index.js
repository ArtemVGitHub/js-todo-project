'use strict';
// Enter data
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

// Todo-list elements
listItemTemplate.querySelector('div').classList.add('view');
listItemTemplate.querySelector('input').classList.add('toggle');
listItemTemplate.querySelector('input').setAttribute('type', 'chekbox');
listItemTemplate.querySelector('button').classList.add('destroy');

// Add information from Enter data to List item Templete 
let createListItem = function (tasks) {

	let listItem = listItemTemplate.cloneNode(true);

	listItem.querySelector('label').textContent = tasks.text;

	return listItem;
};

// Reder tasks using a List item Templete  
const fragment = document.createDocumentFragment();

let renderTasks = function () {

	todoList.textContent = "";

	for (let i = 0; i < tasksList.length; i++) {
		fragment.appendChild(createListItem(tasksList[i]));
	}

	todoList.appendChild(fragment);
};

renderTasks();