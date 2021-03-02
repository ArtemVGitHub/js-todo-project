'use strict';

const getLocalstorage = function () {
	return JSON.parse(localStorage.getItem('tasksList')) ?? [];
};

let tasksList = getLocalstorage();

const updateLocalStorage = (tasks) => {
	localStorage.setItem('tasksList', JSON.stringify(tasks));
	return JSON.parse(localStorage.getItem('tasksList')) ?? [];
};