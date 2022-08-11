import React from 'react';
import Todos from '../components/Todos';
import "../styles/index.scss"
import Header from '../components/Header';
import { db } from '../firebase';
import { serverTimestamp } from 'firebase/firestore';
import { doc, setDoc, deleteDoc } from 'firebase/firestore';
import { collection, onSnapshot } from 'firebase/firestore';
import ResizeTextArea from '../features/ResizeTextArea';

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

function orderData(list){
  return list.sort((a,b)=> b.id - a.id)
}

async function deleteTodo(todoId){
  await deleteDoc(doc(db, "communityNotes", todoId.toString()))
}

function newTodo(name, content){
  return {id:Date.now(), name: name, content:content, complete:false }
}

function CommunityPage() {
  const [name, setName] = React.useState("")
  const [content, setContent] = React.useState("")
  const [todos, dispatch] = React.useReducer(reducer,[])

  React.useEffect(()=>{

    const unsub = onSnapshot(collection(db, "communityNotes"), (snapShot) => {
      let list = []
      snapShot.docs.forEach((doc)=>{
        console.log(doc.data())
        list.push(doc.data())
      })
      dispatch({type:"set-data", payload:{data:list}})
    },(error) => {
      console.log(error)
    });

    return () => {
      unsub()
    }
  },[])
  
  async function addNoteToCommunity(){
    let todo = newTodo(name, content)
    try {
      await setDoc(doc(db, "communityNotes", todo.id.toString()), {
        ...todo,
        timeStamp: serverTimestamp(),
      });
    } catch (error) {
      console.log(error)
    }
  }

  function handleChangeName(e){
    setName(e.target.value)
  }
  function handleChangeContent(e){
    ResizeTextArea(e, "56px")
    setContent(e.target.value)
  }



  function handleSubmit(e){
    e.preventDefault()
    dispatch({type:"add-todo", todo:newTodo(name, content)})
    addNoteToCommunity()
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
  );
}

export default CommunityPage;
