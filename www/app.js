const kaban = document.getElementById("kaban");
const task = document.getElementById("task");
const pattern = new URLPattern({ pathname: '/tasks' });
const p = new URLPattern({ pattern: '/kanban'});


kaban.addEventListener("click", (e) => {
    console.log(location.pathname); // true
    history.pushState(
    {
      page: "Kaban",
    },
    "kaban",
    "/kaban"
  );
    console.log(pattern.test(`http://localhost/kaban`)); // false
});

task.addEventListener("click", (e) => {
  history.pushState(
    {
      page: "Task",
    },
    "Tasks",
    "/tasks"
  );
    console.log(location.pathname);
console.log(pattern.test(`http://localhost/tasks/tasks`)); // true
});

