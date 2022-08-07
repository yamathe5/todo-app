import React from 'react';
import './App.css';
import Todo from './components/Todo';

function reducer(state, action){
  switch (action.type) {
    case "add-todo":
      state = [...state, action.todo]
      return state  

    case "complete-todo":
      state = state.map((todo)=>{
        if (todo.id === action.payload.id){
          return {...todo, complete:!todo.complete}
        }
        return todo
      })
      return state 
    case "delete-todo":
      state = state.filter((todo)=> todo.id !== action.payload.id)
      return state
    default:
      return state 
  }
}

function newTodo(name){
  return {id:Date.now(), name: name, complete:false }
}

function App() {
  const [name, setName] = React.useState("")
  const [todos, dispatch] = React.useReducer(reducer,[])

  function handleChangeName(e){
    setName(e.target.value)
  }

  function handleSubmit(e){
    e.preventDefault()
    dispatch({type:"add-todo", todo:newTodo(name)})
    setName("")
  }

  return (
    <div>
      <form onSubmit={handleSubmit} >
        <input type="text" onChange={handleChangeName} value={name}/>
      </form>
      {todos.map((todo)=>{
        return <Todo key={todo.id} dispatch={dispatch} todo={todo} />
      })}
    </div>
  );
}

export default App;
