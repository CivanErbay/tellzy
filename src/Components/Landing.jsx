import React, { Component } from "react";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import { Container } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { animateScroll as scroll } from "react-scroll";

export default class Landing extends Component {
    render() {
        return (
            <>
                <div className="vh-100 w-100 mobile-vh">
                    <Row className="first-row">
                        <Col></Col>
                        <Col></Col>
                        <Col></Col>
                        <Col className="text-center d-flex align-items-center justify-content-center">
                            <Link to="/story">
                                <Button className="new-story-btn sm">
                                    New Story
                                </Button>
                            </Link>
                        </Col>
                    </Row>
                    <Row className="second-row">
                        <Col></Col>
                        <Col>
                            <div className="small-padding d-flex flex-wrap">
                                <h1 className="h1 my-4">Tellzy</h1>
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
                                </div>
                            </div>
                        </Col>
                        <Col> </Col>
                    </Row>

                    <Row className="landing-third-row d-flex flex-column align-items-center justify-content-center ">
                        <p className="landing-quote">
                            <i>
                                {" "}
                                “There is no greater agony than bearing an
                                untold story inside you.”{" "}
                            </i>{" "}
                            ― <b>Maya Angelou</b>
                        </p>
                        <div className="arrow display-none"></div>
                    </Row>
                </div>
                <div className="vh-100 w-100 div-landing-part2">
                    <Row className="row-landing-part2">
                        <Col
                            className="d-flex flex-column justify-content-end"
                            sm={2}
                        ></Col>
                        <Col
                            sm={8}
                            className="text-center d-flex align-items-center justify-content-center"
                        >
                            <div className="d-flex flex-wrap">
                                <div>
                                    <h1 className="h1-landing-part2 mr-5">
                                        <b>How to</b>
                                    </h1>
                                </div>
                                <div className="wrap text-left m-4 small-font">
                                    <h3 className="mt-4 mb-4 small-font">
                                        1. Start a <u>New Story</u> and invite
                                        some friends
                                    </h3>
                                    <h3 className="small-font">
                                        2. Send the <u>Edit Link</u> to your
                                        next buddy
                                    </h3>
                                    <h3 className="mt-4 mb-4 small-font">
                                        3. Check out your adventure at your{" "}
                                        <u>Story Link!</u>
                                    </h3>
                                </div>
                            </div>
                        </Col>
                        <Col sm={2}></Col>
                    </Row>

                    <Row className="first-row">
                        <Col className="text-center d-flex align-items-center justify-content-center">
                            <Button
                                className="btn-up sm"
                                onClick={() => scroll.scrollToTop()}
                            >
                                <b>Up</b>
                            </Button>
                        </Col>
                        <Col></Col>
                        <Col></Col>
                        <Col className="text-center d-flex align-items-center justify-content-center">
                            <Link to="/story">
                                <Button className="new-story-btn">
                                    New Story
                                </Button>
                            </Link>
                        </Col>
                    </Row>
                </div>
            </>
        );
    }
}
