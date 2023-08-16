import React from 'react';
import { Container } from 'react-bootstrap';

function Header() {
  return (
    <header>
      <Container className='logoContainer'>
      <img src='/logo.png' alt="logo" className='logo'/>
      </Container>

    </header>
  );
}

export default Header;