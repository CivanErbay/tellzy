import React, { Component } from "react";
import { Row, Col, Container } from "react-bootstrap";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { db } from "./../config/firebaseConfig";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
export default class ResultStory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            isError: false,
            storyFinished: false,
            story: {},
        };
    }

    componentDidMount() {
        const {
            match: { params },
        } = this.props;

        const storyId = params.storyId;
        this.getStory(storyId);
        this.setState({ storyId });
    }

    async getStory(storyId) {
        let storyRef = await db
            .collection("stories")
            .doc(storyId)
            .get()
            .catch(function (error) {
                console.log("Error getting document:", error);
                this.setState({ error: true });
            });

        if (storyRef.exists) {
            const story = storyRef.data();
            const storyFinished = story.participants.every(
                (participant) => participant.isSubmitted
            );
            this.setState({ story, isLoading: false, storyFinished });
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
            this.setState({ error: true });
        }
    }

    render() {
        // story = {storyTitle, participants: [{email, isSubmitted}], storyParts: [{author, text}]}
        const { story, isLoading, storyFinished } = this.state;

        return (
            <div className="w-100">
                <Row>
                    <Col>
                        <Link to="/">
                            <Button className="btn-home">Home</Button>
                        </Link>
                    </Col>
                    <Col sm={8} className="h-100 m-0">
                        {isLoading ? (
                            <p>Loading...</p>
                        ) : (
                            <div className="d-flex flex-column justify-content-center align-items-center result-true-div">
                                <h1 className="h1-result-true text-capitalize mt-4 mb-5">
                                    Finished Story
                                </h1>
                                <p>
                                    {storyFinished ? (
                                        <>
                                            <div>
                                                <p className="result-true-text">
                                                    <h2 className="text-center mt-5 mb-3 text-capitalize">
                                                        {story.storyTitle}
                                                    </h2>{" "}
                                                    <p className="p-5">
                                                        {story.storyParts.reduce(
                                                            (acc, curr) =>
                                                                acc +
                                                                curr.text +
                                                                "\n",
                                                            ""
                                                        )}
                                                    </p>
                                                </p>
                                            </div>
                                        </>
                                    ) : (
                                        <div>
                                            <p>Participant statistics:</p>
                                            <ul>
                                                {story.participants.map(
                                                    (participant) => (
                                                        <li
                                                            key={
                                                                participant.email
                                                            }
                                                        >
                                                            {participant.email}{" "}
                                                            -{" "}
                                                            {participant.isSubmitted
                                                                ? "Submitted"
                                                                : "Incomplete"}
                                                        </li>
                                                    )
                                                )}
                                            </ul>

                                            <p>
                                                "Still waiting for participants
                                                to finish..."
                                            </p>
                                        </div>
                                    )}
                                </p>
                            </div>
                        )}
                    </Col>
                    <Col></Col>
                </Row>
            </div>
        );
    }
}
