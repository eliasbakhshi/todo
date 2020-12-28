const form = document.querySelector(".enter");
const searchBox = document.querySelector(".search");
let list = document.querySelector(".list");
let table = document.querySelector(".table");
let todos = Array.from(list.children);
const todoBtn = document.getElementById("todoBtn");
const doneBtn = document.getElementById("doneBtn");
const tabs = document.tabs.tabBtn;
let printedList = [];

/* Show the relevant list*/
function showList(listName) {
    let outputList = [], idCount = 1;
    todos.filter(todo => !todo.classList.contains(listName))
        .forEach(todo => {
            todo.classList.add("d-none");
            todo.getElementsByTagName("INPUT").id = "idCount";
            idCount++;
        });
    todos.filter(todo => todo.classList.contains(listName))
        .forEach(todo => {
            todo.classList.remove("d-none");
            outputList.push(todo);
        });
    return outputList;
}

/* search function */
function search() {
    let searchedWord = searchBox.value.trim().toLowerCase();
    // Disappear todos which are not match.
    printedList.filter(todo => !todo.textContent.toLowerCase().includes(searchedWord))
        .forEach(notSearched => notSearched.classList.add("d-none"));
    // Appear todos again that match.
    printedList.filter(todo => todo.textContent.toLowerCase().includes(searchedWord))
        .forEach(Searched => Searched.classList.remove("d-none"));
}


function showForm(show = true) {
    if (show) {
        form.classList.remove("hide");
        table.classList.remove("high");
    } else {
        form.classList.add("hide");
        table.classList.add("high");
    }

}


/* Show the To-do list by default*/
showList("todo");
printedList = showList("todo");
todoBtn.setAttribute("checked", "checked");


/* Show the To-do list */
todoBtn.addEventListener("click", () => {
    printedList = showList("todo");
    search();
    showForm();
});


/* Show the Done list */
doneBtn.addEventListener("click", () => {
    printedList = showList("done");
    search();
    showForm(false);
});


/* Add to the list */
form.addEventListener("submit", sub => {
    sub.preventDefault();
    let enteredData = form.data.value.trim();
    if (enteredData.length) {
        list.innerHTML += `<article class="todo">
                                <input type="checkbox" name="c1" id="c4">
                                <label for="c4"><div></div>${enteredData}</label>
                                <i class="fas fa-trash-alt fa-2x"></i>
                           </article>`;
    }
    form.reset();
    list = document.querySelector(".list");
    todos = Array.from(list.children);
});


/* Delete from the list */
list.addEventListener("click", e => {
    if (e.target.classList.contains("fa-trash-alt")) {
        e.target.parentElement.remove();
    }
});


/* Search trough the list */
searchBox.addEventListener("keyup", search);