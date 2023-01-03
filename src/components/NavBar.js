import React from 'react'
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import logo from '../assets/logo.jpg'
import styles from '../styles/NavBar.module.css'
import { NavLink } from "react-router-dom";
import { useCurrentUser, useSetCurrentUser } from '../context/CurrentUser';
import Avatar from './Avatar';
import axios from 'axios';

const NavBar = () => {
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser;

  const handleSignOut = async () => {
    try {
      await axios.post("dj-rest-auth/logout/");
      setCurrentUser(null);
    } catch (err) {
      console.log(err);
    }
  };

  const addPost = (
    <NavLink
      className={styles.NavLink}
      activeClassName={styles.Active}
      to="/posts/create">
        <i className="fa-regular fa-square-plus"></i> Add post
    </NavLink>
  )
  
  const addWine = (
    <NavLink
      className={styles.NavLink}
      activeClassName={styles.Active}
      to="/wine/create">
        <i className="fa-regular fa-square-plus"></i> Add Wine
    </NavLink>
  )
  
  const wineCellar = (
    <NavLink
      className={styles.NavLink}
      activeClassName={styles.Active}
      to="/wine/">
        <i className="fa-regular fa-square-plus"></i> Add post
    </NavLink>
  )

  const addIcons = <>
   <i className="fa-regular fa-square-plus" />
        <NavDropdown title="Add" id="basic-nav-dropdown" className={styles.Navlink}>
          <NavDropdown.Item >{addPost}</NavDropdown.Item>
          <NavDropdown.Item >{addWine}</NavDropdown.Item>
        </NavDropdown>
        </>
  const loggedInNavBar = <>
    <NavLink
      className={styles.NavLink}
      activeClassName={styles.Active} 
      to="/feed">
      <i class="fa-solid fa-stream" />Feed
    </NavLink>
    <NavLink
      className={styles.NavLink}
      activeClassName={styles.Active} 
      to="/wine">
      <i class="fa-solid fa-wine-bottle" />Wine Cellar
    </NavLink>
    <NavLink
      className={styles.NavLink}
      to={`/profiles/${currentUser?.profile_id}`}>
      <Avatar src={currentUser?.profile_image} text="Profile" height={40}/>
    </NavLink>
    <NavLink
      className={styles.NavLink}
      to="/"
      onClick={handleSignOut}>
      <i class="fa-solid fa-right-from-bracket"/>Log out
    </NavLink>
    </>

  const loggedOutNavBar = (
    <>
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
        {addIcons }
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
            {loggedInNavBar}
            {loggedOutNavBar}
            {/* {currentUser ? loggedInNavBar : loggedOutNavBar} */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;