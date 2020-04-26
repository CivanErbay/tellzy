import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import db from "./../actions/io";
import LinkPage from "./LinkPage";
import { Link } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
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
      nextParticipant: null,
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

  getStory = async (storyId) => {
    let storyRef = await db
      .collection("stories")
      .doc(storyId)
      .get()
      .catch((error) => {
        console.log("Error getting document:", error);
      });

    if (storyRef && storyRef.exists) {
      const story = storyRef.data();
      // check that secret is valid among participants
      const validParticipant = story.participants.filter(
        (participant) => participant.secret && this.state.secret === participant.secret
      )[0];

      // make hint text
      let hintText = story.storyParts.map((part) => part.text).join(" "); // join all parts
      const hintTextArray = hintText.split(" "); // split for every word
      // let hintText = "";
      if (validParticipant) {
        // get hint text to display
        if (hintTextArray.length > 50)
          hintText = hintTextArray.slice(hintTextArray.length - 45, hintTextArray.length).join(" ");
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
  };

  handleChange(event) {
    let fieldName = event.target.name;
    let fleldVal = event.target.value;
    this.setState({ ...this.state, [fieldName]: fleldVal });
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    const { storyId, story, storyText, validParticipant } = this.state;
    let storyRef = db.collection("stories").doc(storyId);

    // add new story part
    const newStoryPart = {
      author: validParticipant.email,
      timestamp: new Date(),
      text: storyText,
    };
    story.storyParts.push(newStoryPart);

    // set this participant to submitted
    story.participants = story.participants.map((participant) => {
      if (participant.secret === validParticipant.secret)
        return {
          ...validParticipant,
          isSubmitted: true,
          submittedOn: new Date(),
        };
      else return participant;
    });

    await storyRef.set({ ...story }, { merge: true }).catch(function (error) {
      console.error("Error adding document: ", error);
      this.setState({ error: true });
      return;
    });

    // const nextParticipant = this.getNextParticipant();
    this.setState({
      submitSuccess: true,
      // nextParticipant,
    });
  };

  getNextParticipant() {
    const { story } = this.state;
    if (isEmpty(story)) return;

    let nextParticipant = null;
    let unsubmitted = story.participants.filter((participant) => !participant.isSubmitted);
    if (unsubmitted.length > 0) nextParticipant = unsubmitted[0];

    return nextParticipant;
  }

  render() {
    const {
      submitSuccess,
      validParticipant,
      story,
      storyId,
      isLoading,
      hintText,
      // nextParticipant,
    } = this.state;

    const nextParticipant = this.getNextParticipant();

    return (
      <div className="edit-story">
        <Row className="section">
          <Col sm={2} className="text-right">
            <Link to="/">
              <Button className="sm">Home</Button>
            </Link>
          </Col>
          <Col sm={8} className="h-100">
            {isLoading ? (
              <p>Loading...</p>
            ) : (
              <>
                {!isEmpty(validParticipant) ? (
                  <>
                    {validParticipant.isSubmitted ? (
                      <div className="d-flex flex-column align-items-center">
                        <h1 className="brand">Tellzy</h1>

                        <h1 className="h1-es-false text-center text-capitalize">{story.storyTitle}.</h1>
                        {nextParticipant && (
                          <div className="d-flex flex-column align-items-center">
                            <p className="text-center">
                              This link for this page was for <b>{validParticipant.email}</b> and is submitted
                            </p>
                          </div>
                        )}

                        <LinkPage
                          story={story}
                          storyId={storyId}
                          nextParticipant={nextParticipant}
                        ></LinkPage>
                      </div>
                    ) : (
                      <>
                        <h1 className="h1-es-false text-center text-capitalize">{story.storyTitle}.</h1>
                        {submitSuccess ? (
                          <>
                            <LinkPage
                              story={story}
                              storyId={storyId}
                              nextParticipant={nextParticipant}
                            ></LinkPage>
                          </>
                        ) : (
                          <>
                            <h3 className="text-center">
                              You are the{" "}
                              {story.participants.reduce((acc, curr) => (acc += curr.isSubmitted ? 1 : 0), 1)}
                              /{story.participants.length} author
                            </h3>

                            <Form className="form-es-false" onSubmit={this.handleSubmit}>
                              <Form.Group>
                                <Form.Label>
                                  Previously on{" "}
                                  <span className="text-capitalize">
                                    "{story.storyTitle}
                                    "...
                                  </span>
                                </Form.Label>
                                <Form.Control
                                  className="hint-text"
                                  readOnly
                                  as="textarea"
                                  value={hintText}
                                  name="hintText"
                                />
                              </Form.Group>
                              <Form.Group>
                                <Form.Label>
                                  <span className="highlight">{validParticipant.email}</span> can continue the
                                  story
                                </Form.Label>
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
                          </>
                        )}
                      </>
                    )}
                  </>
                ) : (
                  <div className="d-flex justify-content-center p-deadlink-true">
                    <h1 className="h1-es-false text-center text-capitalize">{story.storyTitle}.</h1>
                    Sorry, the edit link for this story is not valid.
                  </div>
                )}
              </>
            )}
          </Col>
          <Col sm={2}></Col>
        </Row>
        <Row className="my-4"></Row>
      </div>
    );
  }
}
