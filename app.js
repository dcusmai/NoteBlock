let toDoItems = [];

function ToDo (description) {
    this.description = description;
    this.complete = false;
}

ToDo.prototype.completeToDo = function () {
    this.complete = !this.complete; // Para que al hacer clic cambie el estado completo/incompleto o viceversa
}

function buildToDo (todo, index) {
    let toDoShell = document.createElement('div');
    toDoShell.className = 'toDoShell';

    let toDoText = document.createElement('span');
    toDoText.innerHTML = todo.description;
    toDoText.id = index;

    if(todo.complete) {
        toDoText.className = 'completeText';
    }

    toDoShell.appendChild(toDoText); // <div> <span></span> </div>

    toDoText.addEventListener('click', completeToDo); // Acá estoy llamando a la fc completeToDo cuando se hace click sobre el texto, no al método. Es la que está al final.
    
    return toDoShell;
}

function buildToDos (toDos) { // [{description: '', complete: false}, {description: '', complete: false}, ...] instancias de la clase toDo
    let arrayToDos = toDos.map(function(todo, index) { // No sé por qué ToDo estaba como todo acá y abajo.
        return buildToDo(todo, index)
    })
    return arrayToDos;
}

function displayToDos() {
    let toDoContainer = document.querySelector('#toDoContainer');
    toDoContainer.innerHTML = '';
    let result = buildToDos(toDoItems);

    for(i = 0; i < result.length; i++) {
        toDoContainer.appendChild(result[i])
    }
}

function addToDo() {
    let input = document.querySelector('#toDoInput');
    
    if(input.value !== '') {
        
        let todo = new ToDo (input.value);
        toDoItems.push(todo);
        input.value = '';
        displayToDos(); // Ver si acá va ejecutada o no.
    }
}

let button = document.querySelector('#addButton');
button.addEventListener('click', addToDo);

let enter = document.querySelector('#toDoInput');
enter.addEventListener('keyup', function(event) {
    if(event.key === 'Enter') {
        addToDo();
    }
});

function completeToDo(event) {
    const index = event.target.id;
    toDoItems[index].completeToDo();
    displayToDos();
}

if (typeof module !== 'undefined') {
    module.exports = {
      toDoItems: toDoItems,
      ToDo: ToDo,
      buildToDos: buildToDos,
      buildToDo: buildToDo,
      completeToDo: completeToDo,
      displayToDos: displayToDos,
      addToDo: addToDo
    };
  }