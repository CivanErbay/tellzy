import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import firebase from "./../config/firebaseConfig";
import { Row, Col, Container } from "react-bootstrap";

export default class CreatingStory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {},
    };
  }

  handleChange(event) {
    let fieldName = event.target.name;
    let fleldVal = event.target.value;
    this.setState({ form: { ...this.state.form, [fieldName]: fleldVal } });
  }

  handleSubmit = (event) => {
    const { creatorEmail, storyTitle, storyText } = this.state.form;
    const firstPart = {
      author: creatorEmail,
      timestamp: new Date(),
      text: storyText,
    };
    event.preventDefault();
    const newStory = {
      creatorEmail,
      storyTitle,
      participants: [creatorEmail, "placeholder@web.de", "anotherPLace@fad.com"],
      storyParts: [firstPart],
    };
    console.log("Submit me!");
    // save form as new story

    var db = firebase.firestore();
    db.collection("stories")
      .add(newStory)
      .then(function (docRef) {
        console.log("Document written with ID: ", docRef.id);
      })
      .catch(function (error) {
        console.error("Error adding document: ", error);
      });
  };

  render() {
    return (
      <Container className="create-story">
        <Row>
          <Col sm={2}></Col>
          <Col sm={8}>
            <h2>Creating new story</h2>
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
                <Form.Label>Participants emails</Form.Label>
                <Form.Control
                  required
                  as="textarea"
                  rows="2"
                  name="participantEmails"
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
                  rows="10"
                  name="storyText"
                  onChange={this.handleChange.bind(this)}
                />
              </Form.Group>

              <Button type="submit">Submit story</Button>
            </Form>
          </Col>
          <Col sm={2}></Col>
        </Row>
      </Container>
    );
  }
}
