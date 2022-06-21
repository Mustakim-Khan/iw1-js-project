const kanban = document.getElementById("kanban");
const task = document.getElementById("task");

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
