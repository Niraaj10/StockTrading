import axios from 'axios'
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from "../utils/ApiResponse.js";
import { FavoriteStock } from '../models/favoriteStock.models.js';



const getFavStocks = asyncHandler(async (req, res) => {
    try {
        const favStocks = await FavoriteStock.find({ userId: req.user._id })

        return res.status(201).json(
            new ApiResponse(200, { favStocks }, "FavoriteStock fetched Successfully")
        )
    } catch (error) {
        throw new ApiError(404, error.message)
    }
})



const addToFavoriteStock = asyncHandler(async (req, res) => {
    const { stock } = req.body

    const existingFav = await FavoriteStock.findOne({ userId: req.user._id, symbol: stock })

    if (existingFav) throw new ApiError(404, "Stock already exists in favorite list")

    const newFav = await FavoriteStock.create({
        userId: req.user._id,
        symbol: stock
    })

    if (!newFav) throw new ApiError(500, "Something went wrong while adding stock to favorite")

    return res.status(201).json(
        new ApiResponse(200, { newFav }, "Stock added to favorite successfully")
    )
})



const getStock = asyncHandler(async (req, res) => {
    const { stock } = req.params

    try {
        const response = await axios.get(`https://finnhub.io/api/v1/quote?symbol=${stock}&token=${process.env.FINNHUB_API_KEY}`)

        console.log(response)
        const stockInfo = response.data

        return res.status(201).json(
            new ApiResponse(200, { stockInfo }, "FavoriteStock fetched Successfully")
        )
    } catch (error) {
        throw new ApiError(404, error.message)
    }
})




const removeFromFavoriteStock = asyncHandler(async (req, res) => {
    const { stock } = req.body;

    const removedFav = await FavoriteStock.findOneAndDelete({ userId: req.user._id, symbol: stock });

    if (!removedFav) throw new ApiError(404, "Stock not found in favorite list");

    return res.status(200).json(
        new ApiResponse(200, { stock }, "Stock removed from favorite successfully")
    );
});




export {
    getFavStocks,
    getStock,
    addToFavoriteStock,
    removeFromFavoriteStock
}