import React, { Component } from "react";
import { Row } from "react-bootstrap";

export default class ProgressInfo extends Component {
    render() {
        return (
            <div>
                <Row>
                    <h2>Your Progress</h2>
                    <h3 className="text-center">You are the Author</h3>
                </Row>
            </div>
        );
    }
}
