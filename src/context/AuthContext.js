import React from 'react'
import { auth } from "../firebase.js"
import { createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updateEmail,
  updatePassword,
  onAuthStateChanged } from "firebase/auth";

const AuthContext = React.createContext()

export function useAuth(){
  return React.useContext(AuthContext)
}

export function AuthProvider({children}) {
  const [currentUser, setCurrentUser] = React.useState()
  const [loading, setLoading] = React.useState(true)

  function signup(email,password) {
    return createUserWithEmailAndPassword(auth, email, password)
  }
  
  function login(email, password){
    return signInWithEmailAndPassword(auth, email, password)
  }

  function logout(){
    return signOut(auth)
  }

  function resetPasword(email){
    return sendPasswordResetEmail(auth, email)
  }

  function updateEmailCall(email){
    return updateEmail(auth.currentUser, email)
  }

  function updatePasswordCall(password){
    return updatePassword(currentUser, password)
  }
  

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      setCurrentUser(user)
      setLoading(false)
    })
    return unsubscribe
  },[])
/*
  async function getUserFromFirestore(user){
    let firestoreUser = await getDoc(doc(db, "users", user.uid.toString()))
    firestoreUser = firestoreUser.data()
    return firestoreUser
  }

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      // setCurrentUser(user)
      // if(currentUser){
        let firestoreUser;
        getUserFromFirestore(user).then((u)=>{
          firestoreUser = {...u, uid: user.uid}
          console.log(firestoreUser)
          setCurrentUser(firestoreUser)
        })
        // }
        setLoading(false)
      
    })
    return unsubscribe
  },[])
*/
  const value = {
    currentUser,
    signup,
    login,
    logout,
    resetPasword,
    updateEmailCall,
    updatePasswordCall
  }
  
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}
