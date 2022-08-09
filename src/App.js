import React from 'react';
import Header from './components/Header';
import "./styles/index.scss"
import LoginPage from './pages/LoginPage';
import { AuthProvider } from './context/AuthContext';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import SignupPage from './pages/SignupPage';
import CommunityPage from './pages/CommunityPage';
import MyNotes from './pages/MyNotes';
import PrivateRoutes from './components/PrivateRoutes';

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

function newTodo(name, content){
  return {id:Date.now(), name: name, content:content, complete:false }
}

function App() {
  // const [name, setName] = React.useState("")
  // const [content, setContent] = React.useState("")
  // const [todos, dispatch] = React.useReducer(reducer,[])

  // function handleChangeName(e){
  //   setName(e.target.value)
  // }
  // function handleChangeContent(e){
  //   setContent(e.target.value)
  // }

  // function handleSubmit(e){
  //   e.preventDefault()
  //   dispatch({type:"add-todo", todo:newTodo(name, content)})
  //   setName("")
  //   setContent("")
  // }

  return (
    <>
    
    <Router>

      <AuthProvider>
        <Routes>
          <Route exact path='/login' element={ <LoginPage/>}/>
          <Route exact path='/signup' element={ <SignupPage/>}/>
          <Route path='/' element={<PrivateRoutes/>}>
            <Route path='/' element={ <MyNotes/>}/>
          </Route>
          <Route path='/community' element={<PrivateRoutes/>}>
            <Route path='/community' element={ <CommunityPage/>}/>
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
      {/* <div className='container'>
        <form className='form' onSubmit={handleSubmit} >
          <label for="title" className="input">
            <input type="text" id="title" placeholder="&nbsp;" onChange={handleChangeName} value={name}/>
            <span className="label">Titulo</span>
            <span className="focus-bg"></span>
          </label>
          <label for="content" className="input">
            <input type="text" id="content" placeholder="&nbsp;" onChange={handleChangeContent} value={content}/>
            <span className="label">Contenido</span>
            <span className="focus-bg"></span>
          </label>
          <button className='input-btn' type="submit">Set todo</button>
        </form>
        <Todos todos={todos} dispatch={dispatch}/>
      </div> */}
    </>
  );
}

export default App;
