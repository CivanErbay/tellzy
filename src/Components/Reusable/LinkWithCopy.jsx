import React, { Component } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Row } from "react-bootstrap";

export default class LinkWithCopy extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isCopied: false,
    };
  }

  setCopied = () => {
    this.setState({ isCopied: true });
  };

  render() {
    const { isCopied } = this.state;
    const { link, text } = this.props;
    return (
      <div className="w-50 mx-auto btn d-flex flex-column justify-content-center align-items-center my-4">
        <CopyToClipboard className="clipboard" text={link} onCopy={this.setCopied}>
          <Row className="p-3">
            <div className="d-flex flex-column align-items-center">
              <p className="mr-3 my-auto">{text}</p>
              {isCopied ? <>Copied!</> : <>Copy me</>}
            </div>
            {isCopied ? <i className="fas fa-check fa-2x"></i> : <i className="far fa-copy fa-2x"></i>}
            {/* <img src="assets/images/copy.png" /> */}
            {this.props.children}
          </Row>
        </CopyToClipboard>
      </div>
    );
  }
}
