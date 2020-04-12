import React, { Component } from "react";
import { Row, Col, Container } from "react-bootstrap";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { db } from "./../config/firebaseConfig";

export default class ResultStory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            isError: false,
            story: {},
            isUnfold: false,
            isUnfold2: false,
        };
    }

    render() {
        const { isUnfold, isUnfold2 } = this.state;
        const { nextLink, nextParticipant } = this.props;

        return (
            <div>
                <div className="d-flex flex-column justify-content-center align-items-center mt-3">
                    {
                        <>
                            <h1 className="h1-cs-true">Thank you!</h1>
                            <Row className="wrap-links-linkpage">
                                <div className="d-flex flex-column justify-content-center align-items-center">
                                    <CopyToClipboard
                                        className="clipboard"
                                        text={nextLink}
                                        onCopy={() =>
                                            this.setState({ isUnfold: true })
                                        }
                                    >
                                        <span>
                                            <Row className="row-cs-true p-3">
                                                <p className="mr-3 my-auto copy-cs-true">
                                                    Copy Story Link
                                                </p>
                                                <img src="assets/images/copy.png" />
                                            </Row>
                                        </span>
                                    </CopyToClipboard>
                                    {isUnfold && (
                                        <>
                                            <p className="mt-3">
                                                Succesfully copied!
                                            </p>
                                        </>
                                    )}
                                </div>
                                <div className="d-flex flex-column justify-content-center align-items-center">
                                    <CopyToClipboard
                                        className="clipboard"
                                        text={ResultStory}
                                        onCopy={() =>
                                            this.setState({ isUnfold2: true })
                                        }
                                    >
                                        <span>
                                            <Row className="row-cs-true p-3 ml-5">
                                                <p className="mr-3 my-auto copy-cs-true">
                                                    Copy Result Link
                                                </p>
                                                <img src="assets/images/copy.png" />
                                            </Row>
                                        </span>
                                    </CopyToClipboard>
                                    {isUnfold2 && (
                                        <>
                                            <p className="mt-3">
                                                Succesfully copied!
                                            </p>
                                        </>
                                    )}
                                </div>
                            </Row>
                            <p className="p-5 p-cs-true text-center">
                                <b>Important:</b> Copy the <u>Story Link</u> and
                                send it to{" "}
                                <strong>{nextParticipant.email}</strong>.{" "}
                                <br></br> Soon you'll get the whole story!
                            </p>
                        </>
                    }
                </div>
            </div>
        );
    }
}
