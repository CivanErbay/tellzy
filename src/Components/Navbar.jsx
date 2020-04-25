import React, { Component } from "react";
import auth, { signOut } from "../actions/auth";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { Col, Row } from "react-bootstrap";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import SignInScreen from "./Reusable/SignInScreen";
import "../styling/navBar.css";

export default class NavBar extends Component {
    state = {
        showSignInScreen: false,
        user: null,
    };

    componentDidMount = () => {
        auth.onAuthStateChanged(async (user) => {
            if (user) {
                this.setState({ user });
                // let userData = await getUserData(user.uid);
                // this.setState({ userData });
            } else {
                this.setState({ user, userData: null });
            }
        });
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
                    <Nav className="mx-auto w-100 text-center">
                        <Col
                            sm={4}
                            className="d-flex justify-content-center align-items-center"
                        >
                            <Nav.Link href="/#home">Home</Nav.Link>
                            <Nav.Link href="/#how-to">How To</Nav.Link>
                        </Col>

                        <Col sm={4}>
                            <Navbar.Brand href="/#home" className="sm-hide">
                                TELLZY
                            </Navbar.Brand>
                        </Col>
                        <Col
                            lg={4}
                            className="d-flex justify-content-center align-items-center"
                        >
                            {auth.currentUser ? (
                                <>
                                    <Nav.Link
                                        className="disabledCursor"
                                        href="#social"
                                    >
                                        Social
                                    </Nav.Link>
                                    <Nav.Link href="/main#home">
                                        Overview
                                    </Nav.Link>
                                    <OverlayTrigger
                                        trigger="click"
                                        placement="bottom"
                                        overlay={
                                            <Popover>
                                                <Popover.Title as="h3">
                                                    Sure?
                                                </Popover.Title>
                                                <Popover.Content>
                                                    <Button
                                                        onClick={signOut}
                                                        href="/#home"
                                                    >
                                                        Log Out
                                                    </Button>
                                                </Popover.Content>
                                            </Popover>
                                        }
                                    >
                                        <Nav.Link>Log Out</Nav.Link>
                                    </OverlayTrigger>
                                </>
                            ) : (
                                <>
                                    <Nav.Link href="" onClick={this.handleShow}>
                                        Log In
                                    </Nav.Link>
                                    <Nav.Link href="" onClick={this.handleShow}>
                                        Register
                                    </Nav.Link>
                                </>
                            )}
                        </Col>
                    </Nav>
                </Navbar.Collapse>
                {signInModal}
            </Navbar>
        );
    }
}
