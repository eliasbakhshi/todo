const form = document.querySelector(".enter");
const searchBox = document.querySelector(".search");
let list = document.querySelector(".list");
let table = document.querySelector(".table");
let tabs = document.querySelector(".tabs");
let noRes = document.getElementById("searchResult");
let todos = Array.from(list.children);
const todoBtn = document.getElementById("todoBtn");
const doneBtn = document.getElementById("doneBtn");
let printedList = [], idCount = 1;

/* Show the relevant list*/
function showList(listName) {
    let outputList = [];
    todos.filter(todo => !todo.classList.contains(listName))
        .forEach(todo => todo.classList.add("d-none"));
    todos.filter(todo => todo.classList.contains(listName))
        .forEach(todo => {
            /* Create checkbox for the to-do object*/
            if (todo.classList.contains("todo")) {
                if (todo.firstElementChild.tagName.toLowerCase() !== "input") {
                    if (todo.firstElementChild.tagName.toLowerCase() === "i") {
                        todo.firstElementChild.remove();
                    }
                    let checkbox = document.createElement("input");
                    checkbox.type = "checkbox";
                    checkbox.classList.add("deleteBox");

                    let label = document.createElement("label");
                    todo.prepend(label);
                    todo.prepend(checkbox);
                }
                let theCheckbox = todo.getElementsByTagName("INPUT")[0];
                let theLabel = todo.getElementsByTagName("LABEL")[0];
                /* Add listener for the checkbox */
                theCheckbox.addEventListener("change", function() {
                    if (this.checked) {
                        todo.classList.add("done", "d-hide");
                        setTimeout(() => todo.classList.add("d-none"), 950);
                        todo.classList.remove("todo");
                    } else {
                        todo.classList.remove("done");
                    }
                });
                /* Match the checkbox with the label */
                theCheckbox.id = `c${idCount}`;
                theCheckbox.name = `c${idCount}`;
                theLabel.htmlFor = `c${idCount}`;
                idCount++;
            } else if (todo.classList.contains("done")) {
                if (todo.firstElementChild.tagName.toLowerCase() !== "i") {
                    /* Delete the checkbox*/
                    if (todo.firstElementChild.tagName.toLowerCase() === "input") {
                        todo.firstElementChild.remove();
                        if (todo.firstElementChild.tagName.toLowerCase() === "label") {
                            todo.firstElementChild.remove();
                        }
                    }
                    let iElement = document.createElement("i");
                    iElement.classList.add("fas", "fa-undo-alt", "fa-lg", "undo");
                    iElement.addEventListener("click", function(e) {
                        todo.classList.add("todo", "reset");
                        setTimeout(() => todo.classList.add("d-none"), 450);
                        todo.classList.remove("done");
                    });
                    todo.prepend(iElement);
                }
            }
            todo.classList.remove("d-hide", "reset", "d-none");
            outputList.push(todo);
        });
    return outputList;
}

/* search function */
function search() {
    let searchMessage = document.createElement("P");
    searchMessage.classList.add("no-result");
    let searchedWord = searchBox.value.trim();
    if (searchedWord.length) {
        // Disappear todos which are not match.
        printedList.filter(todo => !todo.textContent.toLowerCase().includes(searchedWord.toLowerCase()))
            .forEach(notSearched => notSearched.classList.add("d-none"));
        // Appear todos again that match.
        let searchResult = printedList.filter(todo => todo.textContent.toLowerCase().includes(searchedWord.toLowerCase()));
        if (searchResult.length) {
            let pluralSearch = (searchResult.length > 1) ? "s" : "";
            noRes.innerHTML = `Result${pluralSearch} for ${searchedWord}`
            noRes.classList.add("no-result");
            searchResult.forEach(Searched => Searched.classList.remove("d-none"));

        } else if (!searchResult.length) {
            noRes.innerHTML = "There is no result to show :(";
            noRes.classList.add("no-result");
        }
    } else if (!searchedWord.length) {
        noRes.innerHTML = "";
        noRes.classList.remove("no-result");
    }


    }

/* Show the form down to the page */
function showForm(show = true) {
    if (show) {
        form.classList.add("show");
        form.classList.remove("hide");
        table.classList.remove("high");
        setTimeout(() => form.style.display = "flex", 300);
    } else {
        form.classList.remove("show");
        form.classList.add("hide");
        table.classList.add("high");
        setTimeout(() => form.style.display = "none", 150);
    }
}


/* Show the To-do list by default*/
printedList = showList("todo");
todoBtn.setAttribute("checked", "checked");


/* Show the To-do list */
todoBtn.addEventListener("click", () => {
    printedList = showList("todo");
    tabs.classList.remove("done");
    search();
    showForm();
});


/* Show the Done list */
doneBtn.addEventListener("click", () => {
    printedList = showList("done");
    tabs.classList.add("done");
    search();
    showForm(false);
});


/* Add to the list */
form.addEventListener("submit", sub => {
    sub.preventDefault();
    let enteredData = form.data.value.trim();
    if (enteredData.length) {
        list.innerHTML = `<article class="todo">
                                <p>${enteredData}</p>
                                <i class="fas fa-trash-alt fa-lg trash"></i>
                           </article>` + list.innerHTML;
    }
    form.reset();
    list = document.querySelector(".list");
    todos = Array.from(list.children);
    printedList = showList("todo");
    search();
});


/* Delete from the list */
list.addEventListener("click", e => {
    if (e.target.classList.contains("fa-trash-alt")) {
        e.target.parentElement.classList.add("reset");
        setTimeout(() => e.target.parentElement.remove(), 450);
    }
    search();
});


/* Search trough the list */
searchBox.addEventListener("keyup", search);