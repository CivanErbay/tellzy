import React, { Component } from "react";
import auth from "../actions/auth";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import Nav from "react-bootstrap/Nav";
import Modal from "react-bootstrap/Modal";
import SignInScreen from "./Reusable/SignInScreen";
import "../styling/navBar.css";

export default class NavBar extends Component {
  state = {
    showSignInScreen: false,
  };

  handleClose = () => this.setState({ showSignInScreen: false });
  handleShow = () => this.setState({ showSignInScreen: true });

  render() {
    const { showSignInScreen } = this.state;

    const signInModal = (
      <Modal show={showSignInScreen} onHide={this.handleClose}>
        <Modal.Body>
          <SignInScreen />
        </Modal.Body>
      </Modal>
    );

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
                <Button onClick={this.handleShow}>FIREBASE</Button>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
        {signInModal}
      </Navbar>
    );
  }
}
