import axios from 'axios';
import React, { useEffect, useState } from 'react'

const RealtimeStocks = () => {
  const [results, setResults] = useState([]);
  const [stockPrices, setStockPrices] = useState({});

  const stocksInfo = ['AAPL', 'TSLA', 'AMZN', 'GOOGL', 'MSFT', 'NFLX', 'META', 'NVDA']
  // const stocksInfo = ['AAPL', 'TSLA', 'AMZN', 'GOOGL', 'MSFT', 'NFLX', 'META', 'NVDA', 'BRK.B', 'JPM','WMT', 'DIS', 'BABA', 'AMD', 'INTC', 'PYPL', 'BA', 'KO', 'PEP',]

  const apiKey = import.meta.env.VITE_FINNHUB_API_KEY;
  console.log('API Key:', apiKey);

  const searchStocks = async (stock) => {
    try {
      const res = await axios.get(
        `https://finnhub.io/api/v1/stock/profile2?symbol=${stock}&token=${apiKey}`
      );
      // console.log(res)
      // setResults(res.data);
      return res.data;
    } catch (error) {
      console.error('Error fetching stock data:', error);
      return null;
    }
  };

  // searchStocks('AAPL')


  const resultStockPrice = async (stock) => {
    try {
      const res = await axios.get(`https://finnhub.io/api/v1/quote?symbol=${stock}&token=${apiKey}`)

      // console.log(stock, ":", res)
      // setStockPrice(res.data)
      return res.data;
    } catch (error) {
      console.error('Error fetching stock data:', error);
      return null;
    }
  }

  useEffect(() => {
    const fetchAllStocks = async () => {
      try {
        const fetchedResults = await Promise.all(
          stocksInfo.map(stock => searchStocks(stock))
        );
        setResults(fetchedResults.filter(stock => stock !== null));

        const prices = await Promise.all(
          stocksInfo.map(async (stock) => {
            const res = await resultStockPrice(stock);
            console.log(res)
            return { [stock]: res };
          })
        );

        const stockPricesObject = prices.reduce((acc, cur) => ({ ...acc, ...cur }), {});
        setStockPrices(stockPricesObject);

        // console.log(stockPrices)

      } catch (error) {
        console.error('Error fetching all stock data:', error);
      }
    };

    fetchAllStocks();
  }, []);

  // console.log(results)


  useEffect(() => {
    // console.log('Updated Stock Prices:', stockPrices);
  }, [stockPrices]);


  const formatMarketCap = (value) => {
    if (value >= 1e12) {
      return (value / 1e12).toFixed(2) + 'T';
    } else if (value >= 1e9) {
      return (value / 1e9).toFixed(2) + 'B';
    } else if (value >= 1e6) {
      return (value / 1e6).toFixed(2) + 'M';
    } else if (value >= 1e3) {
      return (value / 1e3).toFixed(2) + 'K';
    } else {
      return value.toFixed(2);
    }
  };






  return (
    <div className='mt-20'>
      {/* Real Time Stocks */}
      <div className='stocktable'>



        <div className='border border-[#303030] rounded-lg  text-white'>

          <table className="table-fixed border-collapse bg-gray-400 bg-opacity-5">
            <thead className=' '>
              <tr className=' '>
                <th className='w-[25vw] border-r border-[#303030] p-2'>Stock</th>
                <th className='border-r border-t border-[#303030] p-2'>currency</th>
                <th className=' border-[#303030] p-2'>Share</th>
                <th className='border-l border-[#303030] p-2'>MarketCap</th>
                <th className='border-l border-[#303030] p-2'>MarketCap</th>
              </tr>
            </thead>

            {

              results.map((result, index) =>
                <tbody>
                  <tr key={index}>
                    <td className='border-r border-t border-[#303030] p-2 px-7'>{result.name}</td>
                    <td className='border-r border-t border-[#303030] p-2 px-7'>{result.currency}</td>
                    <td className='border-l border-t border-[#303030] p-2 px-7'>{result.shareOutstanding}</td>
                    <td className='border-l border-t border-[#303030] p-2 px-7'>{formatMarketCap(result.marketCapitalization)}</td>
                    <td className='border-l border-t border-[#303030] p-2 px-7 text-green-500'>{stockPrices[result.ticker] ? stockPrices[result.ticker].c : 'Loading...'}</td>
                  </tr>


                </tbody>

              )
            }
          </table>


        </div>
      </div>
    </div>
  )
}

export default RealtimeStocks
