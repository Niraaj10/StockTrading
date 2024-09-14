import React, { useEffect, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { CiSearch } from "react-icons/ci";
import io from 'socket.io-client';
import ReactApexChart from 'react-apexcharts';


const StockDetails = ({ stock }) => {
  // const { stock } = useParams()
  const [stockData, setStockData] = useState([]);
  const [selectedStock, setSelectedStock] = useState('AAPL');

  // console.log(stock)

  
  
  // const socket = io('http://localhost:5001');

  const socket = io(
    process.env.NODE_ENV === 'production'
      ? 'https://stocktrading-1.onrender.com'
      : 'http://localhost:5001'
  );

  
  useEffect(() => {
    if (stock) {
      setSelectedStock(stock);
    }

    setStockData([]);
  }, [stock]);
  
  useEffect(() => {
   if (selectedStock) {
      socket.emit('selectStock', selectedStock);
    }
  
    socket.on('connect', () => {
      // console.log('Connected to the socket server');
    });
  
    socket.on('stockChartUpdates', (data) => {
      const { c, o, h, l, t } = data;
  
      const newCandle = {
        x: new Date(t * 1000),
        y: [o, h, l, c],
      };
  
      setStockData((prevData) => [...prevData, newCandle]);
    });
  
    return () => {
      socket.off('stockChartUpdates');
    };
  }, [selectedStock]);

  // console.log(stockData)




  const chartOptions = {
    chart: {
      type: 'candlestick',
      height: 350
    },
    title: {
      text: 'CandleStick Chart',
      align: 'left'
    },
    xaxis: {
      type: 'datetime'
    },
    yaxis: {
      tooltip: {
        enabled: true
      }
    }
  }


  // console.log(stockData)

  return (
    <>
      <div className='p-2 pt-4'>
        {/* StockDetails */}

        <div className='relative  mb-11'>
          <CiSearch size={20} className='absolute top-[7px] left-1 text-[#303030]' />
          <input type="text" className='pl-7 focus:outline-green-800 rounded-2xl w-[30vw] focus:border-none outline-none border border-[rgb(48,48,48)] bg-transparent py-1' />
        </div>

        {/* <div className='border border-[#303030] p-2 px-5 rounded-xl'>
          <Link to='/login'>
            Login
          </Link>
        </div> */}

        <div className='chart-container'>
          {/* <canvas ref={chartRef} width={400} height={200}></canvas> */}

          <div>{selectedStock}</div>

          <ReactApexChart 
          options={chartOptions} 
          series={[
            {
              name: `${selectedStock} Stock Prices`,
              data: stockData,
            },
          ]} 
          type="candlestick" height={500}
          className='text-black'
          />

        </div>

      </div>


    </>
  )
}

export default StockDetails



