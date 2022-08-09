import React from 'react'
import {Form,Button,Card,Alert} from "react-bootstrap"
import { useAuth } from '../context/AuthContext'
import { Link, useNavigate } from "react-router-dom"


export default function Signup() {
  const emailRef = React.useRef()
  const passwordRef = React.useRef()
  const passwordConfirmRef = React.useRef()

  const { signup } = useAuth()
  const [error, setError] = React.useState("")
  const [loading, setLoading] = React.useState(false)
  const navigate  = useNavigate()


  async function handleSubmit(e){
    e.preventDefault()

    if(passwordRef.current.value !== passwordConfirmRef.current.value){
      return setError("Passwords do not match")
    }
    try {
      setError("")
      setLoading(true)
      await signup(emailRef.current.value, passwordRef.current.value)
      navigate('/')
    } catch (error) {
      setError("Failed to create an account")
    }
    setLoading(false)
  }

  return (
    <>
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
    </>
  )
}
