import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FaRegStar, FaStar } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'

const genres = [
  "Action & Adventure", "Activity Books", "Animals", "Anthologies", "Arts & Literature", "Cars & Trucks", "Classics",
  "Contemporary", "Cultural", "European", "Foreign Language", "Genre Fiction", "Historical", "Uncategorized"
];

function Homepage() {
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();
  const [bookData, setBookData] = useState([]);
  const [genre, setGenre] = useState(searchParams.get('genre') || '');
  const [price, setPrice] = useState(searchParams.get('price') || '');
  const [auther, setAuther] = useState(searchParams.get('auther') || '');
  const [ratings, setRatings] = useState(searchParams.get('ratings') || '');
  const [date, setDate] = useState(searchParams.get('date') || '');
  const [searchBook, setSearchBook] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [booksPerPage, setBooksPerPage] = useState(10);

  useEffect(() => {
    const params = { genre, price, auther, ratings, date };
    const newSearchParams = new URLSearchParams();
    Object.keys(params).forEach(key => {
      if (params[key]) {
        newSearchParams.set(key, params[key]);
      }
    });
    setSearchParams(newSearchParams);
  }, [genre, price, auther, ratings, date]);

  useEffect(() => {
    handleOnFetch();
  }, []);

  const handleOnFetch = async () => {
    try {
      const res = await fetch(`https://book-store-server-ebon.vercel.app/books`);
      if (res.ok) {
        const data = await res.json();
        setBookData(data);
      }
    } catch (error) {
      console.error('Error fetching books:', error.message);
    }
  };

  const handleInputChange = (setter) => (event) => {
    setter(event.target.value);
  };

  const handleSelectChange = (setter, value) => {
    setGenre('');
    setPrice('');
    setAuther('');
    setRatings('');
    setDate('');
    setter(value);
  };

  const filterBooks = (books) => {
    let filteredBooks = [...books];
    if (genre) {
      filteredBooks = filteredBooks.filter(book => book.genre.toLowerCase().includes(genre.toLowerCase()));
    }
    if (auther) {
      filteredBooks = filteredBooks.filter(book => book.auther === auther);
    }
    if (ratings) {
      filteredBooks = filteredBooks.filter(book => book.ratings >= ratings);
    }
    if (searchBook) {
      filteredBooks = filteredBooks.filter(book => book.title.toLowerCase().includes(searchBook.toLowerCase()));
    }
    switch (price) {
      case 'high-to-low':
        filteredBooks = filteredBooks.sort((a, b) => b.price - a.price);
        break;
      case 'low-to-high':
        filteredBooks = filteredBooks.sort((a, b) => a.price - b.price);
        break;
      default:
        break;
    }
    switch (date) {
      case 'new-to-old':
        filteredBooks = filteredBooks.sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate));
        break;
      case 'old-to-new':
        filteredBooks = filteredBooks.sort((a, b) => new Date(a.publishDate) - new Date(b.publishDate));
        break;
      default:
        break;
    }
    return filteredBooks;
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleBooksPerPageChange = (event) => {
    setBooksPerPage(parseInt(event.target.value, 10));
    setCurrentPage(1); // Reset to first page
  };

  const filteredData = filterBooks(bookData);

  // Pagination logic
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = filteredData.slice(indexOfFirstBook, indexOfLastBook);
  const totalPages = Math.ceil(filteredData.length / booksPerPage);

  // Extract unique authors
  const uniqueAuthors = Array.from(new Set(bookData.map(book => book.auther)));

  //redirect to book details page
  const handleOnRedirect = (id) => {
    navigate(`/bookDetails/${id}`)
  }

  return (
    <section className='bg-white'>
      <main className='flex  lg:flex-row flex-col-reverse lg:space-x-10 lg:mx-20 my-10'>
        {/* section 1 */}
        <aside className='lg:w-[20%]'>
          {/* filter books by genre */}
          <div className='bg-white border rounded-xl'>
            <h1 className='font-semibold border-b py-4 pl-14 text-xl'>Genre</h1>
            <div className='pl-14'>
              {genres.map((bookGenre, index) => (
                <ul key={index} className='py-2 text-gray-600 flex space-x-2 items-center hover:text-red-600 cursor-pointer'>
                  <input
                    type="checkbox"
                    checked={genre === bookGenre}
                    onChange={(e) => handleSelectChange(setGenre, e.target.checked ? bookGenre : '')}
                  /><li>{bookGenre}</li>
                </ul>
              ))}
            </div>
          </div>
          {/* filter books by authors */}
          <div className='bg-white border rounded-xl mt-5'>
            <h1 className='font-semibold border-b py-4 px-14 text-xl'>Authors</h1>
            <div className='px-14'>
              {uniqueAuthors.map((author, index) => (
                <ul key={index} className='py-2 text-gray-600 flex space-x-2 items-center hover:text-red-600 cursor-pointer'>
                  <input
                    type="checkbox"
                    checked={auther === author}
                    onChange={(e) => handleSelectChange(setAuther, e.target.checked ? author : '')}
                  /><li>{author}</li>
                </ul>
              ))}
            </div>
          </div>
          {/* filter books by ratings */}
          <div className='bg-white border rounded-xl mt-5 cursor-pointer'>
            <h1 className='font-semibold border-b py-4 px-14 text-xl'>Review Ratings</h1>
            {[1, 2, 3, 4, 5].map((rating) => (
              <div
                key={rating}
                className='px-14 flex space-x-1 items-center m-1 text-orange-300'
                onClick={() => handleSelectChange(setRatings, ratings === rating ? '' : rating)}
              >
                {[...Array(5)].map((_, i) => i < rating ? <FaStar key={i} /> : <FaRegStar key={i} />)}
                <p className='text-black'>{rating}</p>
              </div>
            ))}
          </div>
        </aside>

        {/* section 2 */}
        <section>
          {/* nav menu */}
          <div className='flex  lg:flex-row flex-col lg:items-center space-y-4 lg:space-x-14 border-b pb-3 w-full'>
            <div className='font-semibold font-serif text-xl mx-5 lg:mx-0'>
              Books
            </div>
            <div>
              <input
                type="search"
                placeholder='Search book'
                className='text-sm font-semibold mx-5 lg:mx-0 lg:w-72 w-80'
                value={searchBook}
                onChange={handleInputChange(setSearchBook)}
              />
            </div>
            {/* sort by Price */}
            <div className='border px-4 py-1 rounded cursor-pointer mx-5 lg:mx-0'>
              <select name="" id="" value={price} onChange={(e) => handleSelectChange(setPrice, e.target.value)}>
                <option value="">Price</option>
                <option value="high-to-low">High to Low</option>
                <option value="low-to-high">Low to High</option>
              </select>
            </div>
            {/* sort by date */}
            <div className='border px-4 py-1 rounded cursor-pointer mx-5 lg:mx-0'>
              <select name="" id="" value={date} onChange={(e) => handleSelectChange(setDate, e.target.value)}>
                <option value="">Publish date</option>
                <option value="new-to-old">New to Old</option>
                <option value="old-to-new">Old to New</option>
              </select>
            </div>
            {/* show book per page */}
            <div className='border px-4 py-1 rounded cursor-pointer mx-5 lg:mx-0'>
              Show
              <select name="" id="" value={booksPerPage} onChange={handleBooksPerPageChange}>
                <option value="10">10</option>
                <option value="30">30</option>
                <option value="50">50</option>
              </select>
            </div>
          </div>
          {/* Books as per filter */}
          <div className='my-5 grid lg:grid-cols-4 gap-5'>
            {currentBooks
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
          {/* Pagination */}
          <div className='flex justify-center space-x-2'>
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                className={`px-3 py-1 border ${i + 1 === currentPage ? 'bg-gray-300' : 'bg-white'}`}
                onClick={() => handlePageChange(i + 1)}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </section>
      </main>
    </section>
  );
}

export default Homepage;
