import React, { useState, useEffect } from 'react';
import { Container, Table } from 'react-bootstrap';
import "react-datepicker/dist/react-datepicker.css";

import EditBookModal from './EditBookModal';
import AddBookModal from './AddBookModal';
import DeleteBookModal from './DeleteBookModal';

function BookList({ filters }) {
  const [data, setData] = useState([]);
  const [intervalId, setIntervalId] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [bookToEdit, setBookToEdit] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [bookToDelete, setBookToDelete] = useState(null);

  const fetchBooks = async () => {
    let queryString = '';

    if (filters && filters.query && filters.query.nameFilter) {
      queryString += `name=${filters.query.nameFilter}&`;
    }

    if (filters && filters.query && filters.query.authorFilter) {
      queryString += `author=${filters.query.authorFilter}&`;
    }

    if (filters && filters.query && filters.query.dateFilter) {
      queryString += `releaseDate=${filters.query.dateFilter}&`;
    }

    // Remove the last '&' character
    queryString = queryString.slice(0, -1);

    const response = await fetch(`http://localhost:8080/books?${queryString}`);
    const data = await response.json();
    setData(data);
  };

  useEffect(() => {
    fetchBooks();

    // Start the interval when the component mounts
    const id = setInterval(fetchBooks, 5000);

    // Clear the interval when the component unmounts
    return () => clearInterval(id);
  }, [filters]);

  const handleAddBook = () => {
    setShowAddModal(true);
  };

  const handleEditBook = (book) => {
    setBookToEdit(book);
    setShowEditModal(true);
  };

  const handleDeleteBook = (book) => {
    setBookToDelete(book);
    setShowDeleteModal(true);
  };

  return (
    <Container>
      <Table className='myTable'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Author</th>
            <th>Released</th>
            <th><button className='addButton' onClick={handleAddBook}><img src='/plus-lg.svg' alt="addIcon" className='addIcon'/><span className="button-text"> Add new book</span></button></th>
          </tr>
        </thead>
        <tbody>
          {data.map((book) => (
            <tr key={book._id}>
              <td className="col-sm-4">{book.name}</td>
              <td className="col-sm-3">{book.author}</td>
              <td className="col-sm-2">{book.releaseDate}</td>
              <td className="col-sm-6">
                <button className='editButton' onClick={() => handleEditBook(book)}>
                  <img src='/pencil.svg' alt="editIcon" className='editIcon'/><span className="button-text"> Edit</span>
                </button>
                <button className='deleteButton' onClick={() => handleDeleteBook(book)}>
                  <img src='/trash3.svg' alt="deleteIcon" className='deleteIcon'/><span className="button-text"> Delete</span>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {bookToEdit && (
        <EditBookModal
          show={showEditModal}
          onHide={() => setShowEditModal(false)}
          book={bookToEdit}
        />
      )}
      {showAddModal && (
        <AddBookModal
          show={showAddModal}
          onHide={() => setShowAddModal(false)}
        />
      )}
      {bookToDelete && (
        <DeleteBookModal
          show={showDeleteModal}
          onHide={() => setShowDeleteModal(false)}
          book={bookToDelete}
        />
      )}
    </Container>
  );
}

export default BookList;