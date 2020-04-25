import React, { Component } from "react";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import { Container } from "react-bootstrap";
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
              <h1>Tellzy</h1>
              <div className="wrap">
                <h3 className="h3-landing">collective storytelling.</h3>
                <h3 className="h3-landing">share your imagination.</h3>
                <h3 className="h3-landing">simple & exciting.</h3>
                <div className="landing-quote">
                  <i> “There is no greater agony than bearing an untold story inside you.” </i> <br />
                  <p className="text-right">
                    <b> - Maya Angelou</b>
                  </p>
                </div>
              </div>
            </div>
          </Col>
          <Col md>
            <Link to="/story">
              <Button className="sm-hide">New Story</Button>
            </Link>
          </Col>
        </Row>
        <Row className="second-part">
          <Col md className="mt-auto text-right">
            <Button className="sm-hide" onClick={() => scroll.scrollToTop()}>
              Up
            </Button>
          </Col>
          <Col md={7} className="text-center d-flex flex-column align-items-center justify-content-between">
            <Row className="how-to">
              <div className="mr-auto">
                <h2>
                  <b>How to</b>
                </h2>
              </div>
              <div className="wrap text-left small-font">
                <h3 className="mt-4 mb-4 small-font">
                  1. Start a <u>New Story</u> and invite some friends
                </h3>
                <h3 className="small-font">
                  2. Send the <u>Edit Link</u> to your next buddy
                </h3>
                <h3 className="mt-4 mb-4 small-font">
                  3. Check out your adventure at your <u>Story Link!</u>
                </h3>
              </div>
              <div className="mt-auto">
                <Link to="/policy">Policy & Impressum</Link>
              </div>
            </Row>
          </Col>
          <Col md className="mt-auto">
            <Link to="/story">
              <Button>New Story</Button>
            </Link>
          </Col>
        </Row>
      </>
    );
  }
}
