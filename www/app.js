// Common variables
const main = document.getElementById('main');
const kanban = document.getElementById("kanban");
const task = document.getElementById("task");

kanban.addEventListener("click", (e) => {
    history.pushState(
        {
            lastPage: location.pathname,
        },
        null,
        "/kanban"
    );
    window.dispatchEvent(new Event('pathnamechange'));
});

task.addEventListener("click", (e) => {
    history.pushState(
        {
            lastPage: location.pathname,
        },
        null,
        "/tasks"
    );
    window.dispatchEvent(new Event('pathnamechange'));
});


class Kanban {
    constructor() {
        this.toPlanTasks = [];
        this.doingTasks = [];
        this.toValidateTasks = [];
        this.doneTasks = [];

        if (allTasks.length > 0) {
            allTasks.forEach((task) => {
                switch (task._status) {
                    case STATUS_TO_PLAN:
                        kanbanBoard.toPlanTasks.push(task);
                        break;
                    case STATUS_DOING:
                        kanbanBoard.doingTasks.push(task);
                        break;
                    case STATUS_TO_VALIDATE:
                        kanbanBoard.toValidateTasks.push(task);
                        break;
                    case STATUS_DONE:
                        kanbanBoard.doneTasks.push(task);
                        break;
                }
            });
        }
        localStorage.setItem('kanban', JSON.stringify(this));
    }
}

const emptyKanbanBoard = () => {
    if (kanbanBoard) {
        kanbanBoard.toPlanTasks = [];
        kanbanBoard.doingTasks = [];
        kanbanBoard.toValidateTasks = [];
        kanbanBoard.doneTasks = [];
    }
}

const updateKanbanBoard = () => {
    emptyKanbanBoard();
    if (allTasks.length > 0) {
        allTasks.forEach((task) => {
            switch (task._status) {
                case STATUS_TO_PLAN:
                    kanbanBoard.toPlanTasks.push(task);
                    break;
                case STATUS_DOING:
                    kanbanBoard.doingTasks.push(task);
                    break;
                case STATUS_TO_VALIDATE:
                    kanbanBoard.toValidateTasks.push(task);
                    break;
                case STATUS_DONE:
                    kanbanBoard.doneTasks.push(task);
                    break;
            }
        });
    }
}


// Tasks variables
const VIBRATION_LENGTH = 500;
const STATUS_TO_PLAN = 'A Planifier';
const STATUS_DOING = 'En cours';
const STATUS_TO_VALIDATE = 'A Valider';
const STATUS_DONE = 'Fait';
let nextTaskId = (localStorage.getItem('nextTaskId') ? parseInt(localStorage.getItem('nextTaskId')) : 1);
let allTasks = (localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : []);

// Kanban variables
let kanbanBoard = (localStorage.getItem('kanban') ? JSON.parse(localStorage.getItem('kanban')) : new Kanban());

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

// /tasks page
let cardsContainer = document.getElementById('cards-container');
const fillTasksButton = document.getElementById("fillTasksButton");

let errorDiv = document.createElement('div');
let errorMessage = document.createElement('p');
errorDiv.append(errorMessage);

let taskCreationForm = document.createElement('form');
taskCreationForm.setAttribute('method', 'post');
taskCreationForm.setAttribute('action', '');

let inputTitle = document.createElement('input');
let selectStatus = document.createElement('select');
let inputContent = document.createElement('input');
let inputButton = document.createElement('input');

inputTitle.setAttribute('type', 'text');
inputTitle.setAttribute('name', 'titleInput');
inputTitle.setAttribute('value', '');
inputTitle.setAttribute('placeholder', 'Nom de la tâche');
inputTitle.setAttribute('required', 'required');

inputContent.setAttribute('type', 'text');
inputContent.setAttribute('name', 'contentInput');
inputContent.setAttribute('value', '');
inputContent.setAttribute('placeholder', 'Contenu de la tâche');
inputContent.setAttribute('required', 'required');

inputButton.setAttribute('type', 'button');
inputButton.setAttribute('value', 'Créer');

let optionToPlan = document.createElement('option');
optionToPlan.value = STATUS_TO_PLAN;
optionToPlan.text = STATUS_TO_PLAN;
selectStatus.append(optionToPlan);

let optionDoing = document.createElement('option');
optionDoing.value = STATUS_DOING;
optionDoing.text = STATUS_DOING;
selectStatus.append(optionDoing);

let optionDone = document.createElement('option');
optionDone.value = STATUS_DONE;
optionDone.text = STATUS_DONE;
selectStatus.append(optionDone);

let optionToValidate = document.createElement('option');
optionToValidate.value = STATUS_TO_VALIDATE;
optionToValidate.text = STATUS_TO_VALIDATE;
selectStatus.append(optionToValidate);

taskCreationForm.append(inputTitle);
taskCreationForm.append(selectStatus);
taskCreationForm.append(inputContent);
taskCreationForm.append(inputButton);

const fillCardsContainer = (container) => {
    allTasks.forEach((task) => {
        if (task._status === STATUS_TO_PLAN) {
            let card = document.createElement('div');
            card.setAttribute('data-id', task._id);
            card.setAttribute('class', 'card');
            let p = document.createElement('p');
            p.setAttribute('class', 'card-title');
            p.innerText = task._title;
            card.append(p);
            container.append(card);
        }
    });
}

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
});

const displayStoredTasksOnComeInPage = () => {
    if (allTasks.length > 0) {
        if (cardsContainer === null) {
            cardsContainer = document.createElement('div');
            cardsContainer.setAttribute('id', 'cards-container');
            fillCardsContainer(cardsContainer);
            main.append(cardsContainer);
            return cardsContainer;
        }
    }
}

const displayStoredTasksOnAdd = () => {
    if (allTasks.length > 0) {
        if (cardsContainer === null) {
            cardsContainer = document.createElement('div');
            cardsContainer.setAttribute('id', 'cards-container');
            fillCardsContainer(cardsContainer);
            main.append(cardsContainer);
            return cardsContainer;
        } else {
            let newCardsContainer = document.createElement('div');
            newCardsContainer.setAttribute('id', 'cards-container');
            fillCardsContainer(newCardsContainer);
            main.replaceChild(newCardsContainer, cardsContainer);
            return newCardsContainer;
        }
    }
}

// task creation => taskCreationForm
const taskInfoHandler = () => {
    let cards = document.querySelectorAll('.card');
    cards.forEach((card) => {
        card.addEventListener('click', (e) => {
            history.pushState(
                {cardId: card.dataset.id},
                null,
                `/tasks/${card.dataset.id}`
            );
            window.dispatchEvent(new Event('pathnamechange'));
            console.log(card.dataset.id);
        });
    });
}

// KANBAN
let draggables = document.querySelectorAll('.draggable');
let containers = document.querySelectorAll('.container');

let kanbanContainer = document.createElement('div');
kanbanContainer.classList.add('kanban-container');

let toPlanContainerTitle = document.createElement('div');
let doingContainerTitle = document.createElement('div');
let toValidateContainerTitle = document.createElement('div');
let doneContainerTitle = document.createElement('div');

toPlanContainerTitle.setAttribute('class', 'container-title');
doingContainerTitle.setAttribute('class', 'container-title');
toValidateContainerTitle.setAttribute('class', 'container-title');
doneContainerTitle.setAttribute('class', 'container-title');

toPlanContainerTitle.innerText = STATUS_TO_PLAN;
doingContainerTitle.innerText = STATUS_DOING;
toValidateContainerTitle.innerText = STATUS_TO_VALIDATE;
doneContainerTitle.innerText = STATUS_DONE;

let toPlanContainer = document.createElement('div');
let doingContainer = document.createElement('div');
let toValidateContainer = document.createElement('div');
let doneContainer = document.createElement('div');
toPlanContainer.setAttribute('id', 'to-plan-container');
doingContainer.setAttribute('id', 'doing-container');
toValidateContainer.setAttribute('id', 'to-validate-container');
doneContainer.setAttribute('id', 'done-container');

toPlanContainer.append(toPlanContainerTitle);
doingContainer.append(doingContainerTitle);
toValidateContainer.append(toValidateContainerTitle);
doneContainer.append(doneContainerTitle);
toPlanContainer.classList.add('container');
doingContainer.classList.add('container');
toValidateContainer.classList.add('container');
doneContainer.classList.add('container');

kanbanContainer.append(toPlanContainer);
kanbanContainer.append(doingContainer);
kanbanContainer.append(toValidateContainer);
kanbanContainer.append(doneContainer);

const makeKanbanCardFromTask = (task) => {
    let card = document.createElement('div');
    card.classList.add('draggable');
    card.setAttribute('draggable', 'true');
    card.setAttribute('data-id', task._id);
    card.innerText = task._title;
    return card;
}

const fillKanban = () => {
    console.log('fillKanban()')
    if (allTasks.length > 0) {
        allTasks.forEach((task) => {
            switch (task._status) {
                case STATUS_TO_PLAN:
                    let cardToPlan = makeKanbanCardFromTask(task);
                    toPlanContainer.append(cardToPlan);
                    break;
                case STATUS_DOING:
                    let cardDoing = makeKanbanCardFromTask(task);
                    doingContainer.append(cardDoing);
                    break;
                case STATUS_TO_VALIDATE:
                    let cardToValidate = makeKanbanCardFromTask(task);
                    toValidateContainer.append(cardToValidate);
                    break;
                case STATUS_DONE:
                    let cardDone = makeKanbanCardFromTask(task);
                    doneContainer.append(cardDone);
                    break;
            }
        });
    }
}

const emptyKanban = () => {
    let kanbanCards = document.querySelectorAll('.draggable');
    kanbanCards.forEach((card) => {
        switch (card.parentNode) {
            case toPlanContainer:
                toPlanContainer.removeChild(card);
                break;
            case doingContainer:
                doingContainer.removeChild(card);
                break;
            case toValidateContainer:
                toValidateContainer.removeChild(card);
                break;
            case doneContainer:
                doneContainer.removeChild(card);
                break;
        }
    });
}

const changeTaskStatusInStorage = (draggable, status) => {
    console.log('changeTaskStatusInStorage')
    let task = allTasks.find((el) => {
        return el._id === parseInt(draggable.dataset.id);
    });
    if (task) {
        task._status = status;
        updateKanbanBoard();
        localStorage.setItem('tasks', JSON.stringify(allTasks));
        localStorage.setItem('kanban', JSON.stringify(kanbanBoard));
    }
}

const draggableListener = () => {
    draggables = document.querySelectorAll('.draggable');
    draggables.forEach(draggable => {
        draggable.addEventListener('dragstart', (e) => {
            console.log('start')
            //console.log(kanbanBoard)
            draggable.classList.add('dragging');
        });

        draggable.addEventListener('dragend', (e) => {
            console.log('end');
            navigator.vibrate(VIBRATION_LENGTH);
            switch (draggable.parentNode) {
                case toPlanContainer:
                    changeTaskStatusInStorage(draggable, STATUS_TO_PLAN);
                    break;
                case doingContainer:
                    changeTaskStatusInStorage(draggable, STATUS_DOING);
                    break;
                case toValidateContainer:
                    changeTaskStatusInStorage(draggable, STATUS_TO_VALIDATE);
                    break;
                case doneContainer:
                    changeTaskStatusInStorage(draggable, STATUS_DONE);
                    break;
            }
            draggable.classList.remove('dragging');
            //console.log(kanbanBoard)
        });
    });
}

const containersListener = () => {
    containers = document.querySelectorAll('.container');
    containers.forEach(container => {
        container.addEventListener('dragover', (e) => {
            e.preventDefault();
            const afterElement = getDragAfterElement(container, e.clientY);
            const dragged = document.querySelector('.dragging');
            if (afterElement == null) {
                container.appendChild(dragged);
            } else {
                container.insertBefore(dragged, afterElement);
            }
        });
    });
}

/*
const touchMoveListener = () => {
    draggables = document.querySelectorAll('.draggable');
    draggables.forEach((draggable) => {
        draggable.addEventListener('touchmove', (e) => {
            console.log('ici');
            let touchLocation = e.targetTouches[0];
            draggable.style.left = touchLocation.pageX + 'px';
            draggable.style.top = touchLocation.pageY + 'px';
            console.log(draggable.style.left)
            console.log(draggable.style.top)
            //draggable.dispatchEvent(new Event('dragstart'))
        });
        draggable.addEventListener('touchend', () => {
            console.log('là');
            navigator.vibrate(VIBRATION_LENGTH);
            let newX = parseInt(draggable.style.left);
            let newY = parseInt(draggable.style.top);
        });
    });
}
*/

const getDragAfterElement = (container, y) => {
    const draggableElements = [...container.querySelectorAll('.draggable:not(.dragged)')];
    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;
        if (offset < 0 && offset > closest.offset) {
            return {offset: offset, element: child}
        }
        return closest;
    }, {offset: Number.NEGATIVE_INFINITY}).element;
}


// Listeners
inputButton.addEventListener('click', (e) => {
    taskCreationForm.dispatchEvent(new Event('submit'));
});

taskCreationForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let messages = [];
    const taskTitle = inputTitle.value;
    const taskContent = inputContent.value;
    const taskStatus = selectStatus.options[selectStatus.selectedIndex].text;
    if (taskTitle === '' || taskTitle === null) {
        messages.push('Title is required');
    }
    if (taskContent === '' || taskContent === null) {
        messages.push('Content is required');
    }
    if (messages.length > 0) {
        errorMessage.innerText = messages.join(', ');
        errorDiv.append(errorMessage);
    } else {
        messages.length = 0;
        inputTitle.value = '';
        inputContent.value = '';
        if (errorDiv.contains(errorMessage)) errorDiv.removeChild(errorMessage);
        selectStatus.options.selectedIndex = 0;
        let task = new Task(taskStatus, taskTitle, taskContent);
        allTasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(allTasks));
    }
    cardsContainer = displayStoredTasksOnAdd();
});

// Path handler
window.addEventListener('pathnamechange', () => {
    console.log('path handler !')
    if (location.pathname === '/tasks') {
        if (history.state.lastPage === '/kanban') {
            emptyKanban();
            main.removeChild(kanbanContainer);
        }
        main.append(errorDiv);
        main.append(taskCreationForm);
        displayStoredTasksOnComeInPage();
        if (cardsContainer !== null) {
            main.append(cardsContainer);
            taskInfoHandler();
        }
    } else if (location.pathname === '/kanban') {
        if (history.state.lastPage === '/tasks') {
            main.removeChild(errorDiv);
            main.removeChild(taskCreationForm);
            if (cardsContainer !== null)
                main.removeChild(cardsContainer);
        }
        if (history.state.lastPage !== location.pathname) {
            main.append(kanbanContainer);
            fillKanban();
            draggableListener();
            containersListener();
            //touchMoveListener();
        }
    } else {
    }
});
