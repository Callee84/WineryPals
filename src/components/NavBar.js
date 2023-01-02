import React from 'react'
import { Navbar, Container, Nav } from 'react-bootstrap';
import logo from '../assets/logo.jpg'
import styles from '../styles/NavBar.module.css'
import { NavLink } from "react-router-dom";
import { useCurrentUser } from '../context/CurrentUser';

const NavBar = () => {
  const currentUser = useCurrentUser();

  const loggedInNavBar = <>{currentUser?.username}</>
  const loggedOutNavBar = (
    <>
    <NavLink
      className={styles.NavLink}
        activeClassName={styles.Active} 
        to="/signin">
        <i className="fas fa-sign-in-alt"/>Sign in
    </NavLink>
    <NavLink
      className={styles.NavLink}
      activeClassName={styles.Active} 
      to="/signup">
      <i className="fas fa-user-plus"/>Sign up
    </NavLink>
    </>
  );


  return (
    <Navbar className={styles.NavBar} expand="md" fixed="top">
      <Container>
        <NavLink to="/">
        <Navbar.Brand><img src={logo} alt="logo" height="60" />
        </Navbar.Brand>
        </NavLink>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto ">
            <NavLink
            exact
            className={styles.NavLink}
            activeClassName={styles.Active} 
            to="/">
            <i className="fas fa-home"/>Home
            </NavLink>
            <NavLink
            className={styles.NavLink}
            activeClassName={styles.Active} 
            to="/feed">
            <i class="fa-solid fa-comment-dots" />Feed
            </NavLink>
            <NavLink
            className={styles.NavLink}
            activeClassName={styles.Active} 
            to="/wine">
            <i class="fa-solid fa-wine-bottle" />Wine
            </NavLink>
            {currentUser ? loggedInNavBar : loggedOutNavBar}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;