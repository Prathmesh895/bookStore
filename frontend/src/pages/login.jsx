import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function LoginPage() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState({
        email: '',
        password: '',
        general: '',
        isVerified: ''
    });

    useEffect(() => {
        // Check if user is already logged in
        const token = localStorage.getItem('token');
        if (token) {
            // Redirect based on user role
            const role = localStorage.getItem('role');
            if (role === 'author') {
                navigate('/author');
                window.location.reload();
            } else {
                navigate('/');
                window.location.reload();
            }
        }
    }, [navigate]);

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        let newError = {};
        if (!email) newError.email = "Please enter your email";
        if (!password) newError.password = "Please enter your password";
        if (Object.keys(newError).length > 0) {
            setError(newError);
            setError(prevState => ({ ...prevState, general: 'All fields are necessary' }));
            return;
        }

        try {
            const res = await fetch(`https://book-store-server-ebon.vercel.app/api/login`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password }),
                credentials: 'include'
            });

            const data = await res.json();
            if (res.ok) {
                // Save the token and user info to local storage
                localStorage.setItem('token', data.token);
                localStorage.setItem('userName', data.user.userName);
                localStorage.setItem('role', data.user.role);
                localStorage.setItem('email', data.user.email);

                // Redirect based on role
                if (data.user.role === 'author') {
                    navigate('/author');
                } else {
                    navigate('/');
                }

                setMessage('User login successfully');
            } else {
                setMessage(data.message);
            }
        } catch (error) {
            setMessage('Login failed');
        }
    }

    return (
        <>
            <div className='flex flex-col lg:flex-row border shadow divide-x-2 lg:mx-56 lg:mt-16 bg-gradient-to-r from-pink-300 to-orange-300'>
                <div className='basis-1/2 lg:p-24 p-10'>
                    <img src="/login_pdn4.svg" alt="login-logo" />
                </div>
                {/* Login form */}
                <form onSubmit={handleOnSubmit} className='bg-white lg:basis-1/2 lg:py-28 flex flex-col  lg:justify-center lg:items-center lg:px-10 p-5'>
                    <div className='text-3xl font-semibold text-start lg:w-[70%] w-[100%]'>Welcome Back!</div>
                    {/* Input for email */}
                    <div className='flex flex-col lg:w-[70%] w-[100%] my-5'>
                        <label htmlFor="email">Enter Email</label>
                        <input type="email" id="email"
                            className={`${error.email ? "border-red-500" : ''}`}
                            placeholder='email@gmail.com'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)} />
                        <span className='text-sm text-red-600'>{error.email}</span>
                    </div>

                    {/* Input for password */}
                    <div className='flex flex-col lg:w-[70%] w-[100%] my-5'>
                        <label htmlFor="password">Enter Password</label>
                        <input type="password" id="password"
                            className={`${error.password ? "border-red-500" : ''}`}
                            placeholder='Enter password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} />
                        <span className='text-sm text-red-600'>{error.password}</span>
                        <div className='text-blue-500 text-sm mt-1 text-end'>
                            <Link to='/forgotpassword'>Forgot Password</Link>
                        </div>
                    </div>
                    <button type="submit" className='bg-blue-700 text-white px-10 lg:w-[70%] w-[100%]'>Login</button>
                    <div className='my-5 text-start'>Don't have an account?
                        <Link to='/signup' className='text-blue-500 mx-1 cursor-pointer'>Sign up</Link>
                    </div>
                    <div>
                        {message &&
                            <div className={`${message === 'User Is not Verified' ? 'text-red-500' : 'text-green-700'} text-md bg-white font-semibold absolute top-24 right-10 rounded w-56 h-16 border shadow flex items-center justify-center space-x-2`}>
                                {message}
                            </div>}
                    </div>
                </form>
            </div>
        </>
    );
}

export default LoginPage;
