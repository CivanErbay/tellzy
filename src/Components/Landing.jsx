import React, { Component } from "react";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { animateScroll as scroll } from "react-scroll";
import "../styling/landing.css";

export default class Landing extends Component {
    render() {
        return (
            <>
                <Row className="first-part">
                    <Col md></Col>
                    <Col md={7}>
                        <div className="d-flex flex-column align-items-center justify-content-center">
                            <img
                                className="sm-show"
                                src="/assets/images/logo-white.png"
                            ></img>
                            <h1 className="h1 sm-hide">Tellzy</h1>
                            <div className="wrap">
                                <h3 className="h3-landing">
                                    collective storytelling.
                                </h3>
                                <h3 className="h3-landing">
                                    share your imagination.
                                </h3>
                                <h3 className="h3-landing">
                                    simple & exciting.
                                </h3>
                                <div className="landing-quote sm-hide">
                                    <i>
                                        {" "}
                                        “There is no greater agony than bearing
                                        an untold story inside you.”{" "}
                                    </i>{" "}
                                    <br />
                                    <p className="text-right">
                                        <b> - Maya Angelou</b>
                                    </p>
                                </div>
                                <h1 className="text-center sm-show mobile-h1">
                                    Tellzy
                                </h1>
                            </div>
                        </div>
                    </Col>
                    <Col md></Col>
                </Row>
                <Row className="second-part">
                    <Col md className="mt-auto text-right">
                        <Button
                            className="sm-hide"
                            onClick={() => scroll.scrollToTop()}
                        >
                            Up
                        </Button>
                    </Col>
                    <Col
                        md={7}
                        className="text-center d-flex flex-column align-items-center justify-content-center"
                    >
                        <Row id="how-to" className="how-to">
                            <div className="d-flex flex-column justify-content-start">
                                <div className="mr-auto">
                                    <h2>
                                        <b>How to</b>
                                    </h2>
                                </div>
                                <Row className="howto">
                                    <div className="d-flex align-items-center">
                                        {/* <h3 className="mr-2">I</h3> */}
                                        <p>
                                            <b>What is Tellzy? </b> <br />{" "}
                                            Tellzy is a tool for writing storys
                                            together with your friends. Each of
                                            the "authors" are continuing one
                                            after another.
                                        </p>
                                        <img
                                            className=""
                                            src="/assets/images/pen.png"
                                        ></img>
                                    </div>
                                </Row>
                                <Row className="howto">
                                    <div className="d-flex align-items-center">
                                        <img
                                            className=""
                                            src="/assets/images/note.png"
                                        ></img>
                                        <p>
                                            <b>Get started!</b> <br /> Register,
                                            start a New Story and invite your
                                            friends.{" "}
                                        </p>
                                    </div>
                                </Row>
                                <Row className="howto">
                                    <div className="d-flex align-items-center">
                                        <p>
                                            <b>Story Progress</b> <br />
                                            According to experience it takes a
                                            while until all authors finished
                                            their part. Meanwhile, keep progress
                                            in your profile.
                                        </p>
                                        <img
                                            className=""
                                            src="/assets/images/pen2.png"
                                        ></img>
                                    </div>
                                </Row>
                                <Row className="howto">
                                    <div className="d-flex align-items-center">
                                        <img
                                            className=""
                                            src="/assets/images/friends.png"
                                        ></img>
                                        <p>
                                            <b>Highlight </b>
                                            <br />
                                            Once the story is finished,
                                            everybody is excited about the
                                            result. Share the Story with the
                                            other authors!
                                        </p>
                                    </div>
                                </Row>

                                <div className="mt-auto">
                                    <Link to="/policy">Policy & Impressum</Link>
                                </div>
                            </div>
                        </Row>
                    </Col>
                    <Col md className="mt-auto">
                        <Link to="/story" onClick={this.handleShow}>
                            <Button>New Story</Button>
                        </Link>
                    </Col>
                </Row>
            </>
        );
    }
}
