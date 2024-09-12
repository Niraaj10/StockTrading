import React from 'react'

const RealtimeStocks = () => {
  return (
    <div className='mt-20'>
      Real Time Stocks
      <div className='stocktable'>

        <div className='border border-[#303030] rounded-lg  text-white'>
          <table className="table-fixed border-collapse bg-gray-400 bg-opacity-5">
            <thead className=' '>
              <tr className=' '>
                <th className='border-r border-[#303030] p-2'>Song</th>
                <th className=' border-[#303030] p-2'>Artist</th>
                <th className='border-l border-[#303030] p-2'>Year</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td className='border-r border-t border-[#303030] p-2 px-7'>The Sliding Mr. Bones (Next Stop, Pottersville)</td>
                <td className='border-l border-t border-[#303030] p-2 px-7'>Malcolm Lockyer</td>
                <td className='border-l border-t border-[#303030] p-2 px-7'>1961</td>
              </tr>
             
              <tr>
                <td className='border-r border-t border-[#303030] p-2 px-7'>The Sliding Mr. Bones (Next Stop, Pottersville)</td>
                <td className='border-l border-t border-[#303030] p-2 px-7'>Malcolm Lockyer</td>
                <td className='border-l border-t border-[#303030] p-2 px-7'>1961</td>
              </tr>
              
              <tr>
                <td className='border-r border-t border-[#303030] p-2 px-7'>The Sliding Mr. Bones (Next Stop, Pottersville)</td>
                <td className='border-l border-t border-[#303030] p-2 px-7'>Malcolm Lockyer</td>
                <td className='border-l border-t border-[#303030] p-2 px-7'>1961</td>
              </tr>

              <tr>
                <td className='border-r border-t border-[#303030] p-2 px-7'>The Sliding Mr. Bones (Next Stop, Pottersville)</td>
                <td className='border-l border-t border-[#303030] p-2 px-7'>Malcolm Lockyer</td>
                <td className='border-l border-t border-[#303030] p-2 px-7'>1961</td>
              </tr>
              
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default RealtimeStocks
