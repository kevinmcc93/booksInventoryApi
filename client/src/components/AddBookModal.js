import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios'

function AddBookModal(props) {
  const [name, setName] = useState('');
  const [author, setAuthor] = useState('');
  const [releaseDate, setReleaseDate] = useState(new Date());

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      name,
      author,
      releaseDate: releaseDate.toISOString().substring(0, 10)
    };
    axios.post('http://localhost:8080/books', data)
      .then(response => {
        props.onHide();
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <Modal {...props} centered>
      <Modal.Header>
        <Modal.Title>Add Book</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formName">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" value={name} onChange={(event) => setName(event.target.value)} />
          </Form.Group>
          <Form.Group controlId="formAuthor">
            <Form.Label>Author</Form.Label>
            <Form.Control type="text" value={author} onChange={(event) => setAuthor(event.target.value)} />
          </Form.Group>
          <Form.Group controlId="formReleaseDate">
            <Form.Label>Release Date</Form.Label>
            <DatePicker selected={releaseDate} onChange={date => setReleaseDate(date)} />
          </Form.Group>
          <Modal.Footer>
            <Button variant="secondary" onClick={props.onHide}>Cancel</Button>
            <Button variant="primary" type="submit">
              Confirm
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default AddBookModal