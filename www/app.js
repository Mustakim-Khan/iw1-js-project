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

    /*    let p = document.createElement('p');
        p.innerText = taskTitle;
        main.append(p);*/
});

// view task info
let taskModalContainer = document.createElement('div');
taskModalContainer.setAttribute('id', 'myModal');
taskModalContainer.classList.add('modal');

let taskModalContent = document.createElement('div');
taskModalContent.classList.add('modal-content');

let closeButton = document.createElement('span');
closeButton.classList.add('close');
closeButton.innerHTML = '&times;';

let taskEditForm = document.createElement('form');
taskEditForm.setAttribute('method', 'post');
taskEditForm.setAttribute('action', '');

let taskEditFormSubmitButton = document.createElement('input');
taskEditFormSubmitButton.setAttribute('type', 'submit');

let taskIdDiv = document.createElement('div');
taskIdDiv.style.display = 'flex';
let taskTitleDiv = document.createElement('div');
taskTitleDiv.style.display = 'flex';
let taskStatusDiv = document.createElement('div');
taskStatusDiv.style.display = 'flex';
let taskContentDiv = document.createElement('div');
taskContentDiv.style.display = 'flex';

let taskId = document.createElement('p');
let taskTitle = document.createElement('input');
let taskStatus = document.createElement('p');
let taskContent = document.createElement('input');
taskTitle.setAttribute('type', 'text');
taskStatus.setAttribute('type', 'text');
taskContent.setAttribute('type', 'text');

let taskIdLabel = document.createElement('p');
taskIdLabel.innerText = 'Id : ';
let taskTitleLabel = document.createElement('p');
taskTitleLabel.innerText = 'Titre : ';
let taskStatusLabel = document.createElement('p');
taskStatusLabel.innerText = 'Statut : ';
let taskContentLabel = document.createElement('p');
taskContentLabel.innerText = 'Contenu : ';

taskEditForm.append(taskTitle);
taskEditForm.append(taskStatus);
taskEditForm.append(taskContent);
taskEditForm.append(taskEditFormSubmitButton);

taskModalContent.append(closeButton);
taskModalContent.append(taskEditForm);
console.log(taskEditForm.innerHTML);
taskIdDiv.append(taskIdLabel);
taskTitleDiv.append(taskTitleLabel);
taskStatusDiv.append(taskStatusLabel);
taskContentDiv.append(taskContentLabel);

taskModalContent.append(taskIdDiv);
taskModalContent.append(taskTitleDiv);
taskModalContent.append(taskStatusDiv);
taskModalContent.append(taskContentDiv);

/*
taskModalContent.append(taskId);
taskModalContent.append(taskTitle);
taskModalContent.append(taskStatus);
taskModalContent.append(taskContent);
*/

taskModalContainer.append(taskModalContent);

main.append(taskModalContainer);

closeButton.addEventListener('click', () => {
    taskModalContainer.style.display = 'none';
});

let cards = document.querySelectorAll('.card');
cards.forEach((card) => {
    card.addEventListener('click', () => {
        const cardId = parseInt(card.dataset.id);
        allTasks.forEach((task) => {
            if (task._id === cardId) {
/*                taskId.innerText = `${ task._id }`;
                taskIdDiv.append(taskId);
                taskTitle.value = `${ task._title }`;
                taskTitleDiv.append(taskTitle);
                taskStatus.innerText = `${ task._status }`;
                taskStatusDiv.append(taskStatus);
                taskContent.value = `${ task._content }`;
                taskContentDiv.append(taskContent);*/
                taskModalContainer.style.display = 'block';
            }
        });
    });
});

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
