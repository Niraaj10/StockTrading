import React, { useEffect, useState } from 'react'
import StockDetails from './StockDetails'
import axios from 'axios';

const Chart = () => {
    const [favStocks, setFavStocks] = useState([]);

    const Currencies = [
        { symbol: 'BINANCE:XRPUSDT' },
        { symbol: 'BINANCE:ADAUSDT' },
        { symbol: 'BINANCE:DOGEUSDT' },
        { symbol: 'BINANCE:DOTUSDT' },
        { symbol: 'BINANCE:SOLUSDT' },
        { symbol: 'BINANCE:AVAXUSDT' },
        { symbol: 'BINANCE:LTCUSDT' },
        { symbol: 'BINANCE:LINKUSDT' },
        { symbol: 'BINANCE:UNIUSDT' },
        { symbol: 'BINANCE:ATOMUSDT' },
        { symbol: 'BINANCE:FTTUSDT' },
        { symbol: 'BINANCE:NEOUSDT' },
        { symbol: 'BINANCE:VETUSDT' },
        { symbol: 'BINANCE:TRXUSDT' },
        { symbol: 'BINANCE:XLMUSDT' },
        { symbol: 'BINANCE:MATICUSDT' }
    ]

    const Stockss = [
        { symbol: 'AAPL' },
        { symbol: 'TSLA' },
        { symbol: 'AMZN' },
        { symbol: 'GOOGL' },
        { symbol: 'MSFT' },
        { symbol: 'FB' },
        { symbol: 'NFLX' },
        { symbol: 'NVDA' },
        { symbol: 'BABA' },
        { symbol: 'INTC' },
        { symbol: 'AMD' },
        { symbol: 'V' },
        { symbol: 'JNJ' },
        { symbol: 'WMT' },
        { symbol: 'JPM' },
        { symbol: 'DIS' }
    ]

    const [selectStock, setSelectStock] = useState('');

    const tabs = [
        { name: "Stocks", content: Stockss },
        { name: "Currencies", content: Currencies },
        { name: "Favorites", content: favStocks },
    ];

    const [activeTab, setActiveTab] = useState(tabs[0].name);


const ServerUrl = 'https://stocktrading-1.onrender.com/api'
    const baseUrl = 'http://localhost:5001/api'

    const favStockss = async () => {
        try {
            const res = await axios.get(`${ServerUrl}/stocks/getFavorites`, {
                withCredentials: true
            })

            // console.log(res.data.message)
            setFavStocks(res.data.message.favStocks)
        } catch (error) {
            console.error(error)
        }
    }

    const removeFavoriteStock = async (stock) => {
        try {
            const res = await axios.delete(`${ServerUrl}/stocks/removeFavoriteStock`, {
                data: { stock },
                withCredentials: true
            })

            // console.log(res)
            favStockss();
            // setFavStocks(res.data.message.favStocks)
        } catch (error) {
            console.error(error)
        }
    }

    const addFavoriteStock = async (stock) => {
        try {
            const res = await axios.post(`${ServerUrl}/stocks/addFavoriteStock`,  {
                stock: stock, 
              },  {
                withCredentials: true
            })

            // console.log(res)
            favStockss();
            // setFavStocks(res.data.message.favStocks)
            // setFavStocks(res.data.message.favStocks)
        } catch (error) {
            console.error(error)
        }
    }


    useEffect(() => {
        favStockss()
    }, [])

    console.log(favStocks)


    return (
        <>
            {/* Chart */}

            <div className='charts pt-4 px-10 pb-5 w-full h-[80vh] flex  gap-7 justify-center items-top '>

                <div className='FavStocks p-2 basis-[30%] overflow-y-scroll  hide-scrollbar  border-r border-[#303030] '>
                    <div className='flex border-b border-[#303030]  font-bold text-sm'>

                        {tabs.map((tab) => (
                            <button
                                key={tab.name}
                                onClick={() => setActiveTab(tab.name)}
                                className={` flex items-center p-2 hover:border-b-2 ${activeTab === tab.name ? "text-green-600 border-b-2 border-green-600" : ""
                                    }`}
                            >
                                {tab.name}
                            </button>
                        ))}



                        {/* Favorite Stocks */}
                    </div>

                    <div>

                        {/* {
                            favStocks.map((stock, index) => (
                                <div key={index} className='stock-item px-5 w-full  '>
                                    <div className='flex justify-between p-2 border-b border-[#303030]'>

                                        <div onClick={() => setSelectStock(stock.symbol)}>{stock.symbol}</div>


                                        <div onClick={() => removeFavoriteStock(stock.symbol)} className='border border-[#303030] p-1 px-3 rounded-xl text-red-500'>
                                            Rmove
                                        </div>
                                    </div>
                                </div>
                            ))
                        } */}



                        {
                            tabs
                                .find((tab) => tab.name === activeTab)
                                .content.map((stock, index) => (
                                    <div key={index} className='stock-item px-5 w-full'>
                                        <div className='flex justify-between p-2 border-b border-[#303030]'>

                                            <div onClick={() => setSelectStock(stock.symbol)} className='cursor-pointer'>
                                                {/* {stock.symbol} */}
                                                {stock.symbol.includes(':') ? stock.symbol.split(':')[1] : stock.symbol}
                                            </div>


                                            {activeTab === 'Favorites' && (
                                                <div onClick={() => removeFavoriteStock(stock.symbol)} className='border border-[#303030] p-1 px-3 rounded-xl text-red-500'>
                                                    Remove
                                                </div>
                                            )}


                                            {(activeTab === 'Stocks' || activeTab === 'Currencies') && (
                                                <div onClick={() => addFavoriteStock(stock.symbol)} className='border border-[#303030] p-1 px-3 rounded-xl text-green-500'>
                                                    Add to Favorites
                                                </div>
                                            )}

                                        </div>
                                    </div>
                                ))
                        }

                    </div>

                </div>

                <div className=' p-2 basis-[70%]  '>
                    <StockDetails stock={selectStock} />
                </div>
            </div>
        </>
    )
}

export default Chart
