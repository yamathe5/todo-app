
export default function Todo ({todo, dispatch}){
  return (
  <div> 
    <span >{todo.name}</span>
    <button onClick={() => dispatch({type:"complete-todo", payload:{id:todo.id}})}>Completed</button>
    <button onClick={() => dispatch({type:"delete-todo", payload:{id:todo.id}})}>Delete</button>
  </div>
  )
}