import React, { Component } from "react";
import { Col } from "react-bootstrap";
import "../styling/mainview.css";

export default class MainView extends Component {
  render() {
    return (
      <div className="mainview w-100 d-flex">
        Welcome to your main page!
        <Col sm={1}>Test</Col>
        <Col sm={8}>Test</Col>
        <Col sm={4}>Test</Col>
        <Col sm={1}>TEst</Col>
      </div>
    );
  }
}
