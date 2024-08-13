import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../authContext';
import { FaStar } from 'react-icons/fa';

function BookDetails() {
  const { id } = useParams();
  const [bookData, setBookData] = useState(null);
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(0);
  const [showMore, setShowMore] = useState(false);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchBookData = async () => {
      try {
        const res = await fetch(`https://book-store-server-ebon.vercel.app/books/${id}`);
        const data = await res.json();

        if (res.ok) {
          setBookData(data);
        } else {
          throw new Error('Failed to fetch book details');
        }
      } catch (error) {
        console.error('Error fetching book details:', error.message);
      }
    };

    fetchBookData();
  }, [id]);

  if (!bookData) return <div className="text-center py-10">Loading...</div>;

  // Calculate average rating
  const averageRating = bookData.reviews.length > 0
    ? bookData.reviews.reduce((sum, review) => sum + review.rating, 0) / bookData.reviews.length
    : 0;

  const handleAddReviewAndRating = async () => {
    if (!review || rating <= 0 || rating > 5) {
      alert("Please provide a review and a rating between 1 and 5.");
      return;
    }

    try {
      const res = await fetch(`https://book-store-server-ebon.vercel.app/books/${id}/reviews`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          user: user.userName,
          comment: review,
          rating,
        }),
      });

      if (res.ok) {
        alert("Review and rating added successfully!");
        setReview('');
        setRating(0);
      } else {
        throw new Error("Failed to add review and rating");
      }
    } catch (error) {
      console.error('Error adding review and rating:', error.message);
      alert("An error occurred while adding the review and rating.");
    }
  };

  return (
    <section className="min-h-screen relative">
      <img src="/newletter_bg.jpg" alt="" className="w-full absolute -z-10" />
      <div className="flex justify-between pt-20 min-h-96 mx-20">
        <div className="bg-white basis-1/2 m-5 p-8 border rounded-xl">
          <img src={bookData.file} alt={bookData.title} className="w-full" />
        </div>
        <div className="bg-white basis-1/2 m-5 p-6 border rounded-xl">
          <h1 className="text-4xl font-semibold">{bookData.title || "The Story of Success"}</h1>
          <ul className="flex space-x-10 mt-5 border-b pb-5">
            <li><span className="text-gray-500 text-md">Author:</span> {bookData.auther}</li>
            <li className="flex items-center">
              {[...Array(5)].map((_, index) => (
                <FaStar
                  key={index}
                  className={`inline-block ${index < Math.round(averageRating) ? 'text-yellow-500' : 'text-gray-300'}`}
                />
              ))}
            </li>
          </ul>
          <p className="text-3xl text-orange-600 font-semibold mt-5">₹ {bookData.price}</p>
          <p className="mt-10">{bookData.descp}</p>
          <p className="mt-10"><span className="text-gray-500">Categories: </span>{bookData.genre}</p>
          <p className="mt-5"><span className="text-gray-500">Tags: </span>{bookData.tags}</p>

          {user ? (
            <div className="mt-5">
              <h3 className="font-semibold text-lg">Add a Review:</h3>
              <textarea
                className="w-full p-2 border rounded mt-2"
                value={review}
                onChange={(e) => setReview(e.target.value)}
                placeholder="Write your review here..."
              ></textarea>
              <div className="mt-5">
                <h3 className="font-semibold text-lg">Give a Rating:</h3>
                <div className="flex items-center">
                  {[...Array(5)].map((_, index) => (
                    <FaStar
                      key={index}
                      className={`cursor-pointer ${index < rating ? 'text-yellow-500' : 'text-gray-300'}`}
                      onClick={() => setRating(index + 1)}
                    />
                  ))}
                </div>
              </div>
              <button className="bg-blue-500 text-white px-4 py-2 rounded mt-2" onClick={handleAddReviewAndRating}>
                Submit Review and Rating
              </button>
            </div>
          ) : (
            <p className="text-red-500 mt-5">You need to be logged in to add a review or rating.</p>
          )}

          <div className="mt-10">
            <h3 className="font-semibold text-lg">Reviews:</h3>
            {bookData.reviews.slice(0, showMore ? undefined : 4).map((review) => (
              <div key={review._id} className="border-b py-2">
                <p><strong>{review.user}</strong></p>
                <div className="flex items-center">
                  {[...Array(5)].map((_, index) => (
                    <FaStar
                      key={index}
                      className={`inline-block ${index < review.rating ? 'text-yellow-500' : 'text-gray-300'}`}
                    />
                  ))}
                </div>
                <p>{review.comment}</p>
              </div>
            ))}
            {bookData.reviews.length > 4 && (
              <button className="text-blue-500 mt-2" onClick={() => setShowMore(!showMore)}>
                {showMore ? 'Show less' : 'Show more'}
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default BookDetails;
