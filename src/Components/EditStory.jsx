import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { db } from "./../config/firebaseConfig";
import LinkPage from "./LinkPage";
import { Link } from "react-router-dom";
import { Row, Col, Container } from "react-bootstrap";
import { isCompositeComponentWithType } from "react-dom/test-utils";
import { isEmpty } from "lodash";

export default class EditStory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      validParticipant: {},
      hintText: "",
      storyId: "",
      secret: "",
      story: {},
      submitSuccess: false,
      nextLink: "",
      nextParticipant: {},
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
      // check that secret is valid
      const validParticipant = story.participants.filter(
        (participant) => participant.secret && this.state.secret === participant.secret
      );
      let hintText = "";
      if (validParticipant) {
        // get hint text to display
        hintText = story.storyParts.reduce((acc, part) => acc + part.text + " ", "");
        if (hintText.length > 200) hintText = hintText.substring(hintText.length - 100, hintText.length - 1);
      }

      this.setState({
        story,
        isLoading: false,
        hintText,
        validParticipant,
      });
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
    // TODO look for next participant to show their email and generate secret link
    const nextParticipant = { email: "dummy!" };
    // TODO consider end of story
    this.setState({
      nextLink: `www.tellzy.web.app/story/${storyId}/${nextParticipant.secret}`,
      storyLink: `www.tellzy.web.app/story/${storyId}`,
      submitSuccess: true,
      nextParticipant,
    });
  };

  render() {
    const {
      submitSuccess,
      validParticipant,
      story,
      isLoading,
      hintText,
      secret,
      nextParticipant,
      nextLink,
      storyLink,
    } = this.state;

    return (
      <div className="edit-story">
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
                <h1 className="h1-es-false text-center">{story.storyTitle}</h1>
                {!isEmpty(validParticipant) ? (
                  <>
                    {submitSuccess ? (
                      <LinkPage
                        nextLink={nextLink}
                        nextParticipant={nextParticipant}
                        storyLink={storyLink}
                      ></LinkPage>
                    ) : (
                      <>
                        {/* STAT STORY */}
                        {secret ? (
                          <Form className="form-es-false" onSubmit={this.handleSubmit}>
                            <Form.Group>
                              <Form.Label>Previously on "{story.storyTitle}"...</Form.Label>
                              <Form.Control
                                readOnly
                                as="textarea"
                                value={hintText}
                                rows="2"
                                name="hintText"
                              />
                            </Form.Group>
                            <Form.Group>
                              <Form.Label>Continue your Story</Form.Label>
                              <Form.Control
                                required
                                as="textarea"
                                placeholder="Continue the adventure..."
                                rows="10"
                                name="storyText"
                                onChange={this.handleChange.bind(this)}
                              />
                            </Form.Group>

                            <Button className="go-btn-cs-false" type="submit">
                              Submit
                            </Button>
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
                ) : (
                  <div className="d-flex justify-content-center">Sorry, this edit link is not valid</div>
                )}
              </>
            )}
          </Col>
          <Col sm={2}></Col>
        </Row>
      </div>
    );
  }
}
