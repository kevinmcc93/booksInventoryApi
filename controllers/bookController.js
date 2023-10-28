const { v4: uuidv4 } = require('uuid');

let books = [
  {
    "_id": "d290f1ee-6c54-4b01-90e6-d701748f0851",
    "name": "Harry Potter and the Goblet of Fire",
    "releaseDate": "2000-07-08",
    "author": "J.K Rowling"
  },
  {
    "_id": "a3a72439-6ffc-4c8b-99f2-4a5074f0fe18",
    "name": "Harry Potter and the Chamber of Secrets",
    "releaseDate": "1998-07-02",
    "author": "J.K Rowling"
  },
  {
    "_id": "bee534af-4424-4d34-97b7-4fd3f90408ae",
    "name": "1984",
    "releaseDate": "1949-06-08",
    "author": "George Orwell"
  },
  {
    "_id": "454b1927-24c5-4ca4-be0b-92c42c37aa55",
    "name": "Let the great world spin",
    "releaseDate": "2009-07-23",
    "author": "Colum McCann"
  },
  {
    "_id": "q290f1ee-6c54-4b01-90e6-d701748f0851",
    "name": "Harry and Walter",
    "releaseDate": "2016-03-01",
    "author": "Kathy Stinson"
  },
]

// Return all books
exports.getBooks = (req, res) => {
  if (!req.query) {
    res.status(200).json(books);
  } else {
    let filteredBooks = [...books]
    if (req.query.name){
      filteredBooks = filteredBooks.filter(book => book.name.toLowerCase().includes(req.query.name.toLowerCase()));
    } 
    if (req.query.author){
      filteredBooks = filteredBooks.filter(book => book.author.toLowerCase().includes(req.query.author.toLowerCase()));
    }
    if (req.query.releaseDate){
      filteredBooks = filteredBooks.filter(book => book.releaseDate.includes(req.query.releaseDate.split('T')[0]));
    }
    res.status(200).json(filteredBooks)
  }
};

// Add a new book
exports.addBook = async (req, res) => {
  if (req.body.name && req.body.releaseDate && req.body.author) {
    const newBook = {
      _id: uuidv4(),
      name: req.body.name,
      releaseDate: req.body.releaseDate.split('T')[0],
      author: req.body.author
    }
    await books.push(newBook);
    res.status(201).json(newBook);
  } else {
    res.status(400).send('Invalid input, object invalid')
  };
}

// Retrieve a single book by ID
exports.getBookById = (req, res) => {
  const bookId = req.params._id;
  const book = books.findIndex((book) => book._id === bookId);
  const bookMatch = books[book]
  if (bookMatch) {
    res.status(200).json(bookMatch);
  } else {
    res.status(404).send('Book not found');
  }
};

// Update a book by ID
exports.updateBook = (req, res) => {
  const bookId = req.params._id;
  const bookIndex = books.findIndex(book => book._id === bookId);

  if (bookIndex !== -1) {
    const existingBook = books[bookIndex];

    const updatedBook = {
      _id: bookId,
      name: req.body.name || existingBook.name,
      releaseDate: req.body.releaseDate ? req.body.releaseDate.split('T')[0] : existingBook.releaseDate,
      author: req.body.author || existingBook.author
    };

    books[bookIndex] = updatedBook;
    res.status(200).json(updatedBook);
  } else {
    res.status(404).send('Book not found');
  }
};


// Delete a book by ID
exports.deleteBook = (req, res) => {
  const bookId = req.params._id;
  const book = books.findIndex((book) => book._id === bookId);
  if (book !== -1) {
    books.splice(book, 1)
    res.status(200).send("Book deleted")
  } else {
    res.status(404).send('Book not found');
  }
}
