// Tasks variables
const STATUS_TO_PLAN = 'A Planifier';
const STATUS_DOING = 'En cours';
const STATUS_TO_VALIDATE = 'A Valider';
const STATUS_DONE = 'Fait';
let currentTaskId = 1;
let allTasks = (localStorage.tasks ? JSON.parse(localStorage.tasks) : []);

const kanban = document.getElementById("kanban");
const task = document.getElementById("task");
const fillTasksButton = document.getElementById("fillTasksButton");
const main = document.getElementById('main');

kanban.addEventListener("click", (e) => {
  history.pushState(
    {
      page: "Kanban",
    },
    null,
    "/kanban"
  );
});

task.addEventListener("click", (e) => {
  history.pushState(
    {
      page: "Task",
    },
    null,
    "/tasks"
  );
});

fillTasksButton.addEventListener("click", (e) => {
    let t1 = new Task(STATUS_TO_PLAN, "To Plan 1", "To Plan 1 Content");
    let t2 = new Task(STATUS_TO_PLAN, "To Plan 2", "To Plan 2 Content");
    let t3 = new Task(STATUS_DOING, "Doing 1", "Doing 1 Content")
    let t4 = new Task(STATUS_DOING, "Doing 2", "Doing 2 Content")
    let t5 = new Task(STATUS_TO_VALIDATE, "To Validate 1", "To Validate 1 Content");
    let t6 = new Task(STATUS_TO_VALIDATE, "To Validate 2", "To Validate 2 Content");
    let t7 = new Task(STATUS_DONE, "Done 2", "Done 2 Content");
    let t8 = new Task(STATUS_DONE, "Done 2", "Done 2 Content");
    console.log(t1);
    console.log(t2);
    console.log(t3);
    console.log(t4);
    console.log(t5);
    console.log(t6);
    console.log(t7);
    console.log(t8);
})

// Task
class Task {
    constructor(status, title, content) {
        this._id = currentTaskId;
        this._status = status;
        this._title = title;
        this._content = content;
        currentTaskId++;
    }

    get id() {
        return this._id;
    }

    get status() {
        return this._status;
    }

    set status(value) {
        this._status = value;
    }

    get title() {
        return this._title;
    }

    set title(value) {
        this._title = value;
    }

    get content() {
        return this._content;
    }

    set content(value) {
        this._content = value;
    }
}



let form = document.createElement('form');
form.setAttribute('method', 'post');
form.setAttribute('action', '');

let inputText = document.createElement('input');
let inputButton = document.createElement('input');

inputText.setAttribute('type', 'text');
inputText.setAttribute('name', 'name');
inputText.setAttribute('value', '');
inputText.setAttribute('placeholder', 'Nom de la tâche');
inputButton.setAttribute('type', 'button');
inputButton.setAttribute('value', 'Créer');

form.append(inputText);
form.append(inputButton);

main.append(form);

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const taskTitle = inputText.value;
    inputText.value = '';

    let task = new Task(STATUS_TO_PLAN, taskTitle, '');
    allTasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(allTasks));

    displayStoredTasks();

    let p = document.createElement('p');
    p.innerText = taskTitle;
    main.append(p);
});

const displayStoredTasks = () => {
    console.clear();
    let div = document.createElement('div');
    

    let storedTasks = JSON.parse(localStorage.getItem('tasks'));
    storedTasks.forEach((task) => {
        console.log(task);
    })
}

/*
class Kanban {
    constructor(tasks) {
        this.tasks = [tasks];
    }
}


const f = () => {
    let task1 = new Task(1, "todo","Title 1", "Content 1");
    let task2 = new Task(2, "todo","Title 2", "Content 2");
    let kanban = new Kanban([task1, task2]);
    localStorage.setItem("kanban", JSON.stringify(kanban));
    let t = localStorage.getItem("kanban");
    console.log(JSON.parse(t)._status);
}
*/
