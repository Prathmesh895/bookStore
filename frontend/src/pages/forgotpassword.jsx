import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [statusMessage, setStatusMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    setStatusMessage('');
    setIsLoading(true);

    if (!email) {
      setStatusMessage('Email is required.');
      setIsLoading(false);
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/passWord/forgotpassword", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
      });

      if (res.ok) {
        setStatusMessage('Password reset link sent to your email.');
        setTimeout(() => {
          navigate('/login')
        }, 1000);

      } else {
        setStatusMessage('Failed to send password reset link.');
      }
    } catch (error) {
      setStatusMessage('An error occurred: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='flex flex-col lg:flex-row border shadow divide-x-2 lg:mx-56 lg:mt-16 bg-gradient-to-r from-pink-300 to-orange-300'>
      <div className='basis-1/2 lg:p-24 p-10'>
        <img src="/login_pdn4.svg" alt="Forgot Password" />
      </div>
      <form onSubmit={handleOnSubmit} className='bg-white lg:basis-1/2 lg:py-28 flex flex-col space-y-9 justify-center items-center lg:px-10 p-5'>
        <div className='text-3xl font-semibold text-start lg:w-[70%] w-[100%]'>Forgot Password</div>
        <div className='flex flex-col lg:w-[70%] w-[100%]'>
          <label htmlFor="email">Enter Email</label>
          <input
            type="email"
            id="email"
            className='border p-2 rounded'
            placeholder='email@gmail.com'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        {statusMessage && <p className={`text-${statusMessage.includes('Failed') ? 'red' : 'green'}-600`}>{statusMessage}</p>}
        <button
          type="submit"
          className={`bg-blue-700 text-white px-10 lg:w-[70%] w-[100%] py-2 rounded ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={isLoading}
        >
          {isLoading ? 'Sending email...' : 'Submit'}
        </button>
      </form>
    </div>
  );
}

export default ForgotPassword;
