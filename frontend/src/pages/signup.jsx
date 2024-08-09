import React, { useState,useEffect  } from 'react'
import { useNavigate } from 'react-router-dom';

function signup() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [errors, setErrors] = useState({
    userName: "", password: '', email: '', role: ''
  })
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Check if user is already logged in
    const token = localStorage.getItem('token');
    if (token) {
        // Redirect based on user role
        const role = localStorage.getItem('role');
        if (role === 'author') {
            navigate('/author');
        } else {
            navigate('/');
        }
    }
}, [navigate]);

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    console.log(userName, password, email, role);
    let newError = {};
    if (!email) newError.email = " please enter your email"
    if (!password) newError.password = " please enter Password"
    if (!userName) newError.userName = " please enter Username"
    if (!role) newError.role = " please enter role"
    if (Object.keys(newError).length > 0) {
      setErrors(newError);
      setErrors(prevState => ({ ...prevState, general: 'All fields are necessary' }));
      return;
    }

    try {
      const res = await fetch("https://book-store-server-ebon.vercel.app/api/signup", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userName,
          email,
          password,
          role
        })
      });
      if (res.ok) {
        console.log("User Registered successfully");
        setMessage("User Registered successfully");
        setErrors('');
        setPassword('')
        setUserName('');
        setRole('')
        setEmail('');

        setTimeout(() => {
          setMessage('');
          navigate('/login')
        }, 2000)
      }
      const data = await res.json();
      console.log(data.message);
      setMessage(data.message)
    } catch (error) {
      console.log(error.message);
      setMessage("User Registration Failed")
    }
  }
  return (
    <>
      <main className='min-h-screen'>
        <div className='lg:flex border shadow divide-x-2 lg:mx-56 lg:mt-16 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500' >
          <div className='basis-1/2 lg:p-24 flex items-center p-5'>
            <img src="/sign_in_re_o58h.svg" alt=" login-logo" className='lg:h-[300px]' />
          </div>
          <form onSubmit={handleOnSubmit} className='bg-white basis-1/2 lg:py-20 p-5 flex flex-col space-y-4 justify-center  items-center lg:px-10'>
            <div className='text-3xl font-semibold text-start lg:w-[70%]'>Create your Account</div>
            {/* user name */}
            <div className='flex flex-col lg:w-[70%] w-[100%] font-semibold text-sm'>
              <label htmlFor="First-name">Enter Username</label>
              <input type="text" id="First-name"
                className={` mt-1 ${errors.userName ? "border-red-500" : ''}`}
                placeholder='John Doe'
                value={userName} onChange={(e) => setUserName(e.target.value)} />
              <span className='text-sm text-red-600 font-normal'>{errors.userName}</span>
            </div>
            {/* user email */}
            <div className='flex flex-col lg:w-[70%] w-[100%] font-semibold text-sm'>
              <label htmlFor="email">Enter Email</label>
              <input type="email" id="email"
                className={` mt-1 ${errors.email ? "border-red-500" : ''}`}
                placeholder='email@gmail.com'
                value={email} onChange={(e) => setEmail(e.target.value)} />
              <span className='text-sm text-red-600 font-normal'>{errors.email}</span>
            </div>
            {/* user password */}
            <div className='flex flex-col lg:w-[70%] w-[100%] font-semibold text-sm'>
              <label htmlFor="Password">Enter Password</label>
              <input type="password" id="Password"
                className={` mt-1 ${errors.password ? "border-red-500" : ''}`}
                placeholder='Password@123'
                value={password} onChange={(e) => setPassword(e.target.value)} />
              <span className='text-sm text-red-500 font-normal'>{errors.password}</span>
            </div>
            {/* user role */}
            <div className='flex items-center space-x-5'>
              <h1>Register As :</h1>
              <label htmlFor="reader">
                <input type="radio" name="role" value='reader'
                  onChange={(e) => setRole(e.target.value)} />
                Reader
              </label>
              <label htmlFor="author">
                <input type="radio" name='role' value='author'
                  onChange={(e) => setRole(e.target.value)}
                />
                Author
              </label> <br />
              <span className='text-sm text-red-600 '>{errors.role}</span>
            </div>
            <button type="submit" className='bg-blue-700 text-white px-10 py-1.5 lg:w-[70%] w-[100%]'>Login</button>
            <div>
              {errors && <h1 className='text-sm text-red-600 bg-red-50 p-1 '>{errors.general}</h1>}
            </div>
            <div>
              {message && <h1 className='text-sm text--500 bg-green-50 p-1 '>{message}</h1>}
            </div>
          </form>
        </div>
      </main>
    </>
  )
}

export default signup
