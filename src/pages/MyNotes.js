import React from 'react'
import Todos from '../components/Todos'

import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from '../firebase.js';
import { useAuth } from "../context/AuthContext"
import { getDoc } from 'firebase/firestore';
import ResizeTextArea from "../features/ResizeTextArea.js"

function reducer(state, action){
  switch (action.type) {
    case "add-todo":
      state = [action.todo, ...state]
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
    case "set-data":
      return orderData(action.payload.data)
    default:
      return state 
  }
}

function newTodo(name, content){
  return {id:Date.now(), name: name, content:content, complete:false, }
}

async function addNoteToMyPage(userData, currentUser, name, content, todos){
  let todo = newTodo(name, content)
  try {
    await setDoc(doc(db, "users", currentUser.uid.toString()), {
      ...userData,
      todos: [...todos, todo],
    });
  } catch (error) {
    console.log(error)
  }
}

function orderData(list){
  return list.sort((a, b)=> b.id - a.id)
}

export default function MyNotes() {
  const [name, setName] = React.useState("")
  const [content, setContent] = React.useState("")
  const [todos, dispatch] = React.useReducer(reducer,[])
  const [userData, setUserData] = React.useState(null)

  const { currentUser } = useAuth()

  React.useEffect(()=>{
    let list = []
    async function fetchData (){
      try {
        const querySnapshot = await getDoc(doc(db, "users", currentUser.uid))
        list = querySnapshot.data().todos
        setUserData(querySnapshot.data())
        dispatch({type:"set-data", payload:{data:list}})
      } catch (error) {
        console.log(error)
      }
    };
    fetchData();
  },[currentUser.uid])

  async function deleteTodo(todoId){
    let newList = [] 
    newList = todos.filter((todo)=> todo.id !== todoId)
    try {
      await setDoc(doc(db, "users", currentUser.uid.toString()), {
        ...userData,
        todos: newList,
      });
    } catch (error) {
      console.log(error)
    }
  }

  function handleChangeName(e){
    setName(e.target.value)
  }
  function handleChangeContent(e){
    ResizeTextArea(e,"56px")
    setContent(e.target.value)
  }

  function handleSubmit(e){
    e.preventDefault()
    dispatch({type:"add-todo", todo:newTodo(name, content)})
    addNoteToMyPage(userData, currentUser, name, content, todos)
    setName("")
    setContent("")
  }

  return (
    <>
      <div className='css-container'>
        <form className='form' onSubmit={handleSubmit} >

          <label htmlFor="title" className="input">
            <input type="text" id="title" placeholder="&nbsp;" onChange={handleChangeName} value={name}/>
            <span className="label">Titulo</span>
            <span className="focus-bg"></span>
          </label>
          <label htmlFor="content" className="input">
            <textarea type="text" id="content" placeholder="&nbsp;" onChange={handleChangeContent} value={content}/>
            <span className="label">Contenido</span>
            <span className="focus-bg"></span>
          </label>

          <button className='input-btn' type="submit">Set Note</button>
        </form>
        
        <Todos todos={todos} dispatch={dispatch} deleteTodo={deleteTodo}/>
      </div>
    </>
  )
}
