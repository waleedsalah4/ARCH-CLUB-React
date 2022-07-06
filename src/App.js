import React from 'react'
import {
  Routes,
  Route,
} from "react-router-dom";
import LandingPage from './components/LandingPage';
import Home from './components/home/Home';
import SignIn from './components/register/SignIn';
import SignUp from './components/register/SignUp';
import ForgotPassword from './components/register/ForgotPassword';


function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/home' element={<Home />} />


        {/* Register */}
        <Route path='/signin' element={<SignIn />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
      </Routes>
    </>
  )
}

export default App
