let tasks = [];

const addTask = () => {
    const taskInput = document.getElementById('taskInput');
    const text = taskInput.value.trim();

    if (text) {
        tasks.push({ text: text, completed: false });
        updateTaskslist();
        taskInput.value = ''; // Clear input field after adding task
    }
};

const toggleTaskcomplete = (index, checkbox) => {
    tasks[index].completed = checkbox.checked; // Toggle the completed status
    updateProgressBar();

    const taskItem = checkbox.closest('.task');
    if (tasks[index].completed) {
        taskItem.classList.add('completed'); // Add the completed class to apply line-through
    } else {
        taskItem.classList.remove('completed'); // Remove the completed class
    }
    updateProgressBar();
};

const deleteTask = (index) => {
    tasks.splice(index, 1); // Remove the task from the tasks array
    updateTaskslist();
    updateProgressBar();
};

const editTask = (index) => {
    const taskInput = document.getElementById('taskInput')
    taskInput.value = tasks[index].text;

    tasks.splice(index, 1);
    updateTaskslist();
    updateProgressBar();
};

const updateProgressBar = () => {
    const progressElement = document.getElementById("progress");
    const completedTasks = tasks.filter(task => task.completed).length;
    const totalTasks = tasks.length;

    const percentage = totalTasks === 0 ? 0 : (completedTasks / totalTasks) * 100;
    progressElement.style.width = `${percentage}%`;

    // Optional: Update the progress text (e.g., "2/3")
    const numbersElement = document.getElementById("numbers");
    numbersElement.textContent = `${completedTasks}/${totalTasks}`;
};
 
const updateTaskslist = () => {
    const taskList = document.getElementById("task-list");
    taskList.innerHTML = ""; // Clear current task list
    tasks.forEach((task, index) => {
        const listItem = document.createElement("li");

        listItem.innerHTML = `
        <div class="taskItem">
            <div class="task ${task.completed ? "completed" : ""}">
                <input type="checkbox" class="checkbox" ${task.completed ? "checked" : ""} />
                <p>${task.text}</p>
            </div>
            <div class="icon">
                <img src="edit.png" onClick="editTask(${index})" />
                <img src="bin.png" onClick="deleteTask(${index})" />
            </div>
        </div>
        `;

        // Attach the event listener to the checkbox
        const checkbox = listItem.querySelector('.checkbox');
        checkbox.addEventListener("change", () => toggleTaskcomplete(index, checkbox));
        
        taskList.append(listItem);
        updateProgressBar();
    });
};

document.getElementById("addTask").addEventListener("click", function (e) {
    e.preventDefault();
    addTask();
});