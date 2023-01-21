const submit = document.getElementById("submit");
submit.addEventListener("click", addEntry);
localStorage.clear();
document.addEventListener('DOMContentLoaded', addData);

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

function addData() {
    let existingEntries = JSON.parse(localStorage.getItem("allEntries"));
    if (existingEntries == null) existingEntries = [];
    let entry = {
        "task": "AccioJob Assignment",
        "date": formattedToday,
        "priority": "High",
        "completed": false
    };
    let entry1 = {
        "task": "AccioJob Assignment 2",
        "date": formattedToday,
        "priority": "Medium",
        "completed": false
    };
    let entry2 = {
        "task": "AccioJob Assignment 3",
        "date": formattedFuture,
        "priority": "High",
        "completed": false
    };
    let entry3 = {
        "task": "AccioJob Assignment 4",
        "date": "11/01/2022",
        "priority": "Medium",
        "completed": false
    };
    let entry4 = {
        "task": "AccioJob Assignment 0",
        "date": formattedPast,
        "priority": "High",
        "completed": true
    };
    let entry5 = {
        "task": "AccioJob Assignment 1",
        "date": formattedPast,
        "priority": "Low",
        "completed": true
    };

    localStorage.setItem("entry", JSON.stringify(entry));
    existingEntries.push(entry);
    existingEntries.push(entry1);
    existingEntries.push(entry2);
    existingEntries.push(entry3);
    existingEntries.push(entry4);
    existingEntries.push(entry5);
    localStorage.setItem("allEntries", JSON.stringify(existingEntries));
    displayData()
}

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
                <img src="./check.png" id="todoDone${i}">
                <img src="./delete.png" id="todoDelete${i}">
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
                <img src="./check.png" id="futureDone${j}">
                <img src="./delete.png" id="futureDelete${j}">
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
                <img src="./check.png" onclick="dem(event)" id="futureDone${j}">
                <img src="./delete.png" id="futureDelete${j}">
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
                <img src="./delete-black.png" id="completedDelete${k}">
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
        "completed": false
    };
    existingEntries.push(entry);
    localStorage.setItem("allEntries", JSON.stringify(existingEntries));
    displayData();
}

// function dem(e) {
//     console.log(JSON.parse(localStorage.getItem("allEntries")));
//     console.log(e);
// }