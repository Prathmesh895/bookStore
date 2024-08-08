import React, { useEffect, useState } from 'react';
import UpdateBook from './updatebook';

function AllBooks() {
  const [bookData, setBookData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showEdit, setShowedite] = useState('');
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [updateID, setIdupdate] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 8;

  const handleOnshowEdit = () => {
    setShowedite(!showEdit)
  }
  const handleOnedit = (id) => {
    setIdupdate(id);
  }
  console.log(updateID)

  useEffect(() => {
    handleOnFetch();
  }, []);

  useEffect(() => {
    console.log('Book Data Updated:', bookData); // Log whenever bookData changes
  }, [bookData]);

  const handleOnFetch = async () => {
    try {
      const res = await fetch('http://localhost:5000/books');
      if (res.ok) {
        console.log("Data fetched");
        const data = await res.json();
        setBookData(data);
      }
    } catch (error) {
      setError(error.message);
      console.error('Error fetching books:', error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page on search
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
  };

  const filteredBooks = bookData.filter(book =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.auther.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.tags.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);

  const totalPages = Math.ceil(filteredBooks.length / booksPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div>
      <h1>All Books</h1>
      <section>
        <form onSubmit={handleSearchSubmit}>
          <input
            type="search"
            value={searchTerm}
            onChange={handleSearchChange}
            className='m-5 w-1/2'
            placeholder='Search book by title or tags'
          />
          <input type="submit" value="Search" className='cursor-pointer' />
        </form>
      </section>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : currentBooks.length > 0 ? (
        <div>
          <div className='grid lg:grid-cols-4 gap-5 '>
            {currentBooks.map((book) => (
              <ul key={book._id} className='border lg:w-56 w-full p-5'>
                <li>
                  <img src={`http://localhost:5000/files/${book.file}`} alt={book.title} className='border lg:w-44 w-full lg:h-56' />
                </li>
                <li className='font-semibold text-gray-700 text-md truncate '>{book.title}</li>
                <li className='font-semibold text-gray-400 text-sm '>{book.auther}</li>
                <li className='font-semibold text-gray-500 text-md '>Price <span className='text-orange-600'>₹{book.price}</span></li>
                <li className=' flex justify-end'>
                  <p onClick={() => {handleOnedit(book._id),handleOnshowEdit()}} className=' p-1 cursor-pointer font-semibold text-center text-md bg-violet-600 text-white  w-1/2'>Edit </p>
                </li>
              </ul>
            ))}
          </div>
          <div className="pagination flex justify-center m-5">
            <button
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              className='m-2 px-4 py-2 bg-gray-200'
            >
              Previous
            </button>
            {[...Array(totalPages).keys()].map(number => (
              <button
                key={number}
                onClick={() => handlePageChange(number + 1)}
                className={`m-2 px-4 py-2 ${currentPage === number + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
              >
                {number + 1}
              </button>
            ))}
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className='m-2 px-4 py-2 bg-gray-200'
            >
              Next
            </button>
          </div>
        </div>
      ) : (
        <p>No books found.</p>
      )}

      <div>
        {showEdit && <UpdateBook id={updateID} onShow={handleOnshowEdit} />}
      </div>
    </div>


  );
}

export default AllBooks;
