const todoList = document.querySelector('.todo-list');
const listItemTemplate = document.querySelector('#list-item-template').content.querySelector('li');
listItemTemplate.querySelector('div').classList.add('view');
listItemTemplate.querySelector('input').classList.add('toggle');
listItemTemplate.querySelector('input').setAttribute('type', 'checkbox');
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