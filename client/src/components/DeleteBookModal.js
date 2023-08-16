import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios'

function DeleteBookModal(props) {
  const bookId = props.book._id
  const handleSubmit = (event) => {
    event.preventDefault();

    axios.delete(`http://localhost:8080/books/${bookId}`)
      .then(response => {
        props.onHide();
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <Modal show={props.show} onHide={props.onHide}>
      <Modal.Header>
        <Modal.Title>Delete book</Modal.Title>
      </Modal.Header>

      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Are you sure you want to delete {props.book.name}?</Form.Label>
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

export default DeleteBookModal