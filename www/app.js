// Common variables
const main = document.getElementById('main');
const kanban = document.getElementById("kanban");
const task = document.getElementById("task");
const members = document.getElementById("members");

// Tasks variables
const STATUS_TO_PLAN = 'A Planifier';
const STATUS_DOING = 'En cours';
const STATUS_TO_VALIDATE = 'A Valider';
const STATUS_DONE = 'Fait';

// Define route in history
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

members.addEventListener("click", (e) => {
    history.pushState(
        {
            lastPage: location.pathname,
        },
        null,
        "/members"
    );
    window.dispatchEvent(new Event('pathnamechange'));
});

// --- KANBAN ---//
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
// Methods
// Update kanban card task list.
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

// Init task id at 1 if 'nextTaskId' doesn't exist.
let nextTaskId = (localStorage.getItem('nextTaskId') ? parseInt(localStorage.getItem('nextTaskId')) : 1);
// Retreive from local storage 'tasks' item.
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

// -- tasks page
// Task card
let cardsContainer = document.getElementById('cards-container');
// Does use !
// const fillTasksButton = document.getElementById("fillTasksButton");

// Error div
let errorDiv = document.createElement('div');
let errorMessage = document.createElement('p');
errorDiv.append(errorMessage);

// Task Form
let taskCreationForm = document.createElement('form');
taskCreationForm.setAttribute('method', 'post');
taskCreationForm.setAttribute('action', '');

// Task Form Content
let inputTitle = document.createElement('input'); // Input TITLE
let selectStatus = document.createElement('select'); // Input select STATUS
let inputContent = document.createElement('input'); // Input CONTENT
let inputButton = document.createElement('input');  //? Button submit

// Input TITLE : Attributes
inputTitle.setAttribute('type', 'text');
inputTitle.setAttribute('name', 'titleInput');
inputTitle.setAttribute('value', '');
inputTitle.setAttribute('placeholder', 'Nom de la tâche');
inputTitle.setAttribute('required', 'required');

// Input CONTENT : Attributes
inputContent.setAttribute('type', 'text');
inputContent.setAttribute('name', 'contentInput');
inputContent.setAttribute('value', '');
inputContent.setAttribute('placeholder', 'Contenu de la tâche');
inputContent.setAttribute('required', 'required');

// button submit : Attributes
inputButton.setAttribute('type', 'button');
inputButton.setAttribute('value', 'Créer');

// SELECT STATUS : options(values)
let optionToPlan = document.createElement('option'); // STATUS : TO PLAN
optionToPlan.value = STATUS_TO_PLAN;
optionToPlan.text = STATUS_TO_PLAN;
selectStatus.append(optionToPlan);

let optionDoing = document.createElement('option'); // STATUS : IN PROGRESS
optionDoing.value = STATUS_DOING;
optionDoing.text = STATUS_DOING;
selectStatus.append(optionDoing);

let optionDone = document.createElement('option'); // STATUS : DONE
optionDone.value = STATUS_DONE;
optionDone.text = STATUS_DONE;
selectStatus.append(optionDone);

let optionToValidate = document.createElement('option'); // STATUS : VALIDATE
optionToValidate.value = STATUS_TO_VALIDATE;
optionToValidate.text = STATUS_TO_VALIDATE;
selectStatus.append(optionToValidate);

// Add conponent in task form.
taskCreationForm.append(inputTitle);
taskCreationForm.append(selectStatus);
taskCreationForm.append(inputContent);
taskCreationForm.append(inputButton);

// --- tasks page --- end

// --- Kanban : Fill container given with all tasks that have STATUS_TO_PLAN as status.
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
// --- Does use !
// fillTasksButton.addEventListener("click", (e) => {
//     let t1 = new Task(STATUS_TO_PLAN, "To Plan 1", "To Plan 1 Content");
//     let t2 = new Task(STATUS_TO_PLAN, "To Plan 2", "To Plan 2 Content");
//     let t3 = new Task(STATUS_DOING, "Doing 1", "Doing 1 Content")
//     let t4 = new Task(STATUS_DOING, "Doing 2", "Doing 2 Content")
//     let t5 = new Task(STATUS_TO_VALIDATE, "To Validate 1", "To Validate 1 Content");
//     let t6 = new Task(STATUS_TO_VALIDATE, "To Validate 2", "To Validate 2 Content");
//     let t7 = new Task(STATUS_DONE, "Done 2", "Done 2 Content");
//     let t8 = new Task(STATUS_DONE, "Done 2", "Done 2 Content");
//     console.log(t1);
//     console.log(t2);
//     console.log(t3);
//     console.log(t4);
//     console.log(t5);
//     console.log(t6);
//     console.log(t7);
//     console.log(t8);
// });

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
// To display and manage a task info on ?(kanban or tasks page?)
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

// Kaban div for the appr tasks.
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

// 
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


// Create task Listeners
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

// GLOBAL Path handler
window.addEventListener('pathnamechange', () => {
    console.log('path handler !')
    if (location.pathname === '/tasks') {
        if (history.state.lastPage === '/kanban') {
            emptyKanban();
            main.removeChild(kanbanContainer);
        }else if(history.state.lastPage === '/members'){
            main.removeChild(membersErrorDiv);
            main.removeChild(membersCreationForm);
            main.removeChild(membersCardContainer)
        }
        main.append(errorDiv);
        main.append(taskCreationForm);
        // Check in localStorage for task
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
        }else if(history.state.lastPage === '/members'){
            main.removeChild(membersErrorDiv);
            main.removeChild(membersCreationForm);
            main.removeChild(membersCardContainer)
        }

        if (history.state.lastPage !== location.pathname) {
            main.append(kanbanContainer);
            fillKanban();
            draggableListener();
            containersListener();
        }
    } else if(location.pathname === '/members'){
        if (history.state.lastPage === '/tasks') {
            main.removeChild(errorDiv);
            main.removeChild(taskCreationForm);
            if (cardsContainer !== null)
                main.removeChild(cardsContainer);
        } else if (history.state.lastPage === '/kanban') {
            emptyKanban();
            main.removeChild(kanbanContainer);
        }
        // append elements
        main.append(membersErrorDiv);
        main.append(membersCreationForm);
        displayMembersStored()
    } 
});


// --- MEMEBERS PAGE --- //
// Member id
let nextMemberId = (localStorage.getItem('nextMemberId') ? parseInt(localStorage.getItem('nextMemberId')) : 1);
// Class
class Members {
    constructor(fname, lname, email, occupation, taskIds) {
        this._id = nextMemberId;
        this._fname = fname;
        this._lname = lname;
        this._email = email;
        this._occoccupation =occupation;
        this._taskIds = taskIds; // Collection of options selected
        nextMemberId++;
        localStorage.setItem('nextMemberId', nextMemberId.toString());
    }

    get id() {
        return this._id;
    }

    get fname() {
        return this._fname;
    }
    set fname(value) {
        this._fname = value;
    }

    get lname() {
        return this._lname;
    }
    set lname(value) {
        this._lname = value;
    }

    get email() {
        return this._email;
    }
    set email(value) {
        this._email = value;
    }

    get occupation() {
        return this._occupation;
    }
    set occupation(value) {
        this._occupation = value;
    }

    get taskIds() {
        return this._taskIds;
    }
    set taskIds(collection) {
        this._taskIds = collection;
    }
}

// Members Form Content
let membersCreationForm = document.createElement('form');
// Get members card Id
let membersCardContainer = document.getElementById('members-cards-container');
let allMembers = (localStorage.getItem('members') ? JSON.parse(localStorage.getItem('members')) : []);

// Error div
let membersErrorDiv = document.createElement('div');
let membersErrorMessage = document.createElement('p');
membersErrorDiv.append(errorMessage);


// Members Methods and listeners

function setAttributes(element, attributes) {
    Object.keys(attributes).forEach(attr => {
      element.setAttribute(attr, attributes[attr]);
    });
}

const membersSelectTask_options = (select) => {
    if (allTasks.length > 0) {
        allTasks.forEach((task) => {
            let optionToPlan = document.createElement('option');
            optionToPlan.value = task._id;
            optionToPlan.text = task._title;
            select.append(optionToPlan);
        });
    }
}

const formSubmitIsValid = (errorsArray,input) => {
    if (input.value === '' || input === null) {
        errorsArray.push(`${input.getAttribute("placeholder")} is required`);
    }
    return input.value;
}

const fillMembersCardsContainer = (container) => {
    allMembers.forEach((member) => {
        // if (task._status === STATUS_TO_PLAN) {
            let card = document.createElement('div');   
            card.setAttribute('data-id', member._id);
            card.setAttribute('class', 'card');
            let p = document.createElement('p');
            p.setAttribute('class', 'card-title');
            p.innerText = member._fname.concat(' ', member._lname);
            card.append(p);
            container.append(card);
        // }
    });
}
// Display existing members in members page
const displayMembersStored = () => {
    if (allMembers.length > 0) {
        if (membersCardContainer === null) {
            membersCardContainer = document.createElement('div');
            membersCardContainer.setAttribute('id', 'members-cards-container');
            fillMembersCardsContainer(membersCardContainer);
            main.append(membersCardContainer);
            return membersCardContainer;
        } else {
            let newmembersCardContainer = document.createElement('div');
            newmembersCardContainer.setAttribute('id', 'members-cards-container');
            fillMembersCardsContainer(newmembersCardContainer);
            main.replaceChild(newmembersCardContainer, membersCardContainer);
            return newmembersCardContainer;
        }
    }
}

// Define form celements and set theirs attributes.
let membersInputFirstName = document.createElement('input'); // Input FName
const membersInputFirstName_attributes = {
    type: 'text',
    name: 'membersFirstName',
    value: '',
    placeholder:'Prénom',
    required: 'required',
    style: 'margin: 0 3px;'
};
setAttributes(membersInputFirstName, membersInputFirstName_attributes)
let membersInputLastName = document.createElement('input'); // Input LName
const membersInputLastName_attributes = {
    type: 'text',
    name: 'membersLastName',
    value: '',
    placeholder:'Nom',
    required: 'required',
    style: 'margin: 0 3px;'
};
setAttributes(membersInputLastName, membersInputLastName_attributes)
let membersInputEmail = document.createElement('input'); // Input Email
const membersInputEmail_attributes = {
    type: 'text',
    name: 'membersEmail',
    value: '',
    placeholder:'prenom.nom@gmail.com',
    required: 'required',
    style: 'margin: 0 3px;'
};
setAttributes(membersInputEmail, membersInputEmail_attributes)
let membersInputOccupation = document.createElement('input'); // Input Occupation
const membersInputOccupation_attributes = {
    type: 'text',
    name: 'membersOccupation',
    value: '',
    placeholder:'Poste',
    required: 'required',
    style: 'margin: 0 3px;'
};
setAttributes(membersInputOccupation, membersInputOccupation_attributes)
let membersSubmitButton = document.createElement('input');  //? Button submit
const membersSubmitButton_attributes = {
    type: 'button',
    value: 'Créer',
    style: 'margin: 0 3px;'
};
setAttributes(membersSubmitButton, membersSubmitButton_attributes)
let membersSelectTask = document.createElement('select'); // Input select Task
membersSelectTask.multiple = true;
const membersSelectTask_attributes = {
    name: 'membersTasks',
    style: 'margin: 0 3px;'
};
setAttributes(membersSelectTask, membersSelectTask_attributes)
membersSelectTask_options(membersSelectTask);

// Add elements in form.
membersCreationForm.append(membersInputFirstName)
membersCreationForm.append(membersInputLastName)
membersCreationForm.append(membersInputEmail)
membersCreationForm.append(membersInputOccupation)
membersCreationForm.append(membersSelectTask)
membersCreationForm.append(membersSubmitButton)


// Create members Listeners
membersSubmitButton.addEventListener('click', (e) => {
    membersCreationForm.dispatchEvent(new Event('submit'));
});

membersCreationForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let messages = [];
    // Retreive inputs values
    InputFirstNameValue = formSubmitIsValid(messages,membersInputFirstName);
    InputLastNameValue = formSubmitIsValid(messages,membersInputLastName);
    membersInputEmailValue = formSubmitIsValid(messages,membersInputEmail);
    membersInputOccupationValue = formSubmitIsValid(messages,membersInputOccupation);
    membersSelectTaskValue = membersSelectTask.selectedOptions
    collectionTaskId = []
    for(let i=0; i<membersSelectTaskValue.length; i++){
        collectionTaskId.push(membersSelectTaskValue[i].value)
    }
    
    if (messages.length > 0) {
        membersErrorMessage.innerText = messages.join(', ');
        membersErrorDiv.append(membersErrorMessage);
    }
    else {
        messages.length = 0;
        membersInputFirstName.value = '';
        membersInputLastName.value = '';
        membersInputEmail.value = '';
        membersInputOccupation.value = '';
        if (membersErrorDiv.contains(membersErrorMessage)) membersErrorDiv.removeChild(membersErrorMessage);
        membersSelectTask.selectedOptions = [];
        // membersSelectTask.options.selectedIndex = 0;
        let member = new Members(InputFirstNameValue, InputLastNameValue, membersInputEmailValue, membersInputOccupationValue, collectionTaskId);
        allMembers.push(member);
        localStorage.setItem('members', JSON.stringify(allMembers));
    }
    membersCardsContainer = displayMembersStored();
});

