// Tasks will store each task in sequential order (an array)
// this is the only way of refering to the data in the
// computer
const tasks = loadTasks();

// Classes will allow us to store different properties
// about a task into a single variable.
class Task {
    constructor(name) {
        const now = Date.now();
        this.name = name;
        this.id = `task-${now}`
    }
}

// Manage Local Storage

// storeTasks:  Will store the tasks array into local storage
// so that it can remain there forever.
function storeTasks() {
    const stringified = JSON.stringify(tasks);
    localStorage.setItem('tasks', stringified);
}

// The reason we use JSON stringify/parse is because localStorage only
// intakes strings and outputs as strings. So JSON prepares our data
// into a string and using JSON.parse that will revert the effects.
// Stringify:
// Number 2                        -> "2"
// Array [1, 2, 3]                 -> "[1, 2, 3]"
// Object { name: "Walk the Dog" } -> "{ "name": "Walk the dog" }"

// Parse:
// String "2":                  -> Number 2
// String "[1, 2, 3]"           -> Array [1, 2, 3]
// "{ "name": "Walk the dog" }" -> Object { name: "Walk the Dog" }

// loadTasks: Takes the array out of local storage, parses it
// and returns the array. (used on line 1)
function loadTasks() {
    const store = JSON.parse(localStorage.getItem(`tasks`));
    return store;
}

function onTaskEdit(id) {
    // 2. when they click the button it should use the
    // `prompt()` function to ask them what they want to rename the task to
    // let answer = prompt(message to the user as a string)
    let newName = prompt('Edit Task')
    // 3. then find the task in the array and set the name by doing
    // `task.name = newName`
    // use a "For of loop"
    for (let task of tasks) {
        if (task.id == id) {
            task.name = newName;
        }
        
    }

    // 4. store that in local storage
    storeTasks();
    location.reload()
    // 5. refresh the webpage

}

// addTaskToPage: Renders a task onto the webpage (document).
function addTaskToPage(name, id) {
    const taskDiv = document.createElement('div');

    taskDiv.className = 'task';
    taskDiv.id = id

    const taskName = document.createElement('p');
    taskName.className = 'task-text';
    taskName.innerHTML = name;
    
    const checkmarkButton = document.createElement('button');

    // The arrow function "() => {}" copies all of the variables
    // of the function it's inside of (in this case it's addTaskToPage)
    // and makes it accessible to the arrow function's body (the "{}"
    // curly brackets)
    checkmarkButton.onclick = () => {
        onTaskClick(id);
    };
    checkmarkButton.className = 'task-checkmark';

    const checkmarkP = document.createElement('p');
    checkmarkP.className = 'fas fa-check';

    const editButton = document.createElement('button');
    editButton.className = 'task-checkmark';
    editButton.id = 'edit-button';
    editButton.onclick = () => {
        onTaskEdit(id);
        
    }
    const editButtonP = document.createElement('p');
    editButtonP.className = 'fas fa-pencil-alt';
    editButton.appendChild(editButtonP);

    const tasklist = document.getElementById('task-list');
    checkmarkButton.appendChild(checkmarkP);
    taskDiv.appendChild(checkmarkButton);
    
    taskDiv.appendChild(taskName);
    taskDiv.appendChild(editButton);
    tasklist.appendChild(taskDiv);
}

// addTask: Add to the array and store the
// array into local storage.
function addTask(task) {
    tasks.push(task);
    storeTasks();
}

// removeTask: Removes a task by it's ID
// inside the array (splicing) and storing
// the array into local storage
function removeTask(id) {
    // Sugar Syntax:
    // for (let task of tasks) {
    // }

    // Original: The reason we use the original
    // is to get the index number of each task
    // so we can properly splice it.
    for (let i = 0; i < tasks.length; i += 1) {
       let task = tasks[i];
       if (task.id == id) {
           tasks.splice(i, 1);
       }
    }
    storeTasks();
}

// Event Management Functions
// These functions handle events that occur
// while the user is using the webpage such
// as "clicking" or "reloading" the page.

// onPageLoad: This function will run when
// the webpage (document) is done loading.
function onPageLoad() {
    for (const task of tasks) {
        // Renders every task inside the array
        // by calling addTaskToPage
        addTaskToPage(task.name, task.id);
    }
}

// onTaskClick: this function will run when
// the user clicks the checkmark next to each
// task. It then removes that task from the
// webpage, inside the array, and then stores
// it all into local storage.
function onTaskClick(id) {
    let taskDiv = document.getElementById(id);
    const taskList = document.getElementById('task-list');
    taskList.removeChild(taskDiv);
    removeTask(taskDiv.id);
}

// onTaskSubmit: This will run when the user
// clicks the submit button or presses enter
// while typing in a new task in the textbox.
function onTaskSubmit() {
    const textBox = document.getElementById('task-submit-text');
    const taskName = textBox.value;
    const task = new Task(taskName);
    addTask(task);
}

// Creating a bunch of functionality for it
// all to work together in the end and by
// the time you are running/testing it all
// is when you catch errors, fix, or change
// your code based on the outcome.

// Write comments! "// Message" which allows
// programmers to give themselves or each other
// notes inside the code.
