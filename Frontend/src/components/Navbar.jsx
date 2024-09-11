import React from 'react'

const Navbar = () => {
  return (
    <div className='Navbar border border-white'>
        {/* Navbar */}
        <div className='upperbar flex justify-between px-20'>
            <div className='logo'>
                STOCK/
                <span className='text-green-500'>TRADING</span>
            </div>

            <div className='Sec flex'>
                <ul className='flex gap-9'>
                <li>News</li>
                <li>About Us</li>
                </ul>
            </div>

            <div className='User'>
                <div>
                    Login
                </div>
            </div>
        </div>


        <div className='lowerbar border border-t'>
            <div className='LiveStocks'>

            </div>
        </div>
    </div>
  )
}

export default Navbar