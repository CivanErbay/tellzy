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
import { animateScroll as scroll } from "react-scroll";
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
        const { showSignInScreen, user } = this.state;

        const signInModal = (
            <Modal show={showSignInScreen} onHide={this.handleClose}>
                <Modal.Body>
                    <SignInScreen />
                </Modal.Body>
            </Modal>
        );

        return (
            <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mx-auto w-100 text-center ">
                        <Col
                            sm={4}
                            className="d-flex justify-content-center align-items-center mobile-column"
                        >
                            <Nav.Link href="/#home">Home</Nav.Link>
                            <Nav.Link
                                href="/#how-to"
                                onClick={() => scroll.scrollToBottom()}
                            >
                                How To
                            </Nav.Link>
                        </Col>

                        <Col sm={4}>
                            <Navbar.Brand href="/#home" className="sm-hide">
                                <img src="/assets/images/logo-white-gradient.png"></img>
                            </Navbar.Brand>
                        </Col>
                        <Col
                            lg={4}
                            className="d-flex justify-content-center align-items-center mobile-column"
                        >
                            {auth.currentUser ? (
                                <>
                                    <Nav.Link href="/story">New Story</Nav.Link>
                                    <Nav.Link href="/main#home">
                                        {auth.currentUser.displayName} Overview
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
                                <div className="mobile-column bb d-flex align-items center justify-content-center mx-auto">
                                    <Nav.Link href="" onClick={this.handleShow}>
                                        Log In
                                    </Nav.Link>
                                    <Nav.Link href="" onClick={this.handleShow}>
                                        Register
                                    </Nav.Link>
                                </div>
                            )}
                        </Col>
                    </Nav>
                </Navbar.Collapse>
                {signInModal}
            </Navbar>
        );
    }
}
