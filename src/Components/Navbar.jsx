import React, { Component } from "react";
import auth from "../actions/auth";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { Col } from "react-bootstrap";
import { Row } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import SignInScreen from "./Reusable/SignInScreen";
import "../styling/navBar.css";

export default class NavBar extends Component {
  state = {
    showSignInScreen: false,
  };

  componentDidMount = () => {};

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
          <Nav className="mx-auto w-100 text-center">
            <Col sm={4}>
              <Row className="justify-content-center">
                <Nav.Link href="#home">Home</Nav.Link>
                <Nav.Link href="#link">How To</Nav.Link>
              </Row>
            </Col>

            <Col sm={4}>
              <Navbar.Brand href="#home">TELLZY</Navbar.Brand>
            </Col>
            {auth.currentUser ? (
              <>
                <Col lg={4}>
                  <Row className="justify-content-around">
                    <Nav.Link className="disabledCursor" href="#home">
                      Social
                    </Nav.Link>
                    <Nav.Link href="#home">Profile</Nav.Link>
                    <Nav.Link href="#link">Log Out</Nav.Link>
                  </Row>
                </Col>
              </>
            ) : (
              <>
                <Col sm={4}>
                  <Row className="justify-content-center">
                    <Nav.Link href="#home" onClick={this.handleShow}>
                      Log In
                    </Nav.Link>
                    <Nav.Link href="#link">Register</Nav.Link>
                  </Row>
                </Col>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
        {signInModal}
      </Navbar>
    );
  }
}
