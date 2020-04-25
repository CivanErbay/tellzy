import React, { Component } from "react";
import { auth } from "../config/firebaseConfig";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { Col } from "react-bootstrap";
import { Row } from "react-bootstrap";
import "../styling/navBar.css";

export default class NavBar extends Component {
    render() {
        console.log(auth.currentUser);

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
                                        <Nav.Link
                                            className="disabledCursor"
                                            href="#home"
                                        >
                                            Social
                                        </Nav.Link>
                                        <Nav.Link href="#home">
                                            Profile
                                        </Nav.Link>
                                        <Nav.Link href="#link">
                                            Log Out
                                        </Nav.Link>
                                    </Row>
                                </Col>
                            </>
                        ) : (
                            <>
                                <Col sm={4}>
                                    <Row className="justify-content-center">
                                        <Nav.Link href="#home">Log In</Nav.Link>
                                        <Nav.Link href="#link">
                                            Register
                                        </Nav.Link>
                                    </Row>
                                </Col>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}
