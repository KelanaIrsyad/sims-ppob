import React, { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import TopUpPage from './pages/TopUpPage';
import Transaction from './pages/Transaction';
import ProfilePage from './pages/ProfilePage';
import { useAuthStore } from './store/useAuthStore';
import { Toaster } from "react-hot-toast";

function App() {

  const { authUser, checkAuth } = useAuthStore();
  
  useEffect(() => {
    checkAuth()
  }, [])

  return (
    <>
    <Routes>
      <Route path="/" element={authUser ? <HomePage/>  : <Navigate to={"/login"}/> } />
      <Route path="/login" element={!authUser ? <LoginPage/>  : <Navigate to={"/"}/> } />
      <Route path="/registration" element={<RegisterPage/>} />
      <Route path="/profile" element={authUser ? <ProfilePage/> : <Navigate to={"/"}/>} />
      <Route path="/topup" element={authUser ? <TopUpPage/>: <Navigate to={"/"}/>} />
      <Route path="/transaction" element={authUser ? <Transaction/>: <Navigate to={"/"}/>} />
    </Routes>

    <Toaster />
    </>
  )
}

export default App
