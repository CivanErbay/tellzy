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
    //TestProject Link-piece 5YEWZymvKZnI7T3EFekm/GExnTn9W
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
                                <h1 className="h1-result-true">Result</h1>
                                <p>
                                    {storyFinished
                                        ? "The story is finished"
                                        : "Still waiting for a participant"}
                                </p>
                                <textarea className="w-75 result-true-text">
                                    {story.storyParts.reduce(
                                        (acc, curr) => acc + curr.text + "\n",
                                        ""
                                    )}
                                </textarea>
                            </div>
                        )}
                    </Col>
                    <Col></Col>
                </Row>
            </div>
        );
    }
}
