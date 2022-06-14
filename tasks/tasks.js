let tasks = ['a', 'b'];

let list = document.getElementById('tasksList')
tasks.forEach((item)=>{
    let li = document.createElement("li");
    li.innerText = item;
    list.appendChild(li);
})
