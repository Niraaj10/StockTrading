import React, { useContext, useEffect, useState } from 'react'
import io from 'socket.io-client';
import { Link } from "react-router-dom";
import { UserContext } from '../UserContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Navbar = () => {
    const [liveStocks, setLiveStocks] = useState([]);
    const { user, logout } = useContext(UserContext)
    // console.log(user)

    const socket = io('http://localhost:5001');

    const setupSocketConnection = () => {

        socket.on('connect', () => {
            // console.log('Connected to the socket server');
        });

        socket.on('stockUpdates', (data) => {
            // console.log('Received stockUpdates:', data); 

            const updatedData = data.map((stock) => {
                const { c: currentPrice, pc: previousClose } = stock.data;
                const percentageChange = ((currentPrice - previousClose) / previousClose) * 100;
                const trimmedSymbol = stock.symbol.includes(':') ? stock.symbol.split(':')[1] : stock.symbol;

                return {
                    symbol: trimmedSymbol,
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
    // console.log(liveStocks)

    // const socket = io('http://localhost:5001')





    useEffect(() => {
        setupSocketConnection()
    }, []);


    return (
        <div className='Navbar px-6'>
            {/* Navbar */}

            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />


            <div className='upperbar py-3 flex justify-between items-center px-20'>
                <div className='logo font-bold logoG  text-2xl'>
                    {/* STOCKTRADING */}
                    <Link to='/'>
                        ViewChart
                    </Link>
                    {/* <span className='text-green-500'>TRADING</span> */}
                </div>

                <div className='Sec flex'>
                    <ul className='flex gap-9'>
                        <li>
                            <Link to='/charts'>
                                Charts
                            </Link>
                        </li>
                        <li>
                            <Link to='/news'>
                                News
                            </Link>
                        </li>
                        {/* <li>About Us</li> */}
                    </ul>
                </div>

                <div className='User flex justify-center items-center gap-4'>
                    {
                        user ? <>
                            <div className='border border-[#303030] p-2 px-5 rounded-xl'>
                                <Link to='/'>
                                    {user?.username}
                                </Link>
                            </div>
                            <div onClick={logout} className='border border-[#303030] p-2 px-5 rounded-xl'>
                                Logout
                            </div>
                        </> : <>
                            <div className='border border-[#303030] p-2 px-5 rounded-xl'>
                                <Link to='/login'>
                                    Login
                                </Link>
                            </div>
                        </>
                    }

                </div>
            </div>


            <div className='lowerbar py-3 border-t border-b border-[#303030]'>
                <div className='LiveStocks flex justify-evenly'>


                    {
                        liveStocks && liveStocks?.map((stock, index) => (
                            <div key={index} className="stock-item px-8  w-[20vw] border-r border-[#303030]">
                                <div className='flex justify-between'>
                                    <div>{stock.symbol}</div>
                                    <div>{stock.currentPrice}</div>
                                </div>

                                <div className={`flex gap-4 ${stock.percentageChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>
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