import express from 'express'
import cors from 'cors'
import cookiesParser from 'cookie-parser'

const app = express()

// console.log(process.env.CORS_ORIGIN)
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))


app.use(express.json({ limit: "20kb" }))
// app.use(express.json())

app.use(cookiesParser())

export { app }