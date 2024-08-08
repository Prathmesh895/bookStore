// import React from 'react'

// function login() {
//   return (
//     <>
//     <main className='bg-[#ffd700] min-h-screen'>
//       <div className='flex border shadow divide-x-2 mx-56 lg:mt-16 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500' >
//         <div className='basis-1/2 p-24 flex items-center '>
//           <img src="/sign_in_re_o58h.svg" alt=" login-logo" className='h-[300px]'/>
//         </div>
//         <form className='bg-white basis-1/2 py-20 flex flex-col space-y-4 justify-center  items-center px-10'>
//           <div className='text-3xl font-semibold text-start w-[70%]'>Create your Account</div>
//           <div className='flex flex-col w-[70%]'>
//             <label htmlFor="First-name">Enter First name</label>
//             <input type="text" id="First-name"
//               className='mt-1'
//               placeholder='John Doe' />
//           </div>
//           <div className='flex flex-col w-[70%]'>
//             <label htmlFor="Last-name">Enter Last name</label>
//             <input type="text" id="Last-name"
//               className='mt-1'
//               placeholder='enter Last name' />
//           </div>
//           <div className='flex flex-col w-[70%]'>
//             <label htmlFor="email">Enter Email</label>
//             <input type="email" id="email"
//               className='mt-1'
//               placeholder='enter email' />
//           </div>
//           <div className='flex flex-col w-[70%]'>
//             <label htmlFor="Password">Enter Password</label>
//             <input type="password" id="Password"
//               className='mt-1'
//               placeholder='enter password' />
//           </div>
//           <button type="submit" className='bg-blue-700 text-white px-10 py-1.5 w-[70%]'>Login</button>
//         </form>
//       </div>
//       </main>
//     </>
//   )
// }

// export default login


import React, { useState } from 'react';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const result = await response.text();
      alert(result);
    } catch (error) {
      console.log('Error:', error);
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
      <button type="submit">Register</button>
    </form>
  );
}

export default Register;
