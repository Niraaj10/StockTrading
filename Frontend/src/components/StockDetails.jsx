import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { CiSearch } from "react-icons/ci";
import io from 'socket.io-client';
import { Chart } from 'chart.js';
import 'chartjs-chart-financial';

const StockDetails = () => {
    // const { stock } = useParams()
    const [stockData, setStockData] = useState([]);
    const [selectedStock, setSelectedStock] = useState('AAPL'); 

    // console.log(stock)
  const socket = io('http://localhost:5001');

  socket.on('connect', () => {
    console.log('Connected to the socket server');
  });


  useEffect(() => {
    socket.emit('selectStock', selectedStock);

    socket.on('stockChartUpdates', (data) => {
      console.log(data)
      const { c: currentPrice, t: timestamp } = data; 

      setStockData((prevData) => [
        ...prevData,
        { price: currentPrice, time: new Date(timestamp * 1000).toLocaleTimeString() },
      ]);
    });

    return () => {
      socket.off('stockChartUpdates'); 
    };
  }, [selectedStock]);


  // console.log(stockData)

  return (
    <>
      <div className=''>
      {/* StockDetails */}

      <div className='relative '>
      <CiSearch size={20}  className='absolute top-[7px] left-1 text-[#303030]'/>
        <input type="text" className='pl-7 focus:outline-green-800 rounded-2xl w-[30vw] focus:border-none outline-none border border-[rgb(48,48,48)] bg-transparent py-1' />
      </div>

        {/* <div className='border border-[#303030] p-2 px-5 rounded-xl'>
          <Link to='/login'>
            Login
          </Link>
        </div> */}
        


      </div>
      

    </>
  )
}

export default StockDetails
