import React, { Component } from "react";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { animateScroll as scroll } from "react-scroll";
import "../styling/mainview.css";
import { render } from "@testing-library/react";

export default class MainView extends Component {
    render() {
        return (
            <div className="mainview w-100 d-flex">
                <Col sm={1}>Test</Col>
                <Col sm={8}>Test</Col>
                <Col sm={4}>Test</Col>
                <Col sm={1}>TEst</Col>
            </div>
        );
    }
}
