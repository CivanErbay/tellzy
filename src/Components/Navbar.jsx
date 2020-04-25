import React, { Component } from "react";
import { auth } from "../config/firebaseConfig";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import "../styling/navBar.css";

export default class NavBar extends Component {
  render() {
    console.log(auth.currentUser);

    return (
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#link">How To</Nav.Link>

            <Navbar.Brand href="#home">TELLZY style me</Navbar.Brand>
            {auth.currentUser ? (
              <>
                <Nav.Link href="#home">Social</Nav.Link>
                <Nav.Link href="#home">Profile</Nav.Link>
                <Nav.Link href="#link">Log Out</Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link href="#home">Log In</Nav.Link>
                <Nav.Link href="#link">Register</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
