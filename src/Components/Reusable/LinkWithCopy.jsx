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
      <div className="d-flex flex-column justify-content-center align-items-center my-4">
        <CopyToClipboard className="clipboard" text={link} onCopy={this.setCopied}>
          <span>
            <Row className="row-cs-true p-3">
              <div className="d-flex flex-column align-items-center">
                <p className="mr-3 my-auto copy-cs-true">{text}</p>
                {isCopied ? <>Copied!</> : <>Copy me</>}
              </div>
              {isCopied ? <i className="fas fa-check fa-3x"></i> : <i className="far fa-copy fa-3x"></i>}
              {/* <img src="assets/images/copy.png" /> */}
              {this.props.children}
            </Row>
          </span>
        </CopyToClipboard>
      </div>
    );
  }
}
