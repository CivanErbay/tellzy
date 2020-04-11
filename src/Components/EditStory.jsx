import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { db } from "./../config/firebaseConfig";
import { Row, Col, Container } from "react-bootstrap";

export default class EditStory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      isError: false,
      hintText: "",
      storyId: "",
      story: {},
      submitSuccess: false,
      nextLink: "",
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
      let hintText = story.storyParts.reduce((acc, part) => acc + part.text + " ", "");
      if (hintText.length > 200) hintText = hintText.substring(hintText.length - 100, hintText.length - 1);

      this.setState({ story, isLoading: false, hintText });
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
      this.setState({ error: true });
    }
  }

  handleChange(event) {
    let fieldName = event.target.name;
    let fleldVal = event.target.value;
    this.setState({ ...this.state, [fieldName]: fleldVal });
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    const { storyId, story, storyText } = this.state;
    let storyRef = db.collection("stories").doc(storyId);

    const newStoryPart = {
      // author: creatorEmail,
      timestamp: new Date(),
      text: storyText,
    };

    story.storyParts.push(newStoryPart);

    await storyRef.set({ ...story }, { merge: true }).catch(function (error) {
      console.error("Error adding document: ", error);
      this.setState({ error: true });
      return;
    });

    this.setState({ nextLink: `www.tellzy.web.app/story/${storyId}`, submitSuccess: true });
  };

  render() {
    const { nextLink, submitSuccess, story, isLoading, hintText } = this.state;

    return (
      <Container className="edit-story">
        <Row className="my-5">
          <Col sm={2}></Col>
          <Col sm={8} className="h-100">
            {isLoading && <p>Loading...</p>}

            {submitSuccess ? (
              <div className="d-flex flex-column justify-content-center align-items-center">
                <p>Thank you!</p>
                {nextLink}
              </div>
            ) : (
              <>
                <h2>{story.storyTitle}</h2>
                {/* STAT STORY */}
                <Form onSubmit={this.handleSubmit}>
                  <Form.Group>
                    <Form.Label>Previously on "{story.storyTitle}"</Form.Label>
                    <Form.Control readOnly as="textarea" placeholder={hintText} rows="2" name="hintText" />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Continue your Story!</Form.Label>
                    <Form.Control
                      required
                      as="textarea"
                      placeholder="Once upon a time..."
                      rows="10"
                      name="storyText"
                      onChange={this.handleChange.bind(this)}
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
