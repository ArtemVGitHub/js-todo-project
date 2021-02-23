const filtersLinks = document.querySelectorAll('.filters a');

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