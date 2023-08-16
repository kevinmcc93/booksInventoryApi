const express = require('express');
const booksRouter = require('./routes/books.js');
const cors = require('cors');

const app = express();
const port = 8080;

const corsOptions = {
  origin: 'http://localhost:3000'
};
app.use(cors());

app.use(express.json());
app.use('/books', cors(corsOptions), booksRouter);

app.get('/', (req, res) => {
  res.send("It's alive");
});

if (require.main === module) {
  // Start the Express app only if the script is run directly (not imported)
  app.listen(port, () => {
    console.log(`App is alive and listening on port ${port}`);
  });
}

module.exports = app; // Export the app for testing
