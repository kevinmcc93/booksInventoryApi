## Overview
This project is a basic API built in JavaScript using Express for the backend and React for the frontend. It provides a simple way to manage an inventory of books. The backend API handles CRUD operations (Create, Read, Update, Delete) for books, allowing users to add, retrieve, update, and delete books. The frontend is built with React and interacts with the backend API to provide a responsive user-friendly interface. Please note that this app uses in memory storage, so the data is not persistant.


## Table of Contents
  Features
    - Get All Books
    - Filter Books
    - Add New Book
    - Update Book Details
    - Delete Book
  Prerequisites
  Installation
  Running the App
  Running Tests
  API Documentation
  Example queries in cURL format
  Technologies Used
  License

## Features
Get All Books
Retrieve information about all available books in the inventory.

Filter Books
Filter books based on various criteria, such as book name, author, and release date.

Add New Book
Add a new book to the inventory by providing its name, author, and release date.

Update Book Details
Update the details of an existing book, including its name, author, and release date.

Delete Book
Delete a book from the inventory based on its unique ID.

## Prerequisites
```bash
# This was developed with the following enviroment
node - v16.14.2
npm - 8.5.0
express - ^4.18.2
react - ^18.2.0
further information can be found in the package.json files
```
Node.js (version 12 or higher)
npm (Node Package Manager)

## Installation
Clone the repository to your local machine:
```bash
git clone https://github.com/yourusername/book-inventory-app.git
```

Navigate to the project directory,
Install the required dependencies:
```bash 
npm install
```
## Running the App
Start the backend server by navigating to the backend directory and running:
```bash 
node index.js
```

In a separate terminal tab, navigate to the book-frontend directory and start the React app:
```bash
npm start
```

Access the app in your web browser by opening http://localhost:3000
Access the api via http://localhost:8080/books/

## Running Tests
To run tests for the backend API, use the following command:

```bash
npm test
```

## API Documentation
The API is documented using YAML, which can be found in the api-sepc.yaml file. The YAML can be used with OpenAPI (Swagger) to see visually. 

## Example queries in cURL format

  Note that you should replace <BOOK_ID> below with a valid book ID
  
  # Return all books
  curl -X GET http://localhost:8080/books

  # Return filtered books by name
  curl -X GET http://localhost:8080/books?name=Harry

  # Return filtered books by author
  curl -X GET http://localhost:8080/books?author=J.K%20Rowling

  # Return filtered books by release date
  curl -X GET http://localhost:8080/books?releaseDate=2000-07-08

  # Add a new book
  curl -X POST -H "Content-Type: application/json" -d '{
    "name": "New Book",
    "releaseDate": "2023-01-01",
    "author": "Test Author"
  }' http://localhost:8080/books

  # Retrieve a book by ID
  curl -X GET http://localhost:8080/books/<BOOK_ID>

  # Update a book by ID
  curl -X PATCH -H "Content-Type: application/json" -d '{
    "name": "Updated Book Name",
    "releaseDate": "2023-01-01",
    "author": "Updated Author"
  }' http://localhost:8080/books/<BOOK_ID>

  # Delete a book by ID
  curl -X DELETE http://localhost:8080/books/<BOOK_ID>

## Technologies Used
Backend: Express.js, Node.js
Frontend: React
Testing: Postman, Jest, Supertest
Documentation: YAML/ OpenAPI (Swagger)

## License
This project is licensed under the MIT License.
