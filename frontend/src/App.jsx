import './App.css'
import Navbar from './components/navbar'
import { Routes, Route } from 'react-router-dom'
import Homepage from './pages/homepage'
import Login from './pages/login'
import Signup from './pages/signup'
import Footer from './components/footer'
import AutherLayout from './pages/auther-layout'
import Allbooks from './components/authers-sidebar/all-books'
import AddBook from './components/authers-sidebar/add-book'
import Publishedbooks from './components/authers-sidebar/publishedbooks'
import DraftBook from './components/authers-sidebar/draft-book'
import VerifyEmail from './components/verifyemail'
import Logout from './components/logout'
import Updatebook from './components/authers-sidebar/updatebook'
import BookData from './components/homeData';


function App() {


  return (
    <>
      <div className='flex flex-col'>
        <div className='mb-20'><Navbar /></div>
        <Routes>
          <Route path='/' element={<Homepage />} />
          <Route path='/books' element={<BookData />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          {/* routing for auther page */}
          <Route path='/author' element={<AutherLayout />} >
            <Route path='all-books' element={<Allbooks />} />
            <Route path='add-book' element={<AddBook />} />
            <Route path='published-books' element={<Publishedbooks />} />
            <Route path='draft-books' element={<DraftBook/>} />
            <Route path='settings' element={<Allbooks />} />
            <Route path='updatebook/:id' element={<Updatebook/>} />
          </Route>
          <Route path="/verify/:token" component={<VerifyEmail />} />

        </Routes>
        {/* <Logout/> */}
        <div className='mt-10'><Footer /></div>
      </div>


    </>
  )
}

export default App
