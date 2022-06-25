// Tasks variables
const STATUS_TO_PLAN = 'A Planifier';
const STATUS_DOING = 'En cours';
const STATUS_TO_VALIDATE = 'A Valider';
const STATUS_DONE = 'Fait';
let currentTaskId = 1;


const kanban = document.getElementById("kanban");
const task = document.getElementById("task");
const fillTasksButton = document.getElementById("fillTasksButton");

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
