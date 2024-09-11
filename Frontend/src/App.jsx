import { useState } from 'react'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './components/Home'
import PartBg from './components/PartGb'

function App() {


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
              </Routes>
      </div>
      </BrowserRouter>
    </>
  )
}


export default App
