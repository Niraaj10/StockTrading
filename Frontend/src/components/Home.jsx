import React from 'react'
import './floatingPart.css'

const Home = () => {
  return (
    <>
      <div className='Home relative h-[83vh] w-full  border-b  '>
        Home

        <div className="absolute inset-0 overflow-hidden z-0">
          <div className="particle bg-green-500"></div>
          <div className="particle bg-green-400"></div>
          <div className="particle bg-green-300"></div>
          <div className="particle bg-green-600"></div>
          <div className="particle bg-green-200"></div>
        </div>

        <div className='absolute left-[300px] rounded-full  mx-auto float green-glow'>   </div>
        <div className='absolute bottom-[100px] right-[300px] rounded-full  mx-auto float green-glow'>   </div>


      </div>
    </>
  )
}


export default Home