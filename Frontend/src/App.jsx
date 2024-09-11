import { useState } from 'react'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './components/Home'

function App() {


  return (
    <>
      <BrowserRouter>
          {/* heyyyy */}

          <Navbar />

        <Routes>
                <Route index element={<Home />} />
                {/* <Route path='/videos' element={<Videos />} /> */}
              </Routes>
      </BrowserRouter>
    </>
  )
}


export default App
