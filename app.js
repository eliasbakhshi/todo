const form = document.querySelector(".enter");
const searchBox = document.querySelector(".search");
let list = document.querySelector(".list");
let table = document.querySelector(".table");
let todos = Array.from(list.children);
const todoBtn = document.getElementById("todoBtn");
const doneBtn = document.getElementById("doneBtn");
const tabs = document.tabs.tabBtn;
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
                console.log(todo.getElementsByTagName("INPUT"))
                // console.log(todo)
                /* Add listener for the checkbox */
                theCheckbox.addEventListener("change", function() {
                    console.log(todo.getElementsByTagName("INPUT"))
                    if (this.checked) {
                        todo.classList.add("done");
                        todo.classList.add("d-hide");
                        setTimeout(() => todo.classList.add("d-none"), 950);
                        todo.classList.remove("todo");
                    } else {
                        todo.classList.remove("done");
                    }
                });

                console.log(idCount)


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
                        todo.classList.add("todo");
                        todo.classList.add("reset");
                        setTimeout(() => todo.classList.add("d-none"), 450);
                        todo.classList.remove("done");
                    });
                    todo.prepend(iElement);
                }
            }
            todo.classList.remove("d-hide");
            todo.classList.remove("reset");
            todo.classList.remove("d-none");
            outputList.push(todo);
        });
    // let deleteBoxes = document.querySelectorAll(".deleteBox");
    // console.log(deleteBoxes)
    // deleteBoxes.forEach(todo => {
    //     console.log("ww")
    //     todo.addEventListener("change", function() {
    //         if (this.checked) {
    //             todo.classList.add("done");
    //             todo.classList.add("d-hide");
    //             setTimeout(() => todo.classList.add("d-none"), 950);
    //             todo.classList.remove("todo");
    //         } else {
    //             todo.classList.remove("done");
    //         }
    //     });
    // });
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
                                <p>${enteredData}</p>
                                <i class="fas fa-trash-alt fa-2x trash"></i>
                           </article>`;
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
});


/* Search trough the list */
searchBox.addEventListener("keyup", search);