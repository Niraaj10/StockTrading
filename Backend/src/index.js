import { app, server  } from './app.js'
import connectDB from './DB/db.js'
import dotenv from 'dotenv'

const PORT = process.env.PORT || 5001

dotenv.config({
    path: './.env'
})

// app.get('/', function (req, res) {
//   res.send(`App srunnign on ${PORT}`)
// })


;( async () => {
    try {
        // await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`);
        await connectDB()
        
        app.on("errror", (error) => {
            console.log("ERRR: ", error);
            throw error
        })

        // app.listen(PORT, () => {
        //     console.log(`App is listening on port ${PORT}`);
        // })
        server.listen(PORT, () => {
            console.log(`Server is listening on port ${PORT}`);
        });

    } catch (error) {
        console.error("ERROR: ", error)
        throw err
    }
})()





