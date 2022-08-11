import {ReactComponent as TrashIcon} from "../../svg/trash-icon.svg"

export default function Todo ({todo, dispatch, deleteTodo}){

  function handleDelete(){
    console.log("delete")
    dispatch({type:"delete-todo", payload:{id:todo.id}})
    deleteTodo(todo.id)
  }

  return (
  <div className="todo">
    <h3 className="todo__title" >{todo.name}</h3>
    <p className="todo__content">{todo.content}</p>
        <button className="todo__delete" onClick={handleDelete}><TrashIcon/></button>
  </div>
  )
}