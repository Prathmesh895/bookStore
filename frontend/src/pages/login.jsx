// import React from 'react'

// function login() {
//   return (
//     <>
//       <div className='flex flex-col lg:flex-row border shadow divide-x-2 lg:mx-56 lg:mt-16 bg-gradient-to-r from-pink-300 to-orange-300' >
//         <div className='basis-1/2 lg:p-24 p-10'>
//           <img src="/login_pdn4.svg" alt=" login-logo" />
//         </div>
//         <form className='bg-white lg:basis-1/2 lg:py-28 flex flex-col space-y-9 justify-center  items-center lg:px-10 p-5'>
//           <div className='text-3xl font-semibold text-start lg:w-[70%] w-[100%]'>Welcome Back!</div>
//           <div className='flex flex-col lg:w-[70%] w-[100%]'>
//             <label htmlFor="email">Enter Email</label>
//             <input type="email" id="email"
//               className=''
//               placeholder='email@gmail.com' />
//           </div>
//           <div className='flex flex-col lg:w-[70%] w-[100%]'>
//             <label htmlFor="password">Enter Password</label>
//             <input type="password" id="password"
//               className=''
//               placeholder='Enter password' />
//           </div>
//           <button type="submit" className='bg-blue-700 text-white px-10  lg:w-[70%] w-[100%]'>Login</button>
//         </form>


//       </div>
//     </>
//   )
// }

// export default login


import React, { useState } from 'react';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const result = await response.json();
      localStorage.setItem('token', result.token); // Store JWT token
      alert('Login successful');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Email:
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </label>
      <label>Password:
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      </label>
      <button type="submit">Login</button>
    </form>
  );
}

export default Login;
