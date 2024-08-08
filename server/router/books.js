const { Book } = require('../models/bookModel');
const express = require('express');
const router = express.Router();
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './files');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  }
});

const upload = multer({ storage: storage });

router.post('/', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      throw new Error('File upload failed');
    }
    console.log("File uploaded successfully.", req.file);

    const newBook = {
      title: req.body.title,
      descp: req.body.descp,
      genre: req.body.genre,
      price: req.body.price,
      tags: req.body.tags,
      file: req.file.filename,
      addas: req.body.addas,
      publishDate: req.body.publishDate,
      auther: req.body.auther,
    };

    await Book.create(newBook);
    res.status(201).json({ message: 'File uploaded and book created successfully' });
  } catch (error) {
    console.error(error.message);
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


module.exports = router;
