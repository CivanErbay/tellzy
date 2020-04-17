import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { db } from "./../config/firebaseConfig";
import { Row, Col, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import LinkPage from "./LinkPage";

export default class CreatingStory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      story: {},
      storyId: "",
      submitSuccess: false,
      isUnfold: false,
    };
  }

  handleChange(event) {
    let fieldName = event.target.name;
    let fleldVal = event.target.value;
    this.setState({
      story: { ...this.state.story, [fieldName]: fleldVal },
    });
  }

  handleSubmit = async (event) => {
    event.preventDefault();

    const {
      story: { creatorEmail, storyTitle, storyText, participantsEmails },
    } = this.state;

    const firstPart = {
      author: creatorEmail,
      timestamp: new Date(),
      text: storyText,
    };

    let participants = [
      {
        email: creatorEmail,
        secret: this.makeid(8),
        isSubmitted: true,
        submittedOn: new Date(),
      },
    ];

    const otherParticipants = participantsEmails.split(/[,|\s|\n]+/g).map((email) => {
      return {
        email,
        secret: this.makeid(8),
        isSubmitted: false,
        submittedOn: null,
      };
    });

    const nextParticipant = otherParticipants[0];
    // add all participants in one array
    participants = participants.concat(otherParticipants);

    const newStory = {
      creatorEmail,
      storyTitle,
      participants,
      storyParts: [firstPart],
    };

    let docRef = await db
      .collection("stories")
      .add(newStory)
      .catch(function (error) {
        console.error("Error adding document: ", error);
        return;
      });

    this.setState({
      submitSuccess: true,
      nextParticipant,
      storyId: docRef.id,
    });
  };

  makeid(length) {
    var result = "";
    var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  render() {
    const { submitSuccess, nextParticipant, story, storyId } = this.state;

    return (
      <div className="create-story">
        <Row className="my-5">
          <Col sm={2}>
            <Link to="/">
              <Button className="btn-home">Home</Button>
            </Link>
          </Col>
          <Col sm={8} className="h-100">
            {submitSuccess ? (
              <>
                <h1 className="h1-es-false text-center text-capitalize mb-3">
                  <u>{story.storyTitle}.</u>
                </h1>
                <h2 className="text-center h2-cs-false"></h2>
                <LinkPage story={story} storyId={storyId} nextParticipant={nextParticipant}></LinkPage>
              </>
            ) : (
              <>
                <h1 className="h1-cs-false text-center">Create new story.</h1>
                <Form className="form-cs-false" onSubmit={this.handleSubmit}>
                  <Form.Group>
                    <Form.Label>Your E-Mail</Form.Label>
                    <Form.Control
                      required
                      type="email"
                      placeholder="name@example.com"
                      name="creatorEmail"
                      onChange={this.handleChange.bind(this)}
                    />
                  </Form.Group>
                  {/* Participants */}
                  <Form.Group>
                    <Form.Label>Authors</Form.Label>
                    <Form.Control
                      required
                      as="textarea"
                      rows="2"
                      name="participantsEmails"
                      placeholder="Write down the name of your buddies. Repeat them if you like."
                      onChange={this.handleChange.bind(this)}
                    />
                  </Form.Group>
                  {/* TITLE */}
                  <Form.Group>
                    <Form.Label>Story Title</Form.Label>
                    <Form.Control
                      required
                      as="textarea"
                      rows="1"
                      placeholder="Something memorable but descriptive"
                      name="storyTitle"
                      onChange={this.handleChange.bind(this)}
                    />
                  </Form.Group>
                  {/* STAT STORY */}
                  <Form.Group>
                    <Form.Label>Start your Story!</Form.Label>
                    <Form.Control
                      required
                      as="textarea"
                      placeholder="Once upon a time..."
                      rows="5"
                      name="storyText"
                      onChange={this.handleChange.bind(this)}
                    />
                  </Form.Group>

                  <Row className="d-flex justify-content-between p-3">
                    <Button className="go-btn-cs-false" type="submit">
                      Start Journey
                    </Button>
                  </Row>
                </Form>
              </>
            )}
          </Col>
          <Col sm={2}></Col>
        </Row>
      </div>
    );
  }
}
