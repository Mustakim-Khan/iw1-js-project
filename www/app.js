// Tasks variables
const STATUS_TO_PLAN = 'A Planifier';
const STATUS_DOING = 'En cours';
const STATUS_TO_VALIDATE = 'A Valider';
const STATUS_DONE = 'Fait';
let nextTaskId = (localStorage.getItem('nextTaskId') ? parseInt(localStorage.getItem('nextTaskId')) : 1);
let allTasks = (localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : []);


const kanban = document.getElementById("kanban");
const task = document.getElementById("task");
const fillTasksButton = document.getElementById("fillTasksButton");
const main = document.getElementById('main');

const fillContainer = (container) => {
    allTasks.forEach((task) => {
        let card = document.createElement('div');
        card.setAttribute('data-id', task._id);
        card.setAttribute('class', 'card');
        let p = document.createElement('p');
        p.setAttribute('class', 'card-title');
        p.innerText = task._title;
        card.append(p);
        container.append(card);
    });
}

const displayStoredTasks = () => {
    if (allTasks.length > 0) {
        let cardsContainer = document.getElementById('cards-container');
        if (cardsContainer === null) {
            cardsContainer = document.createElement('div');
            cardsContainer.setAttribute('id', 'cards-container');
            fillContainer(cardsContainer);
            main.append(cardsContainer);
        } else {
            let newCardsContainer = document.createElement('div');
            newCardsContainer.setAttribute('id', 'cards-container');
            fillContainer(newCardsContainer);
            main.replaceChild(newCardsContainer, cardsContainer);
        }
    }
}

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
        this._id = nextTaskId;
        this._status = status;
        this._title = title;
        this._content = content;
        nextTaskId++;
        localStorage.setItem('nextTaskId', nextTaskId.toString());
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

// task creation taskCreationForm
let taskCreationForm = document.createElement('form');
taskCreationForm.setAttribute('method', 'post');
taskCreationForm.setAttribute('action', '');

let inputText = document.createElement('input');
let inputButton = document.createElement('input');

inputText.setAttribute('type', 'text');
inputText.setAttribute('name', 'name');
inputText.setAttribute('value', '');
inputText.setAttribute('placeholder', 'Nom de la tâche');
inputButton.setAttribute('type', 'button');
inputButton.setAttribute('value', 'Créer');

taskCreationForm.append(inputText);
taskCreationForm.append(inputButton);

main.append(taskCreationForm);
displayStoredTasks();

taskCreationForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const taskTitle = inputText.value;
    inputText.value = '';

    let task = new Task(STATUS_TO_PLAN, taskTitle, '');
    allTasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(allTasks));

    displayStoredTasks();
});
