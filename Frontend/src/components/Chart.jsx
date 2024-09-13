import React, { useEffect, useState } from 'react'
import StockDetails from './StockDetails'
import axios from 'axios';

const Chart = () => {
    const [favStocks, setFavStocks] = useState([]);


    const baseUrl = 'http://localhost:5001/api'

    const favStockss = async () => {
        try {
            const res = await axios.get(`${baseUrl}/stocks/getFavorites`, {
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
            const res = await axios.delete(`${baseUrl}/stocks/removeFavoriteStock`, {
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


    useEffect(() => {
        favStockss()
    }, [])

    console.log(favStocks)


    return (
        <>
            Chart
            Chart

            <div className='charts px-10 pb-5 w-full h-[80vh] border-b flex  gap-7 justify-center items-top '>

                <div className='FavStocks p-2 basis-[30%] overflow-y-scroll  hide-scrollbar  border border-[#303030] '>
                    <div className='flex justify-center font-bold text-sm'>
                    Favorite Stocks
                    </div>

                    <div>
                        {
                            favStocks.map((stock, index) => (
                                <div key={index} className='stock-item px-5 w-full  '>
                                    <div className='flex justify-between p-2 border-b border-[#303030]'>

                                        <div>{stock.symbol}</div>


                                        <div onClick={() => removeFavoriteStock(stock.symbol)} className='border border-[#303030] p-1 px-3 rounded-xl text-red-500'>
                                            Rmove
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>

                </div>

                <div className='border p-2 basis-[70%] border-[#303030] '>
                    <StockDetails />
                </div>
            </div>
        </>
    )
}

export default Chart
