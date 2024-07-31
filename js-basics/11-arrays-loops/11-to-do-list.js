const toDoList = [{
    name: 'make dinner',
    dueDate : '2022-12-22'
}];

renderTodoList();
function renderTodoList (){
    let toDoListHTML = [];

    for ( i = 0; i < toDoList.length; i++){
        const toDoObject = toDoList[i];
        const {name, dueDate} = toDoObject
     
        const html = `
            <div>${name}</div>
            <div>${dueDate} </div>
            <button onclick = "
                toDoList.splice(${i}, 1);
                renderTodoList();
            " class = "delete-todo-button">delete</button>
        `;
        toDoListHTML+= html;
    }

    document.querySelector(".js-display")
        .innerHTML = toDoListHTML;
}

function addToDo(){
    const inputElement = document.querySelector(".js-name-input");
    const name = inputElement.value;

    const dateInputElement = document.querySelector('.js-date-input');
    const dueDate = dateInputElement.value;

    toDoList.push({
        name : name,
        dueDate: dueDate
    });
    console.log(toDoList);

    inputElement.value = '';
    renderTodoList();
    
}
