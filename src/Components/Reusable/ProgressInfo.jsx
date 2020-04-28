import React, { Component } from "react";
import { Row } from "react-bootstrap";

export default class ProgressInfo extends Component {
  render() {
    const { points } = this.props.userData;
    return (
      <div>
        <Row className="d-flex flex-column text-left">
          <h2>Your Progress</h2>
          <h3 className="ml-5">
            Your points: <b>{points}</b>
          </h3>

          <h3 className="ml-5">
            Next Rank: <b>78%</b>
          </h3>
        </Row>
      </div>
    );
  }
}
