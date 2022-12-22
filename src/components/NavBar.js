import React from 'react'
import { Navbar, Container, Nav } from 'react-bootstrap';

const NavBar = () => {
  return (
    <Navbar expand="md" fixed="top">
      <Container>
        <Navbar.Brand>WineryPals</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto ">
            <Nav.Link href="#home">
            <i className="fas fa-home"/>Home
            </Nav.Link>
            <Nav.Link href="#link">
            <i class="fa-solid fa-wine-bottle" />Feed
            </Nav.Link>
            <Nav.Link>
              <i className="fas fa-sign-in-alt"/>Sign in
            </Nav.Link>
            <Nav.Link>
              <i className="fas fa-user-plus"/>Sign up
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;