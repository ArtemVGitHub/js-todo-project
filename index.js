'use strict';

const task = {
	id: "1",
	text: "выучить html",
	completed: true
};
const todoList = document.querySelector('.todo-list');
const listItemTemplate = document.querySelector('#list-item-template').content.querySelector('li');

listItemTemplate.querySelector('div').classList.add('view');
listItemTemplate.querySelector('input').classList.add('toggle');
listItemTemplate.querySelector('input').setAttribute('type', 'chekbox');
listItemTemplate.querySelector('button').classList.add('destroy');

let createListItem = function (task) {

	let listItem = listItemTemplate.cloneNode(true);

	listItem.querySelector('label').textContent = task.text;

	return listItem;

};

const fragment = document.createDocumentFragment();

let renderTask = function () {

	fragment.appendChild(createListItem(task));
	todoList.appendChild(fragment);

};

renderTask();