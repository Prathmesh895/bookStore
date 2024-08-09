import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function resetPassword() {
    const navigate = useNavigate();
    const { token } = useParams();
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`https://book-store-server-ebon.vercel.app/passWord/reset-password/${token}`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ password })
            });

            const data = await res.json();

            if (res.ok) {
                console.log("User reset password successfully");
                setMessage(data.message);
                navigate('/login'); // Navigate to login page after success
            } else {
                setError(data.message); // Set and display the error message
            }
        } catch (error) {
            setError("An error occurred. Please try again later.");
            console.log(error.message);
        }
    };

    return (
        <>
            <div className='flex flex-col lg:flex-row border shadow divide-x-2 lg:mx-56 lg:mt-16 bg-gradient-to-r from-pink-300 to-orange-300'>
                <div className='basis-1/2 lg:p-24 p-10'>
                    <img src="/login_pdn4.svg" alt="login-logo" />
                </div>
                {/* Reset Password Form */}
                <form onSubmit={handleOnSubmit} className='bg-white lg:basis-1/2 lg:py-28 flex flex-col space-y-9 justify-center items-center lg:px-10 p-5'>
                    <div className='text-3xl font-semibold text-start lg:w-[70%] w-[100%]'>Reset Password</div>
                    {/* Input for new password */}
                    <div className='flex flex-col lg:w-[70%] w-[100%]'>
                        <label htmlFor="password">Enter New Password</label>
                        <input
                            type="password"
                            id="password"
                            placeholder='Enter new password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className='bg-blue-700 text-white px-10 lg:w-[70%] w-[100%]'>Submit</button>
                    {message && <p className='text-green-500'>{message}</p>}
                    {error && <p className='text-red-500'>{error}</p>}
                </form>
            </div>
        </>
    );
}

export default resetPassword;
