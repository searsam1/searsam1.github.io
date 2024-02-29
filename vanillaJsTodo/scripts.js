
// get box that stores todo's
let todoBox = document.querySelector(".box")
let todoItemInput = document.querySelector("#todoItemInput")

const assignButtonText = (button, codepoint) => {
    let span = document.createElement('span');
    span.className = 'material-symbols-outlined';
    // Use the Unicode escape sequence directly
    span.textContent = String.fromCharCode(parseInt(codepoint, 16)); // Convert codepoint from hex to a character
    button.appendChild(span);
}



const assignButtonClasses = (buttons) => {
    // assign buttons to custom button class (.btn)
    buttons.map(button => button.className = "btn")
}

const createBtns = () => {
    // create markdown and remove buttons
    let markDoneBtn = document.createElement('button')
    let removeBtn = document.createElement('button')
    assignButtonClasses([markDoneBtn, removeBtn])
    assignButtonText(markDoneBtn, "e257")
    assignButtonText(removeBtn, "e53c")
    return [markDoneBtn, removeBtn]
}

const createNewTodoItem = (markDoneBtn, removeBtn) => {
    let newTodo = document.createElement("div")
    let newTodoSpan = document.createElement("span")
    newTodo.className = "todoItem"
    // check if input is empty
    if (!todoItemInput.value) {
        return
    }
    newTodo.appendChild(newTodoSpan)
    newTodoSpan.textContent = todoItemInput.value
    newTodo.appendChild(markDoneBtn)
    newTodo.appendChild(removeBtn)
    return newTodo
}

const resetInput = (element) => {
    // reset input value
    element.value = ""
}

const getTodoList = () => {
    // get buttons for each new todo (done and remove)
    const [markDoneBtn, removeBtn] = createBtns()
    // create new todo and add default buttons
    let newTodo = createNewTodoItem(markDoneBtn, removeBtn)
    markDoneBtn.onclick = () => {
        newTodo.querySelector('span').style.textDecoration = 'line-through';
        newTodo.querySelector('span').style.color = 'lightgrey'
    }
    removeBtn.onclick = () => {
        newTodo.remove()
    }

    // append new todo to todoBox (global todoBox) 
    todoBox.appendChild(newTodo)
    resetInput(todoItemInput)
}

const onClick = () => {
    getTodoList()

} 