import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { db } from "./../config/firebaseConfig";
import LinkPage from "./LinkPage";
import { Link } from "react-router-dom";
import { Row, Col, Container } from "react-bootstrap";

export default class EditStory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      isError: false,
      hintText: "",
      storyId: "",
      secret: "",
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
    const secret = params.secret;
    this.getStory(storyId);
    if (secret) {
      this.setState({ storyId, secret });
    } else {
      this.setState({ storyId });
    }
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
      // check that secret is valid
      const validParticipant = story.participants.filter(
        (participant) => participant.secret && this.state.secret === participant.secret
      );
      this.setState({ story, isLoading: false, hintText, validParticipant });
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
      this.setState({ error: true });
    }
  }

  checkSecret() {
    // get secret param from URLs
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
    // TODO look for next participant to show their email and generate secret link
    const nextParticipant = { email: "dummy!" };
    // TODO consider end of story
    this.setState({
      nextLink: `www.tellzy.web.app/story/${storyId}/${nextParticipant.secret}`,
      submitSuccess: true,
      nextParticipant,
    });
  };

  render() {
    const { nextLink, submitSuccess, story, isLoading, hintText, secret, nextParticipant } = this.state;

    return (
      <Container className="edit-story">
        <Row className="my-5">
          <Col sm={2}>
            <Link to="/">
              <Button className="btn-home">Home</Button>
            </Link>
          </Col>
          <Col sm={8} className="h-100">
            {isLoading ? (
              <p>Loading...</p>
            ) : (
              <>
                {submitSuccess ? (
                  <LinkPage nextLink={nextLink} nextParticipant={nextParticipant}></LinkPage>
                ) : (
                  <>
                    <h1>{story.storyTitle}</h1>
                    {}
                    {/* STAT STORY */}
                    {secret ? (
                      <Form onSubmit={this.handleSubmit}>
                        <Form.Group>
                          <Form.Label>Previously on "{story.storyTitle}"...</Form.Label>
                          <Form.Control readOnly as="textarea" value={hintText} rows="2" name="hintText" />
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
                    ) : (
                      <div>
                        <p>Here are the participants:</p>
                        <ul>
                          {story.participants.map((participant) => (
                            <li key={participant.email}>
                              {participant.email} - {participant.isSubmitted ? "Submitted" : "Todo"}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </>
                )}
              </>
            )}
          </Col>
          <Col sm={2}></Col>
        </Row>
      </Container>
    );
  }
}
