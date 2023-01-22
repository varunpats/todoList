const submit = document.getElementById("submit");
submit.addEventListener("click", addEntry);
document.addEventListener('DOMContentLoaded', displayData);

const today = new Date();
const yyyy = today.getFullYear();
let mm = today.getMonth() + 1;
let dd = today.getDate();
let nm = today.getMonth() + 2;
let yd = today.getDate() - 1;

if (dd < 10) dd = '0' + dd;
if (mm < 10) mm = '0' + mm;
if (nm < 10) nm = '0' + nm;

const formattedToday = dd + '/' + mm + '/' + yyyy;
const formattedFuture = dd + '/' + nm + '/' + yyyy;
const formattedPast = yd + '/' + mm + '/' + yyyy;
let uid = 1;

function displayData() {
    let todayTodo = document.getElementById("toDayDiv");
    let futureTodo = document.getElementById("futureDiv");
    let completedTodo = document.getElementById("completedDiv");
    let data = JSON.parse(localStorage.getItem("allEntries"));
    let i = 0, j = 0, k = 0;
    todayTodo.innerHTML = "";
    futureTodo.innerHTML = "";
    completedTodo.innerHTML = "";
    data.forEach(ele => {
        if (ele.date == formattedToday && !ele.completed) {
            todayTodo.innerHTML += `<div id="future">
            <span>
                ${++i}. ${ele.task}
            </span>
            <span>
            ${ele.date}
            </span>
            <span>
                Priority : ${ele.priority}
            </span>
            <span>
                <img src="./check.png" onClick="check(${ele.uid})">
                <img src="./delete.png" onClick="del(${ele.uid})">
            </span>
            </div>
            `
        }
        else if (ele.date > formattedToday && !ele.completed) {
            futureTodo.innerHTML += `<div id="future">
            <span>
                ${++j}. ${ele.task}
            </span>
            <span>
            ${ele.date}
            </span>
            <span>
                Priority : ${ele.priority}
            </span>
            <span>
                <img src="./check.png" onClick="check(${ele.uid})">
                <img src="./delete.png" onClick="del(${ele.uid})">
            </span>
            </div>
            `
        }
        else if (ele.date < formattedToday && !ele.completed) {
            futureTodo.innerHTML += `<div id="future" style="border: 2px solid red;">
            <span>
                ${++j}. ${ele.task}
            </span>
            <span>
            ${ele.date}
            </span>
            <span>
                Priority : ${ele.priority}
            </span>
            <span>
                <img src="./check.png" onClick="check(${ele.uid})">
                <img src="./delete.png" onClick="del(${ele.uid})">
            </span>
            </div>
            `
        }
        else if (ele.completed) {
            completedTodo.innerHTML += `<div id="completed">
            <span>
                ${++k}. ${ele.task}
            </span>
            <span>
            ${ele.date}
            </span>
            <span>
                Priority : ${ele.priority}
            </span>
            <span>
                <img src="./delete-black.png" onClick="del(${ele.uid})">
            </span>
            </div>
            `
        }
    });
}

function addEntry() {
    let existingEntries = JSON.parse(localStorage.getItem("allEntries"));
    if (existingEntries == null) existingEntries = [];
    const task = document.getElementById("name").value;
    const date = document.getElementById("date").value;
    const d2 = new Date(date).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    })
    const priority = document.getElementById("priority").value;
    let entry = {
        "task": task,
        "date": d2,
        "priority": priority,
        "completed": false,
        "uid": uid
    };
    uid++;
    existingEntries.push(entry);
    localStorage.setItem("allEntries", JSON.stringify(existingEntries));
    displayData();
}

function check(id) {
    let data = JSON.parse(localStorage.getItem("allEntries"))
    data.forEach(ele => {
        if (ele.uid == id)
            ele.completed = true
    })
    localStorage.setItem("allEntries", JSON.stringify(data));
    displayData()
}

function del(id) {
    let data = JSON.parse(localStorage.getItem("allEntries"))
    data.splice((data.map(item => item.uid).indexOf(id)), 1);
    localStorage.setItem("allEntries", JSON.stringify(data));
    displayData()
}