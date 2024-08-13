import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import BookData from '../components/bookStoreData'

function homepage() {
  const navigate = useNavigate();
  const [bookData, setBookData] = useState([]);

  useEffect(() => {
    handleOnFetch();
  }, []);

  const handleOnFetch = async () => {
    try { 
      const res = await fetch('https://book-store-server-ebon.vercel.app/books');
      if (res.ok) {
        console.log("Data fetched");
        const data = await res.json();
        setBookData(data);
      }
    } catch (error) {

      console.error('Error fetching books:', error.message);
    }
  };
   //redirect to book details page
   const handleOnRedirect = (id) => {
    navigate(`/bookDetails/${id}`)
  }
  return (
    <>
      <section className='w-full'>
        <div className='lg:relative w-full'>
          {/* background image  */}
          <img src="/homebg.jpg" alt="" className=' h-screen  absolute -z-10' />
          {/* content for homeage */}
          <div className='lg:flex justify-between lg:mx-20 lg:text-left text-center'>
            {/* left side div for title and search bar */}
            <div className='lg:mt-40 p-5'>
              <p className='lg:text-5xl text-3xl font-semibold font-serif'>Best Place to Find Your</p>
              <p className='lg:text-5xl text-3xl font-semibold font-serif text-[#ff8000] mt-5'>Favorite Books</p>
              <p className='mt-10 font-sans'>
                Discover millions of book title with the best price offered here. Available <br /> for worldwide shipping and payment.
              </p>
              <p className="mt-10"><i> "A book is a garden, an orchard, a storehouse,
                a party, a company by the way, a counselor, a multitude of counselors."
              </i></p>
            </div>
            {/* right side div for img */}
            <div className='lg:mt-20 p-5'>
              <img src="/undraw_book_lover_re_rwjy.svg" alt="home-cover-logo" />
            </div>
          </div>
        </div>
        {/* show books  */}
        <div className='bg-white ;lg:p-10 lg:mt-36 mt-10 mb-10'>
          <h1 className='text-center text-3xl font-serif p-5'>Some trending Books</h1>
          <div className='grid lg:grid-cols-4 gap-5  lg:mx-44'>
          {bookData
              .filter(book => book.addas === 'publish')
              .map((book, index) => (
                <ul key={index} onClick={()=>handleOnRedirect(book._id)} className='cursor-pointer border lg:w-56 w-full p-5'>
                  <li>
                    <img src={`https://book-store-server-ebon.vercel.app/files/${book.file}`} alt={book.title} className='border lg:w-44 w-full lg:h-56' />
                  </li>
                  <li className='font-semibold text-gray-700 text-md truncate '>{book.title}</li>
                  <li className='font-semibold text-gray-400 text-sm '>{book.auther}</li>
                  <li className='font-semibold text-gray-500 text-md '>Price <span className='text-orange-600'>₹{book.price}</span></li>
                </ul>
              ))}
          </div>
        </div>
        <BookData/>
      </section>
    
    </>
  )
}

export default homepage