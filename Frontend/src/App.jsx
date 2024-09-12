import { useContext, useState } from 'react'
import './index.css'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import { UserContext } from "./UserContext";
import Navbar from './components/Navbar'
import Home from './components/Home'
import PartBg from './components/PartGb'
import Login from './components/Login'

function App() {
  const { user } = useContext(UserContext)


  return (
    <>
      <BrowserRouter>

          <div className=' min-h-screen bg-gradient-to-b from-gray-900 to-black'>

            {/* heyyyy */}
            {/* <PartBg /> */}

            <Navbar />


            <Routes>
              <Route index element={<Home />} />
              {/* <Route path='/videos' element={<Videos />} /> */}

              {/* <Route path='/login' element={<Login />} /> */}
              <Route
                path="/login"
                element={user ? <Navigate to="/" /> : <Login />}
              />

            </Routes>
          </div>

      </BrowserRouter>
    </>
  )
}


export default App
