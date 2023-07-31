import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { SignIn, SignUp, Main, Trip, Bookings } from './pages';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import { useAppDispatch, useAppSelector } from './store/store';
import { toggleAuth, getUser } from './store/authSlice/auth-slice';
import './App.css'

function App() {
  const {auth, fullName} = useAppSelector(state => state.auth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if(!localStorage.getItem('access_token')) {
      dispatch(toggleAuth(false))
    } else {
      dispatch(toggleAuth(true))
      dispatch(getUser())
    }
   }, [dispatch])

  return (
    <>
      <Header isLoged={auth} username={fullName} />
      <Routes>
        <Route path="*" element={auth ? <Main /> : <SignIn />} />
        <Route path="/sign-in" element={auth ? <Navigate to="/" /> : <SignIn />} />
        <Route path="/sign-up" element={auth ? <Navigate to="/" /> : <SignUp />} />
        <Route path="/trip/:tripId" element={auth ? <Trip /> : <Navigate to="/" />} />
        <Route path="/bookings" element={auth ? <Bookings /> : <Navigate to="/" />} />
      </Routes>
      <Footer/>
    </>
  )
}

export default App
