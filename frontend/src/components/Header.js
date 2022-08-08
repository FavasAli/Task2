import React from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import {useDispatch, useSelector } from "react-redux";
import {logout} from '../actions/userActions.js'


const Header = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const {  userInfo } = userLogin;

  const dispatch=useDispatch()

  const logoutHandler=()=>{
    dispatch(logout())
  }
  return (
    <Navbar bg="dark" expand="lg">
      <Container>
        <Navbar.Brand style={{ color: "white" }} href="/">
          My-Product
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        {!userInfo ? (
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link style={{ color: "white" }} href="/login">
                Login
              </Nav.Link>
              <Nav.Link style={{ color: "white" }} href="/register">
                Register
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        ) : (
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link style={{ color: "white" }} onClick={logoutHandler}>
                Logout  
              </Nav.Link>

            </Nav>
          </Navbar.Collapse>
        )}
      </Container>
    </Navbar>
  );
};

export default Header;
