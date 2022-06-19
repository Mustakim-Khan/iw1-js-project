function pressButtonTest() {
    f();
}

const pressButtonKanban = () => {
    a();
}

let state = { displayTrophy: false };
window.history.replaceState(state, null, "");



class Task {
    constructor(id, status, title, content) {
        this._id = id;
        this._status = status;
        this._title = title;
        this._content = content;
    }

    get id() {
        return this._id;
    }

    set id(value) {
        this._id = value;
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

const a = () => {
    let t = localStorage.getItem("kanban");
    console.log(JSON.parse(t).tasks);
}
