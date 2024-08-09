import './App.css';
import Navbar from './components/navbar';
import { Routes, Route } from 'react-router-dom';
import Homepage from './pages/homepage';
import Login from './pages/login';
import Signup from './pages/signup';
import Footer from './components/footer';
import AutherLayout from './pages/auther-layout';
import Allbooks from './components/authers-sidebar/all-books';
import AddBook from './components/authers-sidebar/add-book';
import Publishedbooks from './components/authers-sidebar/publishedbooks';
import DraftBook from './components/authers-sidebar/draft-book';
import Updatebook from './components/authers-sidebar/updatebook';
import BookData from './components/homeData';
import Forgotpassword from './pages/forgotpassword';
import Resetpass from './pages/resetpassword';
import PrivateRoute from './PrivateRoute';
import Verifyemail from './pages/verifyemail';
import BookDetails from './pages/bookDetails';

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
                    <Route path='/forgotpassword' element={<Forgotpassword />} />
                    <Route path='/reset-password/:token' element={<Resetpass />} />
                    <Route path='/verify-email/:token' element={<Verifyemail />} />
                    <Route path='/bookDetails/:id' element={<BookDetails/>} />
                    
                    {/* Protected Author Routes */}
                    <Route path='/author' element={
                        <PrivateRoute allowedRole="author">
                            <AutherLayout />
                        </PrivateRoute>
                    }>
                        <Route path='all-books' element={<Allbooks />} />
                        <Route path='add-book' element={<AddBook />} />
                        <Route path='published-books' element={<Publishedbooks />} />
                        <Route path='draft-books' element={<DraftBook />} />
                        <Route path='settings' element={<Allbooks />} />
                        <Route path='updatebook/:id' element={<Updatebook />} />
                    </Route>
                </Routes>
                <div className='mt-10'><Footer /></div>
            </div>
        </>
    );
}

export default App;
