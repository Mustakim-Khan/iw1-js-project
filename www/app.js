// Common variables
const main = document.getElementById('main');
const kanban = document.getElementById("kanban");
const task = document.getElementById("task");
const members = document.getElementById("members");
const gifElement = document.getElementById('gif');
// Init task id at 1 if 'nextTaskId' doesn't exist.
let nextTaskId = (localStorage.getItem('nextTaskId') ? parseInt(localStorage.getItem('nextTaskId')) : 1);
// Retrieve from local storage 'tasks' item.
let allTasks = (localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : []);
let allMembers = (localStorage.getItem('members') ? JSON.parse(localStorage.getItem('members')) : []);
// Tasks variables
const STATUS_TO_PLAN = 'A Planifier';
const STATUS_DOING = 'En cours';
const STATUS_TO_VALIDATE = 'A Valider';
const STATUS_DONE = 'Fait';

if (location.pathname === '/') {
    gifElement.style.display = 'block';
}

// Define route in history
kanban.addEventListener("click", () => {
    history.pushState(
        {
            lastPage: location.pathname,
        },
        null,
        "/kanban"
    );
    window.dispatchEvent(new Event('pathnamechange'));
    task.classList.remove('active');
    members.classList.remove('active');
    kanban.classList.add('active');
});

task.addEventListener("click", () => {
    let supposedLastPage = location.pathname;
    if (urlPatternIsValid(location.href)) {
        supposedLastPage = '/tasks/id';
    }
    history.pushState(
        {
            lastPage: supposedLastPage,
        },
        null,
        "/tasks"
    );
    window.dispatchEvent(new Event('pathnamechange'));
    kanban.classList.remove('active');
    members.classList.remove('active');
    task.classList.add('active');
});

members.addEventListener("click", () => {
    history.pushState(
        {
            lastPage: location.pathname,
        },
        null,
        "/members"
    );
    window.dispatchEvent(new Event('pathnamechange'));
    task.classList.remove('active');
    kanban.classList.remove('active');
    members.classList.add('active');
});

// --- KANBAN ---//
class Kanban {
    constructor() {
        this.toPlanTasks = [];
        this.doingTasks = [];
        this.toValidateTasks = [];
        this.doneTasks = [];
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

// Kanban variables
let kanbanBoard = (localStorage.getItem('kanban') ? JSON.parse(localStorage.getItem('kanban')) : new Kanban());
let currentTaskInfo = undefined;

class Task {
    constructor(status, title, content, members) {
        this._id = nextTaskId;
        this._status = status;
        this._title = title;
        this._content = content;
        this._members = members;
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

    copyTask() {
        return 'HELLO';
    }
}

const fillTaskMembersOptions = () => {
    console.log('fillTaskMembersOptions');
    console.log(allMembers);
    if (allMembers.length > 0) {
        allMembers.forEach((member) => {
                let memberOption = document.createElement('option');
                memberOption.value = member._id;
                memberOption.text = `${member._fname} ${member._lname}`;
                taskMembers.append(memberOption);
            }
        )
    }
}

// -- tasks page
// Task card
let tasksPageContainer = document.createElement('div');
tasksPageContainer.setAttribute('class', 'tasks-page-container');

//let cardsContainer = document.getElementById('cards-container');
let cardsContainer = undefined;

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
let taskMembers = document.createElement('select');  // Task members select
let inputButton = document.createElement('input');  // Button submit

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

// taskMembers attributes
taskMembers.multiple = true;

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

let optionToValidate = document.createElement('option');
optionToValidate.value = STATUS_TO_VALIDATE;
optionToValidate.text = STATUS_TO_VALIDATE;
selectStatus.append(optionToValidate);

let optionDone = document.createElement('option');
optionDone.value = STATUS_DONE;
optionDone.text = STATUS_DONE;
selectStatus.append(optionDone);

taskCreationForm.append(inputTitle);
taskCreationForm.append(selectStatus);
taskCreationForm.append(inputContent);
taskCreationForm.append(taskMembers);
taskCreationForm.append(inputButton);

tasksPageContainer.append(errorDiv);
tasksPageContainer.append(taskCreationForm);

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

const urlPatternIsValid = (url) => {
    const pattern = new URLPattern('/tasks/:id(\\d+)', location.origin);
    return pattern.test(url);
};

const displayStoredTasks = () => {
    if (allTasks.length > 0) {
        if (!cardsContainer) {
            cardsContainer = document.createElement('div');
            cardsContainer.setAttribute('id', 'cards-container');
            fillCardsContainer(cardsContainer);
            tasksPageContainer.append(cardsContainer);
            return cardsContainer;
        } else {
            let newCardsContainer = document.createElement('div');
            newCardsContainer.setAttribute('id', 'cards-container');
            fillCardsContainer(newCardsContainer);
            tasksPageContainer.replaceChild(newCardsContainer, cardsContainer);
            return newCardsContainer;
        }
    }
}

// task creation => taskCreationForm
// To display and manage a task info on ?(kanban or tasks page?)
const taskInfoHandler = () => {
    let cards = document.querySelectorAll('.card');
    cards.forEach((card) => {
        card.addEventListener('click', () => {
            history.pushState(
                {cardId: card.dataset.id},
                null,
                `/tasks/${card.dataset.id}`
            );
            window.dispatchEvent(new Event('pathnamechange'));
        });
    });
}

// Task INFO => variables
let taskInfoContainer = document.createElement('div');
taskInfoContainer.classList.add('tasks-info-container');
//taskInfoContainer.setAttribute('id', 'taskInfoContainer');


let taskInfoForm = document.createElement('form');
taskInfoForm.setAttribute('method', 'post');
taskInfoForm.setAttribute('action', '');
taskInfoForm.classList.add('tasks-info-container');
let taskInfoTitle = document.createElement('input');
let taskInfoStatus = document.createElement('select');
let taskInfoContent = document.createElement('input');
let taskInfoMembers = document.createElement('select');
let taskInfoCopyButton = document.createElement('input');
let taskInfoInputButton = document.createElement('input');
taskInfoTitle.setAttribute('type', 'text');
taskInfoContent.setAttribute('type', 'text');
taskInfoContent.setAttribute('required', 'required');
taskInfoTitle.setAttribute('required', 'required');
taskInfoCopyButton.setAttribute('type', 'button');
taskInfoCopyButton.setAttribute('value', 'Copier');
taskInfoInputButton.setAttribute('type', 'button');
taskInfoInputButton.setAttribute('value', 'Modifier');
let taskInfoErrorDiv = document.createElement('div');
let taskInfoErrorMessage = document.createElement('p');
taskInfoErrorDiv.append(taskInfoErrorMessage);

let taskInfoTitleLabel = document.createElement('label');
let taskInfoContentLabel = document.createElement('label');
let taskInfoStatusLabel = document.createElement('label');
let taskInfoMembersLabel = document.createElement('label');
taskInfoTitleLabel.innerText = 'Titre : ';
taskInfoContentLabel.innerText = 'Contenus : ';
taskInfoStatusLabel.innerText = 'Status : ';
taskInfoMembersLabel.innerText = 'Membres : ';
taskInfoTitleLabel.append(taskInfoTitle);
taskInfoContentLabel.append(taskInfoContent);
taskInfoStatusLabel.append(taskInfoStatus);
taskInfoMembersLabel.append(taskInfoMembers);

let optionToPlanOnTaskInfoForm = document.createElement('option');
optionToPlanOnTaskInfoForm.value = STATUS_TO_PLAN;
optionToPlanOnTaskInfoForm.text = STATUS_TO_PLAN;
taskInfoStatus.append(optionToPlanOnTaskInfoForm);

let optionDoingOnTaskInfoForm = document.createElement('option');
optionDoingOnTaskInfoForm.value = STATUS_DOING;
optionDoingOnTaskInfoForm.text = STATUS_DOING;
taskInfoStatus.append(optionDoingOnTaskInfoForm);

let optionToValidateOnTaskInfoForm = document.createElement('option');
optionToValidateOnTaskInfoForm.value = STATUS_TO_VALIDATE;
optionToValidateOnTaskInfoForm.text = STATUS_TO_VALIDATE;
taskInfoStatus.append(optionToValidateOnTaskInfoForm);

let optionDoneOnTaskInfoForm = document.createElement('option');
optionDoneOnTaskInfoForm.value = STATUS_DONE;
optionDoneOnTaskInfoForm.text = STATUS_DONE;
taskInfoStatus.append(optionDoneOnTaskInfoForm);

taskInfoForm.append(taskInfoTitleLabel);
taskInfoForm.append(taskInfoContentLabel);
taskInfoForm.append(taskInfoStatusLabel);
taskInfoForm.append(taskInfoMembersLabel);


taskInfoForm.append(taskInfoCopyButton);
taskInfoForm.append(taskInfoInputButton);
taskInfoContainer.append(taskInfoErrorDiv);
taskInfoContainer.append(taskInfoForm);

taskInfoCopyButton.addEventListener('click', () => {
    //let task = new Task(currentTaskInfo._status, currentTaskInfo._title, currentTaskInfo._content, currentTaskInfo._members);
    let copyTaskMembers = [];
    currentTaskInfo._members.forEach((member) => {
        copyTaskMembers.push(member._fname + ' ' + member._lname);
    });
    let copyTask =
`Title : ${ currentTaskInfo._title }
Content : ${ currentTaskInfo._content }
Status : ${ currentTaskInfo._status }
${ (copyTaskMembers.length === 0) ? 'Pas de membres associés' : `Members : ${ copyTaskMembers }`}`;
    navigator.clipboard.writeText(copyTask)
        .then(() => {
            alert('Tâche copié avec succès !');
        })
        .catch(() => {
            alert('Copie échoué');
        })
});
const fillTaskInfoMembersOptions = (task) => {
    console.log(task._members)
    if (task._members.length > 0) {
        task._members.forEach((member) => {
            let memberOption = document.createElement('option');
            memberOption.value = member._id;
            memberOption.text = `${member._fname} ${member._lname}`;
            taskInfoMembers.append(memberOption);
        });
    }
}

taskInfoInputButton.addEventListener('click', () => {
    taskInfoForm.dispatchEvent(new Event('submit'));
});

const taskInfoFormListener = () => {
    taskInfoForm.addEventListener('submit', (e) => {
        e.preventDefault();
        let messages = [];
        const infoTitle = taskInfoTitle.value;
        const infoContent = taskInfoContent.value;
        const taskStatus = taskInfoStatus.options[taskInfoStatus.selectedIndex].text;
        if (infoTitle === '' || infoTitle === null) {
            messages.push('Le titre est requis');
        }
        if (infoContent === '' || infoContent === null) {
            messages.push('Le contenu est requis');
        }
        if (messages.length > 0) {
            taskInfoErrorMessage.innerText = messages.join(', ');
            taskInfoErrorDiv.append(taskInfoErrorMessage);
        } else {
            messages.length = 0;
            if (taskInfoErrorDiv.contains(taskInfoErrorMessage)) taskInfoErrorDiv.removeChild(taskInfoErrorMessage);
            taskInfoStatus.options.selectedIndex = 0;
            currentTaskInfo._title = infoTitle;
            currentTaskInfo._content = infoContent;
            currentTaskInfo._status = taskStatus;
            while (taskInfoMembers.options.length > 0) {
                taskInfoMembers.remove(0);
            }
            //currentTaskInfo = undefined;
            localStorage.setItem('tasks', JSON.stringify(allTasks));
            history.pushState(
                {
                    lastPage: '/tasks/id',
                },
                null,
                "/tasks"
            );
            window.dispatchEvent(new Event('pathnamechange'));
        }
    });
}

const fillTaskInfoForm = (currentTask) => {
    console.log(currentTask._title)
    taskInfoTitle.setAttribute('value', '');
    taskInfoTitle.setAttribute('value', currentTask._title);
    taskInfoContent.setAttribute('value', currentTask._content);
    taskInfoStatus.selectedIndex = 0;
    fillTaskInfoMembersOptions(currentTask);
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
        draggable.addEventListener('dragstart', () => {
            draggable.classList.add('dragging');
        });

        draggable.addEventListener('dragend', () => {
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


// Listeners
inputButton.addEventListener('click', () => {
    taskCreationForm.dispatchEvent(new Event('submit'));
});

taskCreationForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let messages = [];
    const taskTitle = inputTitle.value;
    const taskContent = inputContent.value;
    const taskStatus = selectStatus.options[selectStatus.selectedIndex].text;
    const selectedTaskMembers = taskMembers.selectedOptions;
    let membersCollection = [];
    for (let i = 0; i < selectedTaskMembers.length; i++) {
        let memberId = parseInt(selectedTaskMembers[i].value);
        membersCollection.push(
            allMembers.find((el) => {
                return el._id === memberId;
            })
        );
    }
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
        taskMembers.selectedIndex = -1;
        let task = new Task(taskStatus, taskTitle, taskContent, membersCollection);
        allTasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(allTasks));
    }
    cardsContainer = displayStoredTasks();
    taskInfoHandler();
});


// --- MEMEBERS PAGE --- //
// Member id
let nextMemberId = (localStorage.getItem('nextMemberId') ? parseInt(localStorage.getItem('nextMemberId')) : 1);

// Class
class Members {
    constructor(fname, lname, email, occupation) {
        this._id = nextMemberId;
        this._fname = fname;
        this._lname = lname;
        this._email = email;
        this._occoccupation = occupation;
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
}

let membersPageContainer = document.createElement('div');
membersPageContainer.classList.add('members-page-container');
// Members Form Content
let membersCreationForm = document.createElement('form');
let membersCardContainer = undefined;

// Error div
let membersErrorDiv = document.createElement('div');
let membersErrorMessage = document.createElement('p');
membersErrorDiv.append(errorMessage);


// Members Methods and listeners
const setAttributes = (element, attributes) => {
    Object.keys(attributes).forEach(attr => {
        element.setAttribute(attr, attributes[attr]);
    });
}

const formSubmitIsValid = (errorsArray, input) => {
    if (input.value === '' || input === null) {
        errorsArray.push(`${input.getAttribute("placeholder")} est requis`);
    }
    if (input.type === 'email') {
        if (!input.value.match(/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/)) {
            errorsArray.push(`${input.getAttribute("placeholder")} n'est pas valide`);
        }
    }
    return input.value;
}

const fillMembersCardsContainer = (container) => {
    allMembers.forEach((member) => {
        // if (task._status === STATUS_TO_PLAN) {
        let card = document.createElement('div');
        card.setAttribute('data-id', member._id);
        card.setAttribute('class', 'member-card');
        let p = document.createElement('p');
        p.setAttribute('class', 'card-title');
        p.innerText = member._fname.concat(' ', member._lname);
        card.append(p);
        container.append(card);
    });
}

// Display existing members in members page
const displayMembersStored = () => {
    if (allMembers.length > 0) {
        if (!membersCardContainer) {
            membersCardContainer = document.createElement('div');
            membersCardContainer.setAttribute('id', 'members-cards-container');
            fillMembersCardsContainer(membersCardContainer);
            membersPageContainer.append(membersCardContainer);
            return membersCardContainer;
        } else {
            let newMembersCardContainer = document.createElement('div');
            newMembersCardContainer.setAttribute('id', 'members-cards-container');
            fillMembersCardsContainer(newMembersCardContainer);
            console.log(membersCardContainer)
            membersPageContainer.replaceChild(newMembersCardContainer, membersCardContainer);
            return newMembersCardContainer;
        }
    }
}

// Define form elements and set their attributes.
let membersInputFirstName = document.createElement('input'); // Input FName
const membersInputFirstName_attributes = {
    type: 'text',
    name: 'membersFirstName',
    value: '',
    placeholder: 'Prénom',
    required: 'required',
    style: 'margin: 0 3px;'
};
setAttributes(membersInputFirstName, membersInputFirstName_attributes);
let membersInputLastName = document.createElement('input'); // Input LName
const membersInputLastName_attributes = {
    type: 'text',
    name: 'membersLastName',
    value: '',
    placeholder: 'Nom',
    required: 'required',
    style: 'margin: 0 3px;'
};
setAttributes(membersInputLastName, membersInputLastName_attributes);
let membersInputEmail = document.createElement('input'); // Input Email
const membersInputEmail_attributes = {
    type: 'email',
    name: 'membersEmail',
    value: '',
    placeholder: 'Email',
    required: 'required',
    style: 'margin: 0 3px;'
};
setAttributes(membersInputEmail, membersInputEmail_attributes);
let membersInputOccupation = document.createElement('input'); // Input Occupation
const membersInputOccupation_attributes = {
    type: 'text',
    name: 'membersOccupation',
    value: '',
    placeholder: 'Poste',
    required: 'required',
    style: 'margin: 0 3px;'
};
setAttributes(membersInputOccupation, membersInputOccupation_attributes);
let membersSubmitButton = document.createElement('input');  //? Button submit
const membersSubmitButton_attributes = {
    type: 'button',
    value: 'Créer',
    style: 'margin: 0 3px;'
};
setAttributes(membersSubmitButton, membersSubmitButton_attributes);

// Add elements in form.
membersCreationForm.append(membersInputFirstName);
membersCreationForm.append(membersInputLastName);
membersCreationForm.append(membersInputEmail);
membersCreationForm.append(membersInputOccupation);
membersCreationForm.append(membersSubmitButton);

membersPageContainer.append(membersErrorDiv);
membersPageContainer.append(membersCreationForm);

// Create members Listeners
membersSubmitButton.addEventListener('click', () => {
    membersCreationForm.dispatchEvent(new Event('submit'));
});

membersCreationForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let messages = [];
    // Retrieve inputs values
    let inputFirstNameValue = formSubmitIsValid(messages, membersInputFirstName);
    let inputLastNameValue = formSubmitIsValid(messages, membersInputLastName);
    let membersInputEmailValue = formSubmitIsValid(messages, membersInputEmail);
    let membersInputOccupationValue = formSubmitIsValid(messages, membersInputOccupation);
    if (messages.length > 0) {
        membersErrorMessage.innerText = messages.join(', ');
        membersErrorDiv.append(membersErrorMessage);
    } else {
        messages.length = 0;
        membersInputFirstName.value = '';
        membersInputLastName.value = '';
        membersInputEmail.value = '';
        membersInputOccupation.value = '';
        if (membersErrorDiv.contains(membersErrorMessage)) membersErrorDiv.removeChild(membersErrorMessage);
        let member = new Members(inputFirstNameValue, inputLastNameValue, membersInputEmailValue, membersInputOccupationValue);
        allMembers.push(member);
        localStorage.setItem('members', JSON.stringify(allMembers));
    }
    membersCardContainer = displayMembersStored();
});

// Path handler
window.addEventListener('pathnamechange', () => {
    console.log('path handler : pathname : ' + location.pathname);
    gifElement.style.display = 'none';
    if (location.pathname === '/tasks') {
        if (history.state.lastPage === '/kanban') {
            emptyKanban();
            main.removeChild(kanbanContainer);
        } else if (history.state.lastPage === '/members') {
            main.removeChild(membersPageContainer);
        }
        if (main.contains(taskInfoContainer)) {
            main.removeChild(taskInfoContainer);
        }
        fillTaskMembersOptions();
        main.append(tasksPageContainer);
        cardsContainer = displayStoredTasks();
        taskInfoHandler();
    } else if (urlPatternIsValid(location.href)) {
        currentTaskInfo = allTasks.find((el) => {
            return el._id === parseInt(history.state.cardId);
        });
        if (main.contains(tasksPageContainer))
            main.removeChild(tasksPageContainer);
        main.append(taskInfoContainer);
        fillTaskInfoForm(currentTaskInfo);
        taskInfoFormListener();
    } else if (location.pathname === '/kanban') {
        if (history.state.lastPage === '/tasks') {
            main.removeChild(tasksPageContainer);
        } else if (history.state.lastPage === '/members') {
            main.removeChild(membersPageContainer);
        }
        if (main.contains(taskInfoContainer)) {
            main.removeChild(taskInfoContainer);
        }
        if (history.state.lastPage !== location.pathname) {
            main.append(kanbanContainer);
            fillKanban();
            draggableListener();
            containersListener();
        }
    } else if (location.pathname === '/members') {
        console.log('/members')
        if (history.state.lastPage === '/tasks') {
            console.log('from /tasks')
            main.removeChild(tasksPageContainer);
        } else if (history.state.lastPage === '/kanban') {
            console.log('from /kanban')
            emptyKanban();
            main.removeChild(kanbanContainer);
        }
        if (main.contains(taskInfoContainer)) {
            main.removeChild(taskInfoContainer);
        }
        main.append(membersPageContainer);
        membersCardContainer = displayMembersStored();
    }
});
