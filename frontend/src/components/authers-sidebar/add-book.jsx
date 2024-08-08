import React, { useState } from 'react';

function AddBook() {
  const [title, setTitle] = useState('');
  const [descp, setDescp] = useState('');
  const [genre, setGenre] = useState('');
  const [price, setPrice] = useState('');
  const [tags, setTags] = useState('');
  const [file, setFile] = useState('');
  const [addas, setAddas] = useState("");
  const [publishDate, setPublishedDate] = useState("");
  const [message, setMessage] = useState('');
  const [author,setAuther]= useState('');
  const [errors, setErrors] = useState({
    title: '', descp: "", genre: "", price: "", tags: "", file: "", addas: "", publishDate: "" ,author:''
  })

  // Function to get today's date in YYYY-MM-DD format
  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-based
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

    let newErrors = {};
    if (!file) newErrors.file = "Add Cover IMG";
    if (!title) newErrors.title = "please enter the title"
    if (!descp) newErrors.descp = "please enter the description"
    if (!genre) newErrors.genre = "please enter the genre"
    if (!price) newErrors.price = "please enter the price"
    if (!addas) newErrors.addas = "please enter the Publish/Draft"
    if (!author) newErrors.author = "please enter the author name"

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setErrors(prevState => ({ ...prevState, general: 'All fields are necessary' }));
      return;
    }
    console.log(title, descp, genre, price, tags, file, addas, publishDate,author);
    try {
      const res = await fetch("http://localhost:5000/books", {
        method: "POST",
        body: formData,
      });
      if (res.ok) {
        console.log("Book added successfully");
        setMessage('Book added successfully');
        setErrors('')
        setTitle(''); setDescp(''); setFile(''); setGenre('');
         setPrice(''); setTags(''); setPublishedDate(''); setAuther('')
        setTimeout(()=>{
          setMessage('');
        },2000);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <section className='p-4'>
        <div className='border p-4 rounded'>
          <h1 className='text-2xl text-gray-500 font-semibold'>Add New Book</h1>
        </div>
        <div className='mt-4 lg:flex justify-between'>
          <div className='lg:basis-1/2 flex justify-center'>
            <img src="/bookread.svg" alt="" className='w-1/2' />
          </div>
          <form onSubmit={handleOnSubmit} className='basis-1/2 lg:border rounded lg:p-10 lg:mx-5'>
            <h1 className='text-xl font-semibold text-center mb-5'>Add Book</h1>
            <div className='mb-4'>
              <label htmlFor="title" className='block text-sm font-medium text-gray-700'>Enter Book Title</label>
              <input type="text" id="title" name="title" value={title}
                onChange={(e) => setTitle(e.target.value)}
                className={`mt-1 block w-full border-gray-300 rounded-md shadow-sm sm:text-sm ${errors.genre && "border-red-500"} `} />
              <span className="text-red-600 text-sm">{errors.title}</span>
            </div>
            <div className='mb-4'>
              <label htmlFor="description" className='block text-sm font-medium text-gray-700'>Enter Book Description</label>
              <input type="text" id="description" name="description" value={descp}
                onChange={(e) => setDescp(e.target.value)}
                className={`mt-1 block w-full border-gray-300 rounded-md shadow-sm sm:text-sm ${errors.genre && "border-red-500"} `} />
              <span className="text-red-600 text-sm">{errors.descp}</span>
            </div>
            <div className='mb-4'>
              <label htmlFor="genre" className='block text-sm font-medium text-gray-700'>Enter Book Genre</label>
              <input type="text" id="genre" name="genre" value={genre}
                onChange={(e) => setGenre(e.target.value)}
                className={`mt-1 block w-full border-gray-300 rounded-md shadow-sm sm:text-sm ${errors.genre && "border-red-500"} `} />
              <span className="text-red-600 text-sm">{errors.genre}</span>
            </div>
            <div className='mb-4'>
              <label htmlFor="price" className='block text-sm font-medium text-gray-700'>Enter Book Price</label>
              <input type="number" id="price" name="price" value={price}
                onChange={(e) => setPrice(e.target.value)}
                className={`mt-1 block w-full border-gray-300 rounded-md shadow-sm sm:text-sm ${errors.price && "border-red-500"} `} />
              <span className="text-red-600 text-sm">{errors.price}</span>
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
                className={`mt-1 block w-full border-gray-300 rounded-md shadow-sm sm:text-sm ${errors.file && "border-red-500"} `}
                placeholder='Add cover image'
              />
              <span className="text-red-600 text-sm">{errors.file}</span>
            </div>
            {/* add as draft or publish */}
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
              <br />
              <span className="text-red-600 text-sm">{errors.addas}</span>
            </div>
            {/* Date Input */}
            <div className='mb-4'>
              <label htmlFor="publishDate" className='block text-sm font-medium text-gray-700'>Publish Date</label>
              <input type="date" id="publishDate" value={publishDate}
                onChange={(e) => setPublishedDate(e.target.value)}
                min={getTodayDate()}
                className='mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm' />
            </div>
            <div className='mb-4'>
              <label htmlFor="genre" className='block text-sm font-medium text-gray-700'>Enter Auther Name</label>
              <input type="text" id="genre" name="genre" value={author}
                onChange={(e) => setAuther(e.target.value)}
                className={`mt-1 block w-full border-gray-300 rounded-md shadow-sm sm:text-sm ${errors.genre && "border-red-500"} `} />
              <span className="text-red-600 text-sm">{errors.author}</span>
            </div>
            <div>
              <button type="submit" className='px-4 py-2 w-full bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500'>
                Add Book
              </button>
            </div>
            <div>
              { message &&
              <div className='ext-green-600 bg-green-50 text-center m-5'>{message}</div>
                }
            </div>
            <div>
              {errors.general && 
             <div className='text-red-600 bg-red-50 text-center m-5 p-1'>{errors.general}</div>
              }
            </div>
          </form>
        </div>
      </section>
    </>
  );
}

export default AddBook;
