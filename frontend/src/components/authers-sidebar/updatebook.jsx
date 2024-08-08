import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function UpdateBook({id,onShow}) {

  const navigate = useNavigate();
 
  const [title, setTitle] = useState('');
  const [descp, setDescp] = useState('');
  const [genre, setGenre] = useState('');
  const [price, setPrice] = useState('');
  const [tags, setTags] = useState('');
  const [file, setFile] = useState(null);
  const [addas, setAddas] = useState('');
  const [publishDate, setPublishedDate] = useState('');
  const [message, setMessage] = useState('');
  const [author, setAuther] = useState('');


  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await fetch(`http://localhost:5000/books/${id}`);
        if (res.ok) {
          const data = await res.json();
          setTitle(data.title || '');
          setDescp(data.descp || '');
          setGenre(data.genre || '');
          setPrice(data.price || '');
          setTags(data.tags || '');
          setAddas(data.addas || '');
          setPublishedDate(data.publishDate || '');
          setAuther(data.auther || '');
        } else {
          throw new Error('Failed to fetch book');
        }
      } catch (error) {
        console.error('Error fetching book:', error.message);
      }
    };

    fetchBook();
  }, [id]);

  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);
    formData.append('title', title);
    formData.append('descp', descp);
    formData.append('genre', genre);
    formData.append('price', price);
    formData.append('tags', tags);
    formData.append('addas', addas);
    formData.append('publishDate', publishDate);
    formData.append('auther', author);

    try {
      const res = await fetch(`http://localhost:5000/books/${id}`, {
        method: 'PATCH',
        body: formData,
      });

      if (res.ok) {
        setMessage('Book updated successfully');
        setTimeout(() => {
          setMessage('');
          navigate('/author/all-books'); // Redirect to the homepage or another page after successful update
        }, 2000);
      } else {
        throw new Error('Failed to update book');
      }
    } catch (error) {
      console.error('Error updating book:', error.message);
    }
  };

  return (
    <>
    <div className=' absolute top-28 z-10 w-[80%] bg-slate-200 flex justify-center'> 
      <form onSubmit={handleOnSubmit} className='lg:border rounded lg:p-10 lg:mx-5 m-5 w-1/2 bg-white '>
        <h1 className='text-xl font-semibold text-center mb-5'>Update Book</h1>
        <div className='mb-4'>
          <label htmlFor="title" className='block text-sm font-medium text-gray-700'>Enter Book Title</label>
          <input type="text" id="title" name="title" value={title}
            onChange={(e) => setTitle(e.target.value)}
            className='mt-1 block w-full border-gray-300 rounded-md shadow-sm sm:text-sm' />
        </div>
        <div className='mb-4'>
          <label htmlFor="description" className='block text-sm font-medium text-gray-700'>Enter Book Description</label>
          <input type="text" id="description" name="description" value={descp}
            onChange={(e) => setDescp(e.target.value)}
            className='mt-1 block w-full border-gray-300 rounded-md shadow-sm sm:text-sm' />
        </div>
        <div className='mb-4'>
          <label htmlFor="genre" className='block text-sm font-medium text-gray-700'>Enter Book Genre</label>
          <input type="text" id="genre" name="genre" value={genre}
            onChange={(e) => setGenre(e.target.value)}
            className='mt-1 block w-full border-gray-300 rounded-md shadow-sm sm:text-sm' />
        </div>
        <div className='mb-4'>
          <label htmlFor="price" className='block text-sm font-medium text-gray-700'>Enter Book Price</label>
          <input type="number" id="price" name="price" value={price}
            onChange={(e) => setPrice(e.target.value)}
            className='mt-1 block w-full border-gray-300 rounded-md shadow-sm sm:text-sm' />
        </div>
        <div className='mb-4'>
          <label htmlFor="tags" className='block text-sm font-medium text-gray-700'>Add Tags</label>
          <input type="text" id="tags" name="tags" value={tags}
            onChange={(e) => setTags(e.target.value)}
            className='mt-1 block w-full border-gray-300 rounded-md shadow-sm sm:text-sm' />
        </div>
        <div className='mb-4'>
          <label className='block text-sm font-medium text-gray-700' htmlFor="coverImg">Add Cover Photo</label>
          <input type="file" id="coverImg"
            onChange={(e) => setFile(e.target.files[0])}
            className='mt-1 block w-full border-gray-300 rounded-md shadow-sm sm:text-sm'
            placeholder='Add cover image'
          />
        </div>
        <div className='flex space-x-5 mb-5'>
          <label htmlFor="">Add as</label>
          <label htmlFor="radio-option">
            <input type="radio" name="option" value="publish"
              checked={addas === 'publish'}
              onChange={(e) => setAddas(e.target.value)}
            />
            Publish
          </label>
          <label htmlFor="radio-option">
            <input type="radio" name="option" value="draft"
              checked={addas === 'draft'}
              onChange={(e) => setAddas(e.target.value)}
            />
            Draft
          </label>
        </div>
        <div className='mb-4'>
          <label htmlFor="publishDate" className='block text-sm font-medium text-gray-700'>Publish Date</label>
          <input type="date" id="publishDate" value={publishDate}
            onChange={(e) => setPublishedDate(e.target.value)}
            min={getTodayDate()}
            className='mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm' />
        </div>
        <div className='mb-4'>
          <label htmlFor="author" className='block text-sm font-medium text-gray-700'>Enter Author Name</label>
          <input type="text" id="author" name="author" value={author}
            onChange={(e) => setAuther(e.target.value)}
            className='mt-1 block w-full border-gray-300 rounded-md shadow-sm sm:text-sm' />
        </div>
        <div>
          <button type="submit" className='px-4 py-2 w-full bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700 '>
            Update Book
          </button>

          <div onClick={onShow} className='cursor-pointer text-center px-4 py-2 my-2 w-full bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700 '>
           Cancel
          </div>
        </div>
        {message && (
          <div className='text-green-600 bg-green-50 text-center m-5'>{message}</div>
        )}
      </form>
    </div>
        {/* <form onSubmit={handleOnSubmit} className='lg:border rounded lg:p-10 lg:mx-5 m-5 absolute top-5 bg-white w-1/3'>
        <h1 className='text-xl font-semibold text-center mb-5'>Update Book</h1>
        <div className='mb-4'>
          <label htmlFor="title" className='block text-sm font-medium text-gray-700'>Enter Book Title</label>
          <input type="text" id="title" name="title" value={title}
            onChange={(e) => setTitle(e.target.value)}
            className='mt-1 block w-full border-gray-300 rounded-md shadow-sm sm:text-sm' />
        </div>
        <div className='mb-4'>
          <label htmlFor="description" className='block text-sm font-medium text-gray-700'>Enter Book Description</label>
          <input type="text" id="description" name="description" value={descp}
            onChange={(e) => setDescp(e.target.value)}
            className='mt-1 block w-full border-gray-300 rounded-md shadow-sm sm:text-sm' />
        </div>
        <div className='mb-4'>
          <label htmlFor="genre" className='block text-sm font-medium text-gray-700'>Enter Book Genre</label>
          <input type="text" id="genre" name="genre" value={genre}
            onChange={(e) => setGenre(e.target.value)}
            className='mt-1 block w-full border-gray-300 rounded-md shadow-sm sm:text-sm' />
        </div>
        <div className='mb-4'>
          <label htmlFor="price" className='block text-sm font-medium text-gray-700'>Enter Book Price</label>
          <input type="number" id="price" name="price" value={price}
            onChange={(e) => setPrice(e.target.value)}
            className='mt-1 block w-full border-gray-300 rounded-md shadow-sm sm:text-sm' />
        </div>
        <div className='mb-4'>
          <label htmlFor="tags" className='block text-sm font-medium text-gray-700'>Add Tags</label>
          <input type="text" id="tags" name="tags" value={tags}
            onChange={(e) => setTags(e.target.value)}
            className='mt-1 block w-full border-gray-300 rounded-md shadow-sm sm:text-sm' />
        </div>
        <div className='mb-4'>
          <label className='block text-sm font-medium text-gray-700' htmlFor="coverImg">Add Cover Photo</label>
          <input type="file" id="coverImg"
            onChange={(e) => setFile(e.target.files[0])}
            className='mt-1 block w-full border-gray-300 rounded-md shadow-sm sm:text-sm'
            placeholder='Add cover image'
          />
        </div>
        <div className='flex space-x-5 mb-5'>
          <label htmlFor="">Add as</label>
          <label htmlFor="radio-option">
            <input type="radio" name="option" value="publish"
              checked={addas === 'publish'}
              onChange={(e) => setAddas(e.target.value)}
            />
            Publish
          </label>
          <label htmlFor="radio-option">
            <input type="radio" name="option" value="draft"
              checked={addas === 'draft'}
              onChange={(e) => setAddas(e.target.value)}
            />
            Draft
          </label>
        </div>
        <div className='mb-4'>
          <label htmlFor="publishDate" className='block text-sm font-medium text-gray-700'>Publish Date</label>
          <input type="date" id="publishDate" value={publishDate}
            onChange={(e) => setPublishedDate(e.target.value)}
            min={getTodayDate()}
            className='mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm' />
        </div>
        <div className='mb-4'>
          <label htmlFor="author" className='block text-sm font-medium text-gray-700'>Enter Author Name</label>
          <input type="text" id="author" name="author" value={author}
            onChange={(e) => setAuther(e.target.value)}
            className='mt-1 block w-full border-gray-300 rounded-md shadow-sm sm:text-sm' />
        </div>
        <div>
          <button type="submit" className='px-4 py-2 w-full bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700 '>
            Update Book
          </button>

          <div onClick={onShow} className='cursor-pointer text-center px-4 py-2 my-2 w-full bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700 '>
           Cancel
          </div>
        </div>
        {message && (
          <div className='text-green-600 bg-green-50 text-center m-5'>{message}</div>
        )}
      </form> */}
    </>
  );
}

export default UpdateBook;
