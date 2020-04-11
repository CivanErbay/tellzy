import React, { Component } from "react";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import { Container } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export default class Landing extends Component {
    render() {
        return (
            <div className="vh-100 w-100">
                <Row className="first-row">
                    <Col></Col>
                    <Col></Col>
                    <Col></Col>
                    <Col className="text-center d-flex align-items-center justify-content-center">
                        <Link to="/story">
                            <Button className="p-3 button-style">
                                New Story
                            </Button>
                        </Link>
                    </Col>
                </Row>
                <Row className="second-row">
                    <Col></Col>
                    <Col>
                        <h1 className="h1 my-4">Tellzy</h1>
                        <div className="wrap">
                            <h3 className="h3">collective storytelling.</h3>
                            <h3>share your imagination.</h3>
                            <h3>simple & easy.</h3>
                        </div>
                    </Col>
                    <Col></Col>
                </Row>
            </div>
        );
    }
}
