import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function SearchBox({ onSearch }) {
  const [nameFilter, setNameFilter] = useState('');
  const [authorFilter, setAuthorFilter] = useState('');
  const [dateFilter, setDateFilter] = useState(new Date());
  const [filterByDate, setFilterByDate] = useState(false);

  const handleSearch = async (event) => {
    event.preventDefault();
    const filters = {
      "nameFilter": nameFilter,
      "authorFilter": authorFilter,
    }

    if (filterByDate) {
      filters.dateFilter = dateFilter.toISOString().substring(0, 10);
    }
    onSearch(filters);
  };

  return (
    <Container>
      <Form onSubmit={handleSearch}>
        <Form.Group>
          <Row>
            <Col xs={12} sm={12} md={6} lg={3}>
              <Form.Control type="text" placeholder="Filter by name" className="filterNameTextBox" value={nameFilter} onChange={(e) => setNameFilter(e.target.value)} />
            </Col>
            <Col xs={12} sm={12} md={6} lg={3}>
              <Form.Control type="text" placeholder="Filter by author" className="filterAuthorTextBox" value={authorFilter} onChange={(e) => setAuthorFilter(e.target.value)} />
            </Col>
            <Col xs={4} sm={3} md={4} lg={2}>
              <Form.Check type="checkbox" label="Filter by date" checked={filterByDate} onChange={(e) => setFilterByDate(e.target.checked)} />
            </Col>
            <Col xs={8} sm={6} md={4} lg={2}>
              {filterByDate && <DatePicker dateFormat="yyyy-MM-dd" selected={dateFilter} onChange={(date) => setDateFilter(date)}  className="datePicker"/>}
            </Col>
            <Col xs={12} sm={12} md={2} lg={2}>
              <Button type="submit" variant="primary" className='searchButton'>Filter results</Button>
            </Col>
          </Row>
        </Form.Group>
      </Form>
    </Container>
  );
}

export default SearchBox;
