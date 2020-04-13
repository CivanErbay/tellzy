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
        <div className="vh-100 w-100">
          <Row className="first-row">
            <Col></Col>
            <Col></Col>
            <Col></Col>
            <Col className="text-center d-flex align-items-center justify-content-center">
              <Link to="/story">
                <Button className="new-story-btn">New Story</Button>
              </Link>
            </Col>
          </Row>
          <Row className="second-row">
            <Col></Col>
            <Col>
              <h1 className="h1 my-4">Tellzy</h1>

              <p className="result-true-text">
                <div className="wrap">
                  <h3 className="h3">collective storytelling.</h3>
                  <h3>share your imagination.</h3>
                  <h3>simple & exciting.</h3>
                </div>
              </p>
            </Col>
            <Col></Col>
          </Row>
          <Row className="landing-third-row">
            {" "}
            <div className="arrow"></div>
          </Row>
        </div>
        <div className="vh-100 w-100 div-landing-part2">
          <Row className="row-landing-part2">
            <Col className="d-flex flex-column justify-content-end" sm={2}></Col>
            <Col sm={8} className="text-center d-flex align-items-center justify-content-center">
              <h1 className="h1-landing-part2 mr-5">
                <b>How to</b>
              </h1>
              <div className="wrap text-left">
                <h3 className="mt-4 mb-4">1. Start a New Story and invite some friends</h3>
                <h3>2. Share the Edit Link to your next buddy</h3>
                <h3 className="mt-4 mb-4">3. Check out your mad adventure at your Story Link!</h3>
              </div>
            </Col>
            <Col sm={2}>
              <Link to="/story">
                <Button className="new-story-btn">New Story</Button>
              </Link>
            </Col>
          </Row>

          <Button className="btn-up" onClick={() => scroll.scrollToTop()}>
            <b>Up</b>
          </Button>
        </div>
      </>
    );
  }
}
