// Common variables
const main = document.getElementById("main");
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
  window.dispatchEvent(new Event("pathnamechange"));
});

task.addEventListener("click", (e) => {
  history.pushState(
    {
      lastPage: location.pathname,
    },
    null,
    "/tasks"
  );
  window.dispatchEvent(new Event("pathnamechange"));
});

// Tasks variables
const STATUS_TO_PLAN = "A Planifier";
const STATUS_DOING = "En cours";
const STATUS_TO_VALIDATE = "A Valider";
const STATUS_DONE = "Fait";
let nextTaskId = localStorage.getItem("nextTaskId")
  ? parseInt(localStorage.getItem("nextTaskId"))
  : 1;
let allTasks = localStorage.getItem("tasks")
  ? JSON.parse(localStorage.getItem("tasks"))
  : [];

// /tasks page
let cardsContainer = document.getElementById("cards-container");
const fillTasksButton = document.getElementById("fillTasksButton");

let errorDiv = document.createElement("div");
let errorMessage = document.createElement("p");
errorDiv.append(errorMessage);

let taskCreationForm = document.createElement("form");
taskCreationForm.setAttribute("method", "post");
taskCreationForm.setAttribute("action", "");

let inputTitle = document.createElement("input");
let selectStatus = document.createElement("select");
let inputContent = document.createElement("input");
let inputButton = document.createElement("input");

inputTitle.setAttribute("type", "text");
inputTitle.setAttribute("name", "titleInput");
inputTitle.setAttribute("value", "");
inputTitle.setAttribute("placeholder", "Nom de la tâche");
inputTitle.setAttribute("required", "required");

inputContent.setAttribute("type", "text");
inputContent.setAttribute("name", "contentInput");
inputContent.setAttribute("value", "");
inputContent.setAttribute("placeholder", "Contenu de la tâche");
inputContent.setAttribute("required", "required");

inputButton.setAttribute("type", "button");
inputButton.setAttribute("value", "Créer");

let optionToPlan = document.createElement("option");
optionToPlan.value = STATUS_TO_PLAN;
optionToPlan.text = STATUS_TO_PLAN;
selectStatus.append(optionToPlan);

let optionDoing = document.createElement("option");
optionDoing.value = STATUS_DOING;
optionDoing.text = STATUS_DOING;
selectStatus.append(optionDoing);

let optionDone = document.createElement("option");
optionDone.value = STATUS_DONE;
optionDone.text = STATUS_DONE;
selectStatus.append(optionDone);

let optionToValidate = document.createElement("option");
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
      let card = document.createElement("div");
      card.setAttribute("data-id", task._id);
      card.setAttribute("class", "card");
      let p = document.createElement("p");
      p.setAttribute("class", "card-title");
      p.innerText = task._title;
      card.append(p);
      container.append(card);
    }
  });
};

const f = (cardId) => {
  const pattern = new URLPattern("/tasks/:id(\\d+)", location.href);
  let test = pattern.test("http://localhost/tasks/37");
  let cardIsValid = allTasks.find((el) => {
    return el._id === parseInt(cardId);
  });
};

const allID = () => {
  for (let i = 0; i < allTasks.length; i++) {
    return i;
  }
};

let myLocation = location.pathname;
const urlPatternIsValid = (myLocation) => {
  const pattern = new URLPattern("/tasks/:id(\\d+)", location.href);
  if ((myLocation = pattern.test(location.href) === true)) {
    return true;
  } else {
    return false;
  }
};

console.log(urlPatternIsValid(myLocation));

fillTasksButton.addEventListener("click", (e) => {
  let t1 = new Task(STATUS_TO_PLAN, "To Plan 1", "To Plan 1 Content");
  let t2 = new Task(STATUS_TO_PLAN, "To Plan 2", "To Plan 2 Content");
  let t3 = new Task(STATUS_DOING, "Doing 1", "Doing 1 Content");
  let t4 = new Task(STATUS_DOING, "Doing 2", "Doing 2 Content");
  let t5 = new Task(
    STATUS_TO_VALIDATE,
    "To Validate 1",
    "To Validate 1 Content"
  );
  let t6 = new Task(
    STATUS_TO_VALIDATE,
    "To Validate 2",
    "To Validate 2 Content"
  );
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
      cardsContainer = document.createElement("div");
      cardsContainer.setAttribute("id", "cards-container");
      fillCardsContainer(cardsContainer);
      main.append(cardsContainer);
      return cardsContainer;
    }
  }
};

const displayStoredTasksOnAdd = () => {
  if (allTasks.length > 0) {
    if (cardsContainer === null) {
      cardsContainer = document.createElement("div");
      cardsContainer.setAttribute("id", "cards-container");
      fillCardsContainer(cardsContainer);
      main.append(cardsContainer);
      return cardsContainer;
    } else {
      let newCardsContainer = document.createElement("div");
      newCardsContainer.setAttribute("id", "cards-container");
      fillCardsContainer(newCardsContainer);
      main.replaceChild(newCardsContainer, cardsContainer);
      return newCardsContainer;
    }
  }
};

class Task {
  constructor(status, title, content) {
    this._id = nextTaskId;
    this._status = status;
    this._title = title;
    this._content = content;
    nextTaskId++;
    localStorage.setItem("nextTaskId", nextTaskId.toString());
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

// task creation => taskCreationForm
const taskInfoHandler = () => {
  let cards = document.querySelectorAll(".card");
  cards.forEach((card) => {
    card.addEventListener("click", (e) => {
      history.pushState(
        { cardId: card.dataset.id },
        null,
        `/tasks/${card.dataset.id}`
      );
      window.dispatchEvent(new Event("pathnamechange"));
      console.log(card.dataset.id);
    });
  });
};

//main.append(taskCreationForm);

// Listeners
inputButton.addEventListener("click", (e) => {
  taskCreationForm.dispatchEvent(new Event("submit"));
});

taskCreationForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let messages = [];
  const taskTitle = inputTitle.value;
  const taskContent = inputContent.value;
  const taskStatus = selectStatus.options[selectStatus.selectedIndex].text;
  if (taskTitle === "" || taskTitle === null) {
    messages.push("Title is required");
  }
  if (taskContent === "" || taskContent === null) {
    messages.push("Content is required");
  }
  if (messages.length > 0) {
    errorMessage.innerText = messages.join(", ");
    errorDiv.append(errorMessage);
  } else {
    messages.length = 0;
    inputTitle.value = "";
    inputContent.value = "";
    if (errorDiv.contains(errorMessage)) errorDiv.removeChild(errorMessage);
    selectStatus.options.selectedIndex = 0;
    let task = new Task(taskStatus, taskTitle, taskContent);
    allTasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(allTasks));
  }
  cardsContainer = displayStoredTasksOnAdd();
});

// Path handler
window.addEventListener("pathnamechange", () => {
  console.log("path handler !");
  if (location.pathname === "/tasks") {
    main.append(errorDiv);
    main.append(taskCreationForm);
    displayStoredTasksOnComeInPage();
    if (cardsContainer !== null) {
      main.append(cardsContainer);
      taskInfoHandler();
    }
  } else if (urlPatternIsValid(myLocation) === true) {
    console.log(location.pathname);
    main.removeChild(errorDiv);
    main.removeChild(taskCreationForm);
    if (cardsContainer !== null) main.removeChild(cardsContainer);
  } else if ("/kanban") {
    if (history.state.lastPage === "/tasks") {
      main.removeChild(errorDiv);
      main.removeChild(taskCreationForm);
      if (cardsContainer !== null) main.removeChild(cardsContainer);
    }
  } else {
  }
});
