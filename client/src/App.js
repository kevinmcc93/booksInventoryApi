import { Container, Row, Col } from 'react-bootstrap';
import Header from './components/Header';
import Footer from './components/Footer';
import AppBody from './components/AppBody';

function App() {

  return (
    <div>
      <Container fluid>
        <Row>
          <Col>
            <Header />
          </Col>
        </Row>
        <Row>
          <Col>
            <AppBody />
          </Col>
        </Row>
        <Row>
          <Footer />
        </Row>
      </Container>
    </div>
  );
}

export default App;

