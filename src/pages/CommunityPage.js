import React from "react";
import Todos from "../components/Todos";
import "../styles/index.scss";
import { db } from "../firebase";
import { serverTimestamp } from "firebase/firestore";
import { doc, setDoc, deleteDoc } from "firebase/firestore";
import { collection, onSnapshot } from "firebase/firestore";
import ResizeTextArea from "../features/ResizeTextArea";
import FirebaseLongLogo from "../images/FirebaseLongLogo.png";
import ReactLogo from "../images/ReactLogo.png";

function reducer(state, action) {
  switch (action.type) {
    case "add-todo":
      state = [action.todo, ...state];
      return state;
    case "complete-todo":
      state = state.map((todo) => {
        if (todo.id === action.payload.id) {
          return { ...todo, complete: !todo.complete };
        }
        return todo;
      });
      return state;
    case "delete-todo":
      state = state.filter((todo) => todo.id !== action.payload.id);
      return state;
    case "set-data":
      return orderData(action.payload.data);
    default:
      return state;
  }
}

function orderData(list) {
  return list.sort((a, b) => b.id - a.id);
}

async function deleteTodo(todoId) {
  await deleteDoc(doc(db, "communityNotes", todoId.toString()));
}

function newTodo(name, content) {
  return { id: Date.now(), name: name, content: content, complete: false };
}

async function addNoteToCommunity(name, content) {
  let todo = newTodo(name, content);
  try {
    await setDoc(doc(db, "communityNotes", todo.id.toString()), {
      ...todo,
      timeStamp: serverTimestamp(),
    });
  } catch (error) {
    console.log(error);
  }
}

function CommunityPage() {
  const [name, setName] = React.useState("");
  const [content, setContent] = React.useState("");
  const [todos, dispatch] = React.useReducer(reducer, []);

  React.useEffect(() => {
    const unsub = onSnapshot(
      collection(db, "communityNotes"),
      (snapShot) => {
        let list = [];
        snapShot.docs.forEach((doc) => {
          list.push(doc.data());
        });
        dispatch({ type: "set-data", payload: { data: list } });
      },
      (error) => {
        console.log(error);
      }
    );
    return () => {
      unsub();
    };
  }, []);

  function handleChangeName(e) {
    setName(e.target.value);
  }
  function handleChangeContent(e) {
    ResizeTextArea(e, "56px");
    setContent(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch({ type: "add-todo", todo: newTodo(name, content) });
    addNoteToCommunity(name, content);
    setName("");
    setContent("");
  }

  return (
    <>
      <div className="css-container">
        <div className="logo-container">
          <img
            className="logo-container__react"
            src={ReactLogo}
            alt="React Logo"
          />
          <span className="logo-container__plus">+</span>
          <img
            className="logo-container__firebase"
            src={FirebaseLongLogo}
            alt="Firebase Logo"
          />
        </div>
        <form className="form" onSubmit={handleSubmit}>
          <label htmlFor="title" className="input">
            <input
              type="text"
              id="title"
              placeholder="&nbsp;"
              onChange={handleChangeName}
              value={name}
            />
            <span className="label">Titulo</span>
            <span className="focus-bg"></span>
          </label>
          <label htmlFor="content" className="input">
            <textarea
              type="text"
              id="content"
              placeholder="&nbsp;"
              onChange={handleChangeContent}
              value={content}
            />
            <span className="label">Contenido</span>
            <span className="focus-bg"></span>
          </label>

          <button className="input-btn" type="submit">
            Set Note
          </button>
        </form>

        <Todos todos={todos} dispatch={dispatch} deleteTodo={deleteTodo} />
      </div>
    </>
  );
}

export default CommunityPage;
