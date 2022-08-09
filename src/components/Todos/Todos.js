import React from 'react'
import Todo from './Todo'

export default function Todos({todos, dispatch, deleteTodo}) {
  return (
    <div className='todo-list'>
        {todos.map((todo)=>{
          return <Todo key={todo.id} dispatch={dispatch} todo={todo} deleteTodo={deleteTodo} />
        })}
    </div>
  )
}
