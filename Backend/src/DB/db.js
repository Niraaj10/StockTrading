import mongoose from 'mongoose';

const DB_NAME = "STOCK-API"

const connectDB = async () => {
    try {
        const dbConnection = await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`);

        console.log(`DB is connected to ${dbConnection.connection.host}`)
        // console.log(dbConnection)
    } catch (error) {
        console.log('DB connection error', error)
        process.exit(1)
    }
}

export default connectDB;