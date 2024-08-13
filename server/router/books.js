// const { Book } = require('../models/bookModel');
// const express = require('express');
// const router = express.Router();
// const multer = require('multer');


// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, './files');
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + file.originalname);
//   }
// });

// const upload = multer({ storage: storage });

// router.post('/', upload.single('file'), async (req, res) => {
//   try {
//     if (!req.file) {
//       throw new Error('File upload failed');
//     }
//     console.log("File uploaded successfully.", req.file);

//     const newBook = {
//       title: req.body.title,
//       descp: req.body.descp,
//       genre: req.body.genre,
//       price: req.body.price,
//       tags: req.body.tags,
//       file: req.file.filename,
//       addas: req.body.addas,
//       publishDate: req.body.publishDate,
//       auther: req.body.auther,
//     };

//     await Book.create(newBook);
//     res.status(201).json({ message: 'File uploaded and book created successfully' });
//   } catch (error) {
//     console.error(error.message);
//     console.error('Error details:', error);
//     res.status(500).json({ message: error.message });
//   }
// });

// router.get('/', async (req, res) => {
//   try {
//     const books = await Book.find({});
//     res.status(200).json(books);
//   } catch (error) {
//     console.error(error.message);
//     res.status(500).json({ message: error.message });
//   }
// });

// router.get('/:id', async (req, res) => {
//   try {
//     const book = await Book.findById(req.params.id);
//     if (!book) {
//       return res.status(404).json({ message: 'Book not found' });
//     }
//     res.status(200).json(book);
//   } catch (error) {
//     console.error(error.message);
//     res.status(500).json({ message: error.message });
//   }
// });


// router.patch('/:id', upload.single('file'), async (req, res) => {
//   try {
//     const book = await Book.findById(req.params.id);
//     if (!book) {
//       return res.status(404).send({ error: 'Book not found' });
//     }

//     const { title, descp, genre, price, tags, addas, publishDate, auther } = req.body;
//     book.title = title || book.title;
//     book.descp = descp || book.descp;
//     book.genre = genre || book.genre;
//     book.price = price || book.price;
//     book.tags = tags || book.tags;
//     book.addas = addas || book.addas;
//     book.publishDate = publishDate || book.publishDate;
//     book.auther = auther || book.auther;

//     if (req.file) {
//       book.coverImg = req.file.path; // Update cover image if a new file is uploaded
//     }

//     await book.save();
//     res.status(200).send(book);
//   } catch (error) {
//     res.status(500).send({ error: 'Failed to update book' });
//   }
// });


// // Add review and rating
// router.post('/:id/reviews', async (req, res) => {
//   try {
//     const book = await Book.findById(req.params.id);
//     if (!book) {
//       return res.status(404).json({ message: 'Book not found' });
//     }

//     const { user, comment, rating } = req.body;

//     // Ensure the rating is between 1 and 5
//     if (rating < 1 || rating > 5) {
//       return res.status(400).json({ message: 'Rating must be between 1 and 5' });
//     }

//     const newReview = {
//       user,
//       comment,
//       rating,
//     };

//     book.reviews.push(newReview); // Add the new review to the reviews array
//     await book.save(); // Save the updated book document

//     res.status(201).json({ message: 'Review and rating added successfully', reviews: book.reviews });
//   } catch (error) {
//     console.error(error.message);
//     res.status(500).json({ message: error.message });
//   }
// });


// module.exports = router;


const { Book } = require('../models/bookModel');
const express = require('express');
const router = express.Router();
const cloudinary = require('cloudinary').v2;
const fileUpload = require('express-fileupload');


console.log(cloudinary.config());
// Middleware to handle file uploads
router.use(fileUpload({
  useTempFiles: true,
  tempFileDir: '/tmp/'
}));

// Configure Cloudinary (Ensure these environment variables are set)
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


router.post('/', async (req, res) => {
  try {
    if (!req.files || !req.files.file) {
      return res.status(400).json({ message: 'No image file uploaded' });
    }
    const uploadImage = async (imagePath) => {
      const options = {
        use_filename: true,
        unique_filename: false,
        overwrite: true,
      };

      try {
        const result = await cloudinary.uploader.upload(imagePath, options);
        console.log(result);
        return result.secure_url;  // Return the URL of the uploaded image
      } catch (error) {
        console.error('Error uploading to Cloudinary:', error);
        throw error;
      }
    };
    // Upload the image file to Cloudinary
    const imageFile = req.files.file;
    const imageUrl = await uploadImage(imageFile.tempFilePath);

    console.log("File uploaded successfully.", req.files.file);

    const newBook = {
      title: req.body.title,
      descp: req.body.descp,
      genre: req.body.genre,
      price: req.body.price,
      tags: req.body.tags,
      file: imageUrl,
      addas: req.body.addas,
      publishDate: req.body.publishDate,
      auther: req.body.auther,
    };

    await Book.create(newBook);
    res.status(201).json({ message: 'File uploaded and book created successfully' });
  } catch (error) {
    console.error(error.message);
    console.error('Error details:', error);
    res.status(500).json({ message: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const books = await Book.find({});
    res.status(200).json(books);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.status(200).json(book);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: error.message });
  }
});


router.patch('/:id', upload.single('file'), async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).send({ error: 'Book not found' });
    }

    const { title, descp, genre, price, tags, addas, publishDate, auther } = req.body;
    book.title = title || book.title;
    book.descp = descp || book.descp;
    book.genre = genre || book.genre;
    book.price = price || book.price;
    book.tags = tags || book.tags;
    book.addas = addas || book.addas;
    book.publishDate = publishDate || book.publishDate;
    book.auther = auther || book.auther;

    if (req.file) {
      book.coverImg = req.file.path; // Update cover image if a new file is uploaded
    }

    await book.save();
    res.status(200).send(book);
  } catch (error) {
    res.status(500).send({ error: 'Failed to update book' });
  }
});


// Add review and rating
router.post('/:id/reviews', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    const { user, comment, rating } = req.body;

    // Ensure the rating is between 1 and 5
    if (rating < 1 || rating > 5) {
      return res.status(400).json({ message: 'Rating must be between 1 and 5' });
    }

    const newReview = {
      user,
      comment,
      rating,
    };

    book.reviews.push(newReview); // Add the new review to the reviews array
    await book.save(); // Save the updated book document

    res.status(201).json({ message: 'Review and rating added successfully', reviews: book.reviews });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: error.message });
  }
});


module.exports = router;
