const todoCountValue = document.querySelector('.todo-count strong');
const countActiveTasks = function (tasks) {
	let activeTasksCounter = 0;
	for (let i = 0; i < tasks.length; i++) {
		if (!tasks[i].completed) {
			activeTasksCounter++;
		}
	};
	todoCountValue.textContent = activeTasksCounter;
};

const footerSection = document.querySelector('footer');
const checkFooter = function () {
	footerSection.style = tasksList.length > 0 ? "display: block" : "display: none";
};