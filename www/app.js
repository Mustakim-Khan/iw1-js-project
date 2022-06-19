const kaban = document.getElementById("kaban");
const task = document.getElementById("task");

kaban.addEventListener("click", (e) => {
  history.pushState(
    {
      page: "Kaban",
    },
    "kaban",
    "/kaban"
  );
});

task.addEventListener("click", (e) => {
  history.pushState(
    {
      page: "Task",
    },
    "Tasks",
    "/tasks"
  );
});
