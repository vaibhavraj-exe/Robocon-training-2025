// Variables 
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');
const addTaskBtn = document.getElementById('addTaskBtn');
const incompleteCount = document.getElementById('incompleteCount');
const completedCount = document.getElementById('completedCount');
const clearTasksBtn = document.getElementById('clearTasksBtn'); // Clear button

let incompleteTasks = 0;
let completedTasks = 0;

// Load tasks from localStorage when the page loads
window.onload = function() {
    let tasks = localStorage.getItem('tasks');
    if (tasks) {
        tasks = tasks.split('|');  // Split tasks by '|'
        for (let i = 0; i < tasks.length; i++) {
            let taskData = tasks[i].split('::');
            let task = taskData[0];
            let isCompleted = taskData[1] === 'true';

            addTaskToList(task, isCompleted);
        }
    }
    updateTaskCounters();
}

// Add task button click event
addTaskBtn.addEventListener('click', function() {
    let task = taskInput.value.trim();
    if (task !== "") {
        addTaskToList(task, false);
        saveTask(task, false);
        taskInput.value = ''; // Clear the input field
        updateTaskCounters();
    }
});

// Function to add task to the list (with optional completion state)
function addTaskToList(task, completed) {
    let li = document.createElement('li');
    let span = document.createElement('span');
    span.textContent = task;

    let deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'X';
    deleteBtn.className = 'delete-btn';

    li.appendChild(span);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);

    // Update the task state (complete/incomplete)
    if (completed) {
        li.style.textDecoration = 'line-through';
        completedTasks++;
    } else {
        incompleteTasks++;
    }

    // Mark task as completed or incomplete when clicked
    li.addEventListener('click', function() {
        if (li.style.textDecoration === 'line-through') {
            li.style.textDecoration = 'none';
            incompleteTasks++;
            completedTasks--;
        } else {
            li.style.textDecoration = 'line-through';
            incompleteTasks--;
            completedTasks++;
        }
        saveTask(task, li.style.textDecoration === 'line-through');
        updateTaskCounters();
    });

    // Delete task when 'X' button is clicked
    deleteBtn.addEventListener('click', function() {
        // Check if the task was completed or incomplete before deleting
        if (li.style.textDecoration === 'line-through') {
            completedTasks--;  // Decrement completed tasks count
        } else {
            incompleteTasks--;  // Decrement incomplete tasks count
        }

        taskList.removeChild(li); // Remove the task from the DOM
        deleteTask(task);
        updateTaskCounters();
    });
}

// Function to save task to localStorage
function saveTask(task, isCompleted) {
    let tasks = localStorage.getItem('tasks') || '';
    let taskString = task + '::' + isCompleted;
    let updatedTasks = tasks ? tasks.split('|').filter(t => !t.startsWith(task)).concat(taskString) : [taskString];
    localStorage.setItem('tasks', updatedTasks.join('|'));
}

// Function to delete task from localStorage
function deleteTask(taskToRemove) {
    let tasks = localStorage.getItem('tasks') || '';
    let updatedTasks = tasks.split('|').filter(function(task) {
        return !task.startsWith(taskToRemove);
    });
    localStorage.setItem('tasks', updatedTasks.join('|')); // Update localStorage after deletion
}

// Function to update the counters for incomplete and completed tasks
function updateTaskCounters() {
    incompleteCount.textContent = incompleteTasks >= 0 ? incompleteTasks : 0;
    completedCount.textContent = completedTasks >= 0 ? completedTasks : 0;
}

// Clear all tasks and reset the counters
clearTasksBtn.addEventListener('click', function() {
    // Clear the task list in localStorage
    localStorage.removeItem('tasks');
    
    // Remove all tasks from the DOM
    taskList.innerHTML = '';

    // Reset task counters
    incompleteTasks = 0;
    completedTasks = 0;
    updateTaskCounters();
});

