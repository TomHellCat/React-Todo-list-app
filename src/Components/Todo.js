import React from 'react'

export default function Todo({ todo, toggleTodo, deleteTodo }) {
    function handleTodoClick(){
        toggleTodo(todo.id)
    }
    function handleDeleteTodo(){
        deleteTodo(todo.id)
    }
    return (
       <div className="row">
           <div className="col s8 l10">
            <label>
                    <input type="checkbox" checked={todo.complete} onChange={handleTodoClick}/>
                    <span class="teal-text text-darken-2">{todo.name}</span>
            </label>
           </div>
            <div className="col s2">
                <button onClick={handleDeleteTodo} className="waves-effect waves-light btn">Delete</button> 
            </div>         
        </div>
    )
}

