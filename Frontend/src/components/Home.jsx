import React from 'react'
import './floatingPart.css'
import RealtimeStocks from './RealtimeStocks'

const Home = () => {
  return (
    <>
      <div className='Home relative h-[83vh] w-full    '>
        {/* Home */}

        <div className="absolute inset-0 overflow-hidden z-0">
          <div className="particle bg-green-500 white-gloww"></div>
          <div className="particle bg-green-400 white-gloww"></div>
          <div className="particle bg-green-300 white-gloww"></div>
          <div className="particle bg-green-600 white-gloww"></div>
          <div className="particle bg-green-200 white-gloww"></div>
        </div>

        <div className='absolute left-[300px] rounded-full  mx-auto float green-glow'>   </div>
        <div className='absolute bottom-[100px] right-0 rounded-full  mx-auto float green-glow'>   </div>

        <div className='main mt-24 flex flex-col justify-center items-center w-full h-full'>
          <div className='text-8xl font-bold'>
          Where the world see Charts
          </div>

          <div>
            <RealtimeStocks />
          </div>
        </div>

      </div>
    </>
  )
}


export default Home