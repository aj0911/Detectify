import React from 'react'
import Home from './Components/Home/Home'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

const App = () => {
  return (
    <>
    <Home/>
    <ToastContainer/>
    </>
  )
}

export default App