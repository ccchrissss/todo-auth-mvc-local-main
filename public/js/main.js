const deleteBtn = document.querySelectorAll('.del')
const todoItem = document.querySelectorAll('span.not')
const todoComplete = document.querySelectorAll('span.completed')
const editBtn = document.querySelectorAll('.edit')
const editSaveBtn = document.querySelectorAll('.save')
const itemEditInput = document.querySelector('.item-edit-input')


Array.from(deleteBtn).forEach((el)=>{
    el.addEventListener('click', deleteTodo)
})

Array.from(todoItem).forEach((el)=>{
    el.addEventListener('click', markComplete)
})

Array.from(todoComplete).forEach((el)=>{
    el.addEventListener('click', markIncomplete)
})





Array.from(editBtn).forEach((el)=>{
    el.addEventListener('click', showEditInputBox)
})



Array.from(editSaveBtn).forEach( element => {
    // console.log('Array.from(showNoteBtn): ', showNoteBtn)
    element.addEventListener('click', editItem)
})




async function deleteTodo(){
    const todoId = this.parentNode.dataset.id
    try{
        const response = await fetch('todos/deleteTodo', {
            method: 'delete',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'todoIdFromJSFile': todoId
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}

async function markComplete(){
    const todoId = this.parentNode.dataset.id
    try{
        const response = await fetch('todos/markComplete', {
            method: 'put',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'todoIdFromJSFile': todoId
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}

async function markIncomplete(){
    const todoId = this.parentNode.dataset.id
    try{
        const response = await fetch('todos/markIncomplete', {
            method: 'put',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'todoIdFromJSFile': todoId
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}


function showEditInputBox() {
    // console.log('notes: ', notes)

    console.log('the node list: ', this.parentNode.childNodes)
    // document.querySelector('.item-note-form').style.display = 'block'

    // notes.classList.toggle('item-note-display-toggle')
    this.parentNode.childNodes[11].classList.toggle('item-edit-input-display-toggle')
    this.parentNode.childNodes[13].classList.toggle('item-edit-save-display-toggle')
    // notesSaveBtn.classList.toggle('button-display-toggle')

    // this.parentNode.parentNode.childNodes[12].classList.toggle('button-display-toggle')
    console.log('Edit button has been clicked')
}

async function editItem(){
    // const itemText = this.parentNode.childNodes[1].innerText
    const itemTextID = this.parentNode.dataset.id

    const itemTextV2 = this.parentNode.childNodes[11].innerText

    // const 

    console.log('itemTextID:', itemTextID)


    console.log(this.parentNode.childNodes)
    // console.log(itemText)
    console.log(itemTextV2)

    // id = id.charAt(0).toUpperCase() + id.slice(1)
    // console.log('editNote id: ', id)
    // console.log(itemText)
    // console.log(noteText)

    try{
        const response = await fetch('todos/editItem', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'itemTextIDFromJS': itemTextID,
                'itemTextV2FromJS': itemTextV2
            })
          })
        const data = await response.json()
        console.log(data)

        location.reload()
    }catch(err){
        console.log(err)
    }
}