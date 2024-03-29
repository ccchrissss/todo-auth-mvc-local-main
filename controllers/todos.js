const Todo = require('../models/Todo')

module.exports = {
    getTodos: async (req,res)=>{
        console.log(req.user)
        try{
            const todoItems = await Todo.find({userId:req.user.id})
            const itemsLeft = await Todo.countDocuments({userId:req.user.id,completed: false})
            const itemsTotal = await Todo.countDocuments({userId:req.user.id,completed: true})
            res.render('todos.ejs', {todos: todoItems, left: itemsLeft, total: itemsTotal, user: req.user})
        }catch(err){
            console.log(err)
        }
    },
    createTodo: async (req, res)=>{
        try{
            await Todo.create({todo: req.body.todoItem, completed: false, userId: req.user.id})
            console.log('Todo has been added!')
            res.redirect('/todos')
        }catch(err){
            console.log(err)
        }
    },
    markComplete: async (req, res)=>{
        try{
            await Todo.findOneAndUpdate({_id:req.body.todoIdFromJSFile},{
                completed: true
            })
            console.log('Marked Complete')
            res.json('Marked Complete')
        }catch(err){
            console.log(err)
        }
    },
    markIncomplete: async (req, res)=>{
        try{
            await Todo.findOneAndUpdate({_id:req.body.todoIdFromJSFile},{
                completed: false
            })
            console.log('Marked Incomplete')
            res.json('Marked Incomplete')
        }catch(err){
            console.log(err)
        }
    },
    deleteTodo: async (req, res)=>{
        console.log(req.body.todoIdFromJSFile)
        try{
            await Todo.findOneAndDelete({_id:req.body.todoIdFromJSFile})
            console.log('Deleted Todo')
            res.json('Deleted It')
        }catch(err){
            console.log(err)
        }
    },
    editItem: async (req, res)=>{
        
        try{
            await Todo.findOneAndUpdate(
                {_id:req.body.itemTextIDFromJS},
                {$set: { todo: req.body.itemTextV2FromJS }},
                {
                    sort: {_id: -1},
                    upsert: false
                }
            )
            console.log('Item Edited')
            res.json('Item Edited')

        }catch(err){
            console.log(err)
        }

    }
}    


// app.put('/edit-note-monday', (request, response) => {
//     mealPlanCollection
//         .updateOne(
//             {mondaymeal: request.body.itemFromJS},
//             {$set: { note: request.body.noteFromJS } },
//         {
//             sort: {_id: -1},
//             upsert: false
//         })
//         .then(result => {
//             console.log('Updated note meal plan Monday')
//             response.json('Updated note meal plan Monday')
//         })
//         .catch(error => console.error(error))
// })