import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from '../utils/ApiError.js';
import { User } from '../models/user.models.js';
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken"
import mongoose from 'mongoose'

const generateAccessandRefreshToken = async (userId) => {
    try {
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        // console.log("refreshToken :", refreshToken )
        // console.log("accessToken :", accessToken )

        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })
        
        return { accessToken, refreshToken }

    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating access and refresh token")
    }
}



const registerUser = asyncHandler( async (req, res) => {
    // res.status(200).json({
    //     message: "OKKK"
    // })

    const { username, email, password, fullname } = req.body
    // console.log("username: ", username)
    // console.log(req.files)

    if (
        [username, email, password, fullname].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required")
    }

    const existedUser = await User.findOne({
        $or: [{ username }, { email }],
    })

    if (existedUser) {
        throw new ApiError(409, "Username or email already exists")
    }

    const user = await User.create({
        fullname,
        username: username.toLowerCase(),
        email,
        password,
    })

    const createdUser = await User.findById(user._id).select(
        // to remove this field
        "-password -refreshToken"
    )

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user")
    }

    // return res.status(201).json(
    //     new ApiResponse(200, createdUser, "User registered successfully")
    // )
    return res.status(201).json({
        success: true,
        status: 200,
        data: createdUser,
        message: "User registered successfully"
    });

})


const loginUser = asyncHandler( async (req, res) => {
    const { email, password, username } = req.body

    if ( !(email || username) ) {
        throw new ApiError(400, "Username or email required")
    }

    const user = await User.findOne({
        $or: [{username}, {email}]
    })

    if(!user) {
        throw new ApiError(404, "User not found")
    }
    
    const isPasswordCorrectt = await user.isPasswordCorrect(password)
    
    if(!isPasswordCorrectt) {
        throw new ApiError(401, "Invalid user credentials")
    }

    const { accessToken, refreshToken } = await generateAccessandRefreshToken(user._id)

    const loggedUser = await User.findById(user._id).select("-password -refreshToken")

    // cookies security
    const options = {
        httpOnly: true,
        secure: true
    }

    return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
        new ApiResponse(
            200, 
            {
                user: loggedUser,
                accessToken,
                refreshToken
            },
            "User logged in successfully"
        )
    )
    
})




const logoutUser = asyncHandler( async (req, res) => {
    await User.findByIdAndUpdate(
        req.user._id,
        {
            // $set: {
            //      refreshToken: undefined,
            // }
            $unset: {
                 refreshToken: 1,
            }
        },
        {
            new: true
        }
    )

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(
        new ApiResponse(
            200,
            {},
            "User logged out successfully"
        )
    )
})


export { 
    registerUser,
    loginUser,
    logoutUser
}