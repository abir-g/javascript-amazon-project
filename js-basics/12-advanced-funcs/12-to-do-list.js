const toDoList = [{
    name: 'make dinner',
    dueDate : '2022-12-22'
}];

renderTodoList();
function renderTodoList (){
    let toDoListHTML = [];

    toDoList.forEach((todoObject, index)=>{
        const {name, dueDate} = todoObject;
     
        const html = `
            <div>${name}</div>
            <div>${dueDate} </div>
            <button class = "delete-todo-button js-delete-todo-button">delete</button>
        `;
        toDoListHTML+= html;
    });
    document.querySelector(".js-display")
        .innerHTML = toDoListHTML;
        
    document.querySelectorAll('.js-delete-todo-button')
       .forEach((deleteButton, index) => {
        deleteButton.addEventListener('click', () => {
            toDoList.splice(index, 1);
                renderTodoList();
        });
       });
}

document.querySelector('.js-add-todo-button')
    .addEventListener('click', addToDo)


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
