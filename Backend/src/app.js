import express from 'express'
import cors from 'cors'
import cookiesParser from 'cookie-parser'
import http from 'http'
import { Server } from 'socket.io'
import { stockSocket } from './stockSocket.js'
import helmet from 'helmet';

import path from 'path'
import { fileURLToPath } from 'url';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);




const app = express()

app.use(express.static(path.resolve('../public')))

app.get('/', (req, res) => {
  return res.sendFile(path.resolve(__dirname, '../public/test.html'))
})


// console.log(process.env.CORS_ORIGIN)
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

// app.use(helmet({
//     contentSecurityPolicy: {
//       directives: {
//         defaultSrc: ["'self'"],
//         connectSrc: ["'self'", "ws://localhost:5001"], // Allow WebSocket connections
//       }
//     }
//   }));



app.use(express.urlencoded({ extended: true ,limit: "20kb" }))

app.use(express.json({ limit: "20kb" }))
// app.use(express.json())

app.use(cookiesParser())


//Routes 
import userRoutes from './routes/user.routes.js' 
import stocksRoutes from './routes/favStocks.routes.js' 



app.use('/api/user', userRoutes)
app.use('/api/stocks', stocksRoutes)




//web socket
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
      origin: '*',  // Allow all origins (for testing purposes)
      methods: ['GET', 'POST'],
    },
  });

// const io = new Server(server)

io.on('connection', (socket) => {
  console.log("User is connected! id: ", socket.id)
})

//Initialize SocketIo
stockSocket(io)


export { app, server  }


