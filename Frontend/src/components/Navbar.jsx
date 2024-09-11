import React, { useEffect, useState } from 'react'
import io from 'socket.io-client';

const Navbar = () => {
    const [liveStocks, setLiveStocks] = useState([]);

    const socket = io('http://localhost:5001');
    
    socket.on('connect', () => {
        console.log('Connected to the socket server');
    });
    
    const setupSocketConnection = () => {

        socket.on('stockUpdates', (data) => {
            // console.log('Received stockUpdates:', data); 
            
            const updatedData = data.map((stock) => {
                const { c: currentPrice, pc: previousClose } = stock.data;
                const percentageChange = ((currentPrice - previousClose) / previousClose) * 100;
    
                return {
                    symbol: stock.symbol,
                    currentPrice,
                    percentageChange: percentageChange.toFixed(2),
                    absoluteChange: (currentPrice - previousClose).toFixed(4),
                };
            });
            setLiveStocks(updatedData);
        });

        
        socket.on('disconnect', () => {
            console.log('Disconnected from the socket server');
        });
        
        return socket;
    };
    console.log(liveStocks)
    
    // const socket = io('http://localhost:5001')





    useEffect(() => {
        setupSocketConnection()
    }, []);


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
                <div className='LiveStocks flex justify-evenly'>
                    {
                        liveStocks && liveStocks?.map((stock, index) => (
                            <div key={index} className="stock-item ">
                                <div>{stock.symbol}</div>
                                <div>{stock.currentPrice}</div>
                                <div className={`${stock.percentageChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                                    <div>{stock.percentageChange >= 0 ? '↑' : '↓'} {stock.percentageChange}%</div>
                                    <div>({stock.absoluteChange})</div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Navbar