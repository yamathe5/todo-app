import React from 'react'
import {Form,Button,Card,Alert, Container} from "react-bootstrap"
import { useAuth } from '../context/AuthContext'
import { Link, useNavigate } from "react-router-dom"
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from '../firebase.js';

export default function Signup() {
  const emailRef = React.useRef()
  const passwordRef = React.useRef()
  const passwordConfirmRef = React.useRef()

  const { signup } = useAuth()
  const [error, setError] = React.useState("")
  const [loading, setLoading] = React.useState(false)
  const navigate  = useNavigate()

  async function handleAdd(newUser){
    try {
      await setDoc(doc(db, "users", newUser.user.uid), {
        email: emailRef.current.value,
        todos: [],
        timeStamp: serverTimestamp(),
      });
    } catch (error) {
      console.log(error)
    }
  }

  async function handleSubmit(e){
    e.preventDefault()

    if(passwordRef.current.value !== passwordConfirmRef.current.value){
      return setError("Passwords do not match")
    }
    
    try {
      setError("")
      setLoading(true)
      const newUser = await signup(emailRef.current.value, passwordRef.current.value)
      handleAdd(newUser)
      navigate('/my-notes')
    } catch (error) {
      setError("Failed to create an account")
    }
    setLoading(false)
  }

  return (
    <>
    <Container
      className="d-flex align-items-center justify-content-center app"
    >
      <div className="w-100" style={{maxWidth:"400px"}}>

        <Card>
            <Card.Body>
              <h2 className='text-center mb-4'>Sign up</h2>
              {/* {JSON.stringify(currentUser)} | {currentUser.email} => al ocmienzo el usuario es null*/}
              {error && <Alert variant="danger">{error}</Alert >}
              <Form onSubmit={handleSubmit}  >
                <Form.Group id="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" ref={emailRef}  required/>
                </Form.Group>
                <Form.Group id="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" ref={passwordRef}  required/>
                </Form.Group>
                <Form.Group id="password-confirm">
                  <Form.Label>Password confirmation</Form.Label>
                  <Form.Control type="password" ref={passwordConfirmRef}  required/>
                </Form.Group>
                <Button disabled={loading} className="w-100" type="submit">Sign up</Button>
              </Form>
            </Card.Body>
          </Card>
          <div className='w-100 text-center mt-2'>
            Already have an account? <Link to="/login">Login</Link> 
          </div>
        </div>
      </Container>

    </>
  )
}
