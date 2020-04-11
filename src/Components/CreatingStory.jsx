import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import firebase from "./../config/firebaseConfig";
import { Row, Col, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

export default class CreatingStory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            creatorEmail: "",
            participantsEmails: "",
            storyTitle: "",
            storyText: "",
            submitSuccess: false,
            nextLink: "",
        };
    }

    handleChange(event) {
        let fieldName = event.target.name;
        let fleldVal = event.target.value;
        this.setState({ form: { ...this.state, [fieldName]: fleldVal } });
    }

    handleSubmit = async (event) => {
        event.preventDefault();

        const {
            creatorEmail,
            storyTitle,
            storyText,
            participantsEmails,
        } = this.state;
        const firstPart = {
            author: creatorEmail,
            timestamp: new Date(),
            text: storyText,
        };
        let participants = participantsEmails.split(/,\s*/g).map((email) => {
            return {
                email,
                secret: this.makeid(8),
                isSubmitted: false,
                submittedOn: null,
            };
        });

        participants.push({
            email: creatorEmail,
            isSubmitted: true,
            submittedOn: new Date(),
        });
        console.log(participants);
        const newStory = {
            creatorEmail,
            storyTitle,
            participants,
            storyParts: [firstPart],
        };

        var db = firebase.firestore();
        let docRef = await db
            .collection("stories")
            .add(newStory)
            .catch(function (error) {
                console.error("Error adding document: ", error);
            });

        console.log("Document written with ID: ", docRef.id);
        this.setState({
            nextLink: `www.tellzy.web.app/story/${docRef.id}`,
            showModal: true,
        });
    };

    makeid(length) {
        var result = "";
        var characters =
            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(
                Math.floor(Math.random() * charactersLength)
            );
        }
        return result;
    }

    handleClose() {
        this.setState({ showModal: false });
    }

    render() {
        const { submitSuccess, nextLink } = this.state;
        return (
            <Container className="create-story">
                <Row className="my-5">
                    <Col sm={2}></Col>
                    <Col sm={8} className="h-100">
                        {submitSuccess ? (
                            <div className="d-flex flex-column justify-content-center align-items-center">
                                <p>Thank you!</p>
                                <a
                                    rel="noopener noreferrer"
                                    href={nextLink}
                                    target="_blank"
                                >
                                    {nextLink}
                                </a>
                            </div>
                        ) : (
                            <>
                                <h2>Creating new story</h2>
                                <Form onSubmit={this.handleSubmit}>
                                    <Form.Group>
                                        <Form.Label>Email address</Form.Label>
                                        <Form.Control
                                            required
                                            type="email"
                                            placeholder="name@example.com"
                                            name="creatorEmail"
                                            onChange={this.handleChange.bind(
                                                this
                                            )}
                                        />
                                    </Form.Group>
                                    {/* Participants */}
                                    <Form.Group>
                                        <Form.Label>
                                            Participants emails
                                        </Form.Label>
                                        <Form.Control
                                            required
                                            as="textarea"
                                            rows="2"
                                            name="participantsEmails"
                                            onChange={this.handleChange.bind(
                                                this
                                            )}
                                        />
                                    </Form.Group>

                                    {/* TITLE */}
                                    <Form.Group>
                                        <Form.Label>Story Title</Form.Label>
                                        <Form.Control
                                            required
                                            as="textarea"
                                            rows="1"
                                            name="storyTitle"
                                            onChange={this.handleChange.bind(
                                                this
                                            )}
                                        />
                                    </Form.Group>
                                    {/* STAT STORY */}
                                    <Form.Group>
                                        <Form.Label>
                                            Start your Story!
                                        </Form.Label>
                                        <Form.Control
                                            required
                                            as="textarea"
                                            placeholder="Once upon a time..."
                                            rows="10"
                                            name="storyText"
                                            onChange={this.handleChange.bind(
                                                this
                                            )}
                                        />
                                    </Form.Group>

                                    <Button type="submit">Submit story</Button>
                                </Form>
                            </>
                        )}
                    </Col>
                    <Col sm={2}></Col>
                </Row>
            </Container>
        );
    }
}
