import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { db } from "./../config/firebaseConfig";
import { Row, Col, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { CopyToClipboard } from "react-copy-to-clipboard";

export default class CreatingStory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      creatorEmail: "",
      participantsEmails: "",
      nextParticipant: { email: "test" },
      storyTitle: "",
      storyText: "",
      submitSuccess: true,
      nextLink: "",
      isUnfold: false,
    };
  }

  handleChange(event) {
    let fieldName = event.target.name;
    let fleldVal = event.target.value;
    this.setState({ ...this.state, [fieldName]: fleldVal });
  }

  handleSubmit = async (event) => {
    event.preventDefault();

    const { creatorEmail, storyTitle, storyText, participantsEmails } = this.state;
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
      secret: this.makeid(8),
      isSubmitted: true,
      submittedOn: new Date(),
    });

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

    const nextParticipant = participants[0];

    this.setState({
      nextLink: `www.tellzy.web.app/story/${docRef.id}/${nextParticipant.secret}`,
      submitSuccess: true,
      nextParticipant,
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
    const { submitSuccess, nextLink, isUnfold, nextParticipant } = this.state;
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
              <div className="d-flex flex-column justify-content-center align-items-center mt-3">
                <h1 className="h1-cs-true">Thank you!</h1>
                {isUnfold && (
                  <>
                    <p>Succesfully copied!</p>
                  </>
                )}
                <CopyToClipboard
                  className="clipboard"
                  text={nextLink}
                  onCopy={() => this.setState({ isUnfold: true })}
                >
                  <span>
                    <Row className="row-cs-true p-3">
                      <p className="mr-5 my-auto copy-cs-true">Copy Link</p>
                      <img src="assets/images/copy.png" />
                    </Row>
                  </span>
                </CopyToClipboard>
                <p className="p-5 p-cs-true text-center">
                  Copy link and send it to <strong>{nextParticipant.email}</strong>. Soon you'll get the whole
                  story!
                </p>
              </div>
            ) : (
              <>
                <h1>Create new story</h1>
                <Form onSubmit={this.handleSubmit}>
                  <Form.Group>
                    <Form.Label>Email address</Form.Label>
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
                    <Form.Label>Participants Emails</Form.Label>
                    <Form.Control
                      required
                      as="textarea"
                      rows="2"
                      name="participantsEmails"
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
                      rows="10"
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
