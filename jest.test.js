const request = require('supertest');
const app = require('./index.js');

describe('Book API', () => {
  let testBookId;

  let server;

  beforeAll(async () => {
    // Start the Express app server before running tests
    server = app.listen(0); // Use 0 to let the operating system allocate an available port
    const { port } = server.address();
    console.log(`App is alive and listening on port ${port}`);
  });

  afterAll(async () => {
    // Close the Express app server after all tests have completed
    await server.close();
  });

  // Test the GET /books endpoint
  describe('GET /books', () => {
    it('should return all books', async () => {
      const response = await request(app).get('/books');
      expect(response.status).toBe(200);
      expect(response.body).toHaveLength(5);
    });

    it('should return filtered books by name', async () => {
      const response = await request(app).get('/books?name=Harry');
      expect(response.status).toBe(200);
    });

    it('should return filtered books by author', async () => {
      const response = await request(app).get('/books?author=J.K Rowling');
      expect(response.status).toBe(200);
    });

    it('should return filtered books by release date', async () => {
      const response = await request(app).get('/books?releaseDate=2000-07-08');
      expect(response.status).toBe(200);
    });
  });

  // Test the POST /books endpoint
  describe('POST /books', () => {
    it('should add a new book', async () => {
      const newBook = {
        name: 'New Book',
        releaseDate: '2023-01-01',
        author: 'Test Author'
      };

      const response = await request(app)
        .post('/books')
        .send(newBook);

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('name', 'New Book');
      testBookId = response.body._id;
    });

    it('should return 400 for invalid input', async () => {
      const invalidBook = {}; // An empty book object
      const response = await request(app)
        .post('/books')
        .send(invalidBook);

      expect(response.status).toBe(400);
    });
  });

  // Test the GET /books/{id} endpoint
  describe('GET /books/{id}', () => {
    it('should retrieve a book by ID', async () => {
      const response = await request(app).get(`/books/${testBookId}`);
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('_id', testBookId);
    });

    it('should return 404 for non-existent book', async () => {
      const nonExistentBookId = 'non-existent-id';
      const response = await request(app).get(`/books/${nonExistentBookId}`);
      expect(response.status).toBe(404);
    });
  });

  // Test the PATCH /books/{id} endpoint
  describe('PATCH /books/{id}', () => {
    it('should update a book by ID', async () => {
      const updatedBook = {
        name: 'Updated Book Name',
        releaseDate: '2023-01-01',
        author: 'Updated Author'
      };

      const response = await request(app)
        .patch(`/books/${testBookId}`)
        .send(updatedBook);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('name', 'Updated Book Name');
    });

    it('should return 404 for updating non-existent book', async () => {
      const nonExistentBookId = 'non-existent-id';
      const updatedBook = {
        name: 'Updated Book Name'
      };

      const response = await request(app)
        .patch(`/books/${nonExistentBookId}`)
        .send(updatedBook);

      expect(response.status).toBe(404);
    });
  });

  // Test the DELETE /books/{id} endpoint
  describe('DELETE /books/{id}', () => {
    it('should delete a book by ID', async () => {
      const response = await request(app).delete(`/books/${testBookId}`);
      expect(response.status).toBe(200);
    });

    it('should return 404 for deleting non-existent book', async () => {
      const nonExistentBookId = 'non-existent-id';
      const response = await request(app).delete(`/books/${nonExistentBookId}`);
      expect(response.status).toBe(404);
    });
  });
});
