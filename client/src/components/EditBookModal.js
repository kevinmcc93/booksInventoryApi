import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios'

function EditBookModal(props) {
  const [name, setName] = useState(props.book.name);
  const [author, setAuthor] = useState(props.book.author);
  const [releaseDate, setReleaseDate] = useState(new Date(props.book.releaseDate));

  useEffect(() => {
    setName(props.book.name);
    setAuthor(props.book.author);
    setReleaseDate(new Date(props.book.releaseDate));
  }, [props.book]);

  const handleSubmit = (event) => {
    event.preventDefault();
    
    const bookData = {
      name,
      author,
      releaseDate: releaseDate.toISOString()
    };
    axios.patch(`http://localhost:8080/books/${props.book._id}`, bookData)      
      .then(response => {
        props.onHide();
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <Modal show={props.show} onHide={props.onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Book</Modal.Title>
      </Modal.Header>

      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Author</Form.Label>
            <Form.Control
              type="text"
              value={author}
              onChange={(event) => setAuthor(event.target.value)}
              required
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Release Date</Form.Label>
            <br />
            <DatePicker
              selected={releaseDate}
              onChange={(date) => setReleaseDate(date)}
              dateFormat="yyyy-MM-dd"
              required
            />
          </Form.Group>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={props.onHide}>Cancel</Button>
          <Button variant="primary" type="submit">Confirm</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export default EditBookModal;
