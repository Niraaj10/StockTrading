import axios from "axios";
import { ApiError } from "./utils/ApiError.js";


const FINNHUB_API_KEYY = process.env.ACCESS_TOKEN_SECRET
console.log(process.env.ACCESS_TOKEN_SECRET)
const stockSymbols = ['AAPL', 'TSLA', 'BINANCE:BTCUSDT', 'BINANCE:ETHUSDT', 'BINANCE:BNBUSDT',
    'BINANCE:XRPUSDT', 'BINANCE:ADAUSDT', ];
// const stockSymbols = ['AAPL', 'TSLA', 'BINANCE:BTCUSDT', 'BINANCE:BTCUSDT', 'BINANCE:ETHUSDT', 'BINANCE:BNBUSDT',
//     'BINANCE:XRPUSDT', 'BINANCE:ADAUSDT', 'BINANCE:DOGEUSDT', 'BINANCE:DOTUSDT', 'BINANCE:SOLUSDT', 'BINANCE:AVAXUSDT', 'BINANCE:LTCUSDT', 'BINANCE:LINKUSDT', 'BINANCE:UNIUSDT', 'BINANCE:ATOMUSDT', 'BINANCE:FTTUSDT', 'BINANCE:NEOUSDT', 'BINANCE:VETUSDT', 'BINANCE:TRXUSDT', 'BINANCE:XLMUSDT', 'BINANCE:MATICUSDT'];


const stockSocket = async (io) => {

    const stockUpdates = async () => {
        try {
            const stocksData = stockSymbols.map(async (stock) => {
                // const res = await axios.get(`https://finnhub.io/api/v1/quote?symbol=${stock}&token=crg8up1r01qptaplmfk0crg8up1r01qptaplmfkg`)
                const res = await axios.get(`https://finnhub.io/api/v1/quote?symbol=${stock}&token=crg8up1r01qptaplmfk0crg8up1r01qptaplmfkg`)

                console.log(res.data)
                return { symbol: stock, data: res.data }
            })

            const stockUpdatesResult = await Promise.all(stocksData)
            io.emit('stockUpdates', stockUpdatesResult)
        } catch (error) {
            throw new ApiError(404, 'Error fetching stock data:', error)
        }
    }

    // setInterval(stockUpdates, 30000);

    io.on('connection', (socket) => {
        console.log('User connected')

        socket.on('disconnect', () => {
            console.log('User disconnected')
        })
    })
}


export { stockSocket }




