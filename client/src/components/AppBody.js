import { Container, Row, Col } from 'react-bootstrap';
import BookList from './BookList';
import SearchBox from './SearchBox';
import { useState } from 'react';

function AppBody() {
  const [query, setQuery] = useState('');

  const onSearch = (query) => {
    setQuery(query);
  };

  return (
    <div>
      <Container fluid>
        <Row>
          <Col>
            <SearchBox onSearch={onSearch} />
          </Col>
        </Row>
        <br />
        <Row>
          <Col>
            <BookList filters={{ query }} />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default AppBody;
