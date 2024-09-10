import express from 'express'
import cors from 'cors'
import cookiesParser from 'cookie-parser'

const app = express()

// console.log(process.env.CORS_ORIGIN)
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.urlencoded({ extended: true ,limit: "20kb" }))

app.use(express.json({ limit: "20kb" }))
// app.use(express.json())

app.use(cookiesParser())



//Routes 
import userRoutes from './routes/user.routes.js' 
import stocksRoutes from './routes/favStocks.routes.js' 
 

app.use('/api/user', userRoutes)
app.use('/api/stocks', stocksRoutes)



export { app }