import React from 'react';
import "./styles/index.scss"
import LoginPage from './pages/LoginPage';
import { AuthProvider } from './context/AuthContext';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import SignupPage from './pages/SignupPage';
import CommunityPage from './pages/CommunityPage';
import MyNotes from './pages/MyNotes';
import PrivateRoutes from './components/PrivateRoutes';
import UserPrivateRoutes from './components/UserPrivateRoutes';
import Header from './components/Header';


function App() {

  return (
      
    <div className='app-container'>
      <Router>

        <AuthProvider>
          <Header/>
          <Routes>
            
            <Route path='/login' element={<UserPrivateRoutes/>}>
              <Route path='/login' element={ <LoginPage/>}/>
            </Route>
            
            <Route path='/signup' element={<UserPrivateRoutes/>}>
              <Route path='/signup' element={ <SignupPage/>}/>
            </Route>

            <Route path='/my-notes' element={<PrivateRoutes/>}>
              <Route path='/my-notes' element={ <MyNotes/>}/>
            </Route>
            
            <Route path='/*' element={ <CommunityPage/>}/>
            
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
