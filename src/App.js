import React, { useState,useRef, useEffect } from 'react';
import TodoList from './Components/TodoList';
import uuidv4 from 'uuid/v4';
import M from "materialize-css";

const LOCAL_STORAGE_KEY = 'todoApp.todos'

function App() {
  const [todos, setTodos] = useState([])
  const todoNameRef = useRef()

  useEffect(() => {
    
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if (storedTodos)  setTodos(storedTodos)
  }, [])

  useEffect(() =>{
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  function toggleTodo(id) {
    const newTodos = [...todos]
    const todo = newTodos.find(todo => todo.id === id)
    todo.complete = !todo.complete
    setTodos(newTodos)
  }

  function handleAddTodo(e){
    const name = todoNameRef.current.value
    if (name==='') return
    setTodos(prevTodos =>{
      return [{id:uuidv4(), name: name,complete: false},...prevTodos ]
    })  
    todoNameRef.current.value = null
  }
  function handleClearTodos(){
    const newTodos = todos.filter(todo => !todo.complete)
    setTodos(newTodos)
  }

  function deleteTodo(id) {
    const newTodos = todos.filter(todo => todo.id !== id)
    setTodos(newTodos)
  }

  return (
    <div className="container">
      <h1 >Todo List</h1> 
      <div class="row">
        <div class="col s8 l10"> 
          <input ref={todoNameRef}  type="text" placeholder="To Do Item"/>
        </div>
        <div class="col s2">
          <button onClick={handleAddTodo} className="waves-effect waves-light btn">Add</button>
        </div>      
      </div>
      
      <TodoList todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo}/>
       
        {todos.length === 0 ?
          null:
          <div>
            <div class="row">
              <div class="col s3 offset-s2" > 
                <h5 class="teal-text text-darken-2">{todos.filter(todo => !todo.complete).length} left to do</h5>
              </div> 
              <div class="col s4" > 
                <button  onClick={handleClearTodos} className="waves-effect waves-light btn">Clear Completed</button>
              </div> 
            </div>
          </div>
        }                     
    </div>
  );
}

export default App;
