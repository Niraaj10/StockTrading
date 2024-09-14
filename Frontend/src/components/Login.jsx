import React, { useContext, useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios'
import { UserContext } from '../UserContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
    const { login } = useContext(UserContext)
    const [islogin, setIslogin] = useState(true);
    const navigate = useNavigate();  
    const [loginUser, setLoginUser] = useState({
        username: '',
        password: ''
    });

    const [signupUser, setSignupUser] = useState({
        username: '',
        password: '',
        fullname: '',
        email: ''
    });


    const onChangeLogin = (e) => {
        const { name, value } = e.target;
        setLoginUser({ ...loginUser, [name]: value });
    };

    const onChangeSign = (e) => {
        const { name, value } = e.target;
        setSignupUser({ ...signupUser, [name]: value });
    };


    const handleLogin = async (e) => {
        e.preventDefault();
        // console.log(loginUser)
        try {
            await login(loginUser.username, loginUser.password);
            navigate('/')
        } catch (error) {
            console.log(error.message);
            alert("Please enter correct username and password");
        }
    };

const baseUrl = 'http://localhost:5001/api'
 const ServerUrl = 'https://stocktrading-1.onrender.com/api'

    const handleSign = async (e) => {
        e.preventDefault();
        // console.log(signupUser);
        // console.log(profile);        

        try {
            const res = await axios.post(`${ServerUrl}/user/register`, {
                username: signupUser.username,
                password: signupUser.password,
                fullname: signupUser.fullname,
                email: signupUser.email,
            });

            toast('Account Created Successfully, Please login', {
                position: "bottom-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                progressStyle: { backgroundColor: 'red', }
            });

            // console.log(res.data);
            setIslogin(!islogin)

            // navigate('/')
        } catch (error) {
            console.log(error.message);
            alert("Please enter valid uesr data");
        }
    };



    return (
        <div className='Login'>
            {/* Loginn */}

            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                />


            <div className='Login w-full h-full  my-auto mx-auto'>

                <div className='mx-auto w-[30vw] h-[60vh] flex flex-col mt-20 justify-center items-center px-7 '>

                    {/* Login Form */}
                    <form onSubmit={handleLogin} className={`LoginForm flex flex-col w-full items-center ${islogin ? "block" : "hidden"}`}>
                        <div className='text-xl font-bold mb-7'>Login</div>

                        <input
                            type="text"
                            placeholder='username'
                            name='username'
                            className='p-3 w-full px-6 rounded-xl bg-gray-500 bg-opacity-5 focus:outline-green-500 focus:border-none outline-none border border-[rgb(48,48,48)]'
                            onChange={onChangeLogin}
                            required
                        />

                        <input
                            type="password"
                            placeholder='Password'
                            name='password'
                            className='p-3 px-6 w-full mt-5 rounded-xl bg-gray-500 bg-opacity-5 focus:outline-green-500 focus:border-none outline-none border border-[#303030]'
                            onChange={onChangeLogin}
                            required
                        />

                        <button type='submit' className='bg-green-600  text-white p-3 w-full rounded-xl mt-7'>Login</button>
                        <div className='mt-2' onClick={() => setIslogin(!islogin)}>
                            Don't have an account??
                            <span className='text-green-600'>Signup</span>
                        </div>
                    </form>

                    {/* Signup Form */}
                    <form onSubmit={handleSign} className={`SignupForm flex flex-col w-full items-center ${islogin ? "hidden" : ""} `}>
                        <div className='text-xl font-bold mb-7'>Signup</div>

                        <input
                            type="text"
                            placeholder='Username'
                            name='username'
                            className='p-3 px-6 w-full rounded-xl bg-gray-500 bg-opacity-5 focus:outline-green-500 focus:border-none outline-none border border-[#303030] mb-3'
                            onChange={onChangeSign}
                            required
                        />

                        <input
                            type="text"
                            placeholder='Full Name'
                            name='fullname'
                            className='p-3 px-6 w-full rounded-xl bg-gray-500 bg-opacity-5 focus:outline-green-500 focus:border-none outline-none border border-[#303030] mb-3'
                            onChange={onChangeSign}
                            required
                        />

                        <input
                            type="text"
                            placeholder='Email'
                            name='email'
                            className='p-3 px-6 w-full rounded-xl bg-gray-500 bg-opacity-5 focus:outline-green-500 focus:border-none outline-none border border-[#303030] mb-3'
                            onChange={onChangeSign}
                            required
                        />

                        <input
                            type="password"
                            placeholder='Password'
                            name='password'
                            className='p-3 px-6 w-full mb-3 rounded-xl bg-gray-500 bg-opacity-5 focus:outline-green-500 focus:border-none outline-none border border-[#303030]'
                            onChange={onChangeSign}
                            required
                        />



                        <button type='submit' className='bg-green-600 mt-4 text-white p-3 w-full rounded-xl'>
                            Create Account
                        </button>
                        <div className='mt-2' onClick={() => setIslogin(!islogin)}>
                            Already have an account??
                            <span className='text-green-600'>Login</span>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    )
}

export default Login
