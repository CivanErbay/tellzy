import React, { Component } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Row } from "react-bootstrap";

export default class LinkWithCopy extends Component {
  render() {
    const { link, text, isUnfold, setUnfold } = this.props;
    return (
      <div className="d-flex flex-column justify-content-center align-items-center my-4">
        <CopyToClipboard className="clipboard" text={link} onCopy={setUnfold}>
          <span>
            <Row className="row-cs-true p-3">
              <div className="d-flex flex-column align-items-center">
                <p className="mr-3 my-auto copy-cs-true">{text}</p>
                {isUnfold ? <>Copied!</> : <>Copy me</>}
              </div>
              {isUnfold ? <i className="fas fa-check fa-3x"></i> : <i className="far fa-copy fa-3x"></i>}
              {/* <img src="assets/images/copy.png" /> */}
              {this.props.children}
            </Row>
          </span>
        </CopyToClipboard>
      </div>
    );
  }
}
