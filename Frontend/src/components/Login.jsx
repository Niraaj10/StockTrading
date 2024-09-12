import React, { useState } from 'react'
import { Link } from "react-router-dom";

const Login = () => {
    const [islogin, setIslogin] = useState(true); 
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


    return (
        <div className='Login'>
            Loginn
            
        </div>
    )
}

export default Login
