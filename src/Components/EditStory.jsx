import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { getStoryRef, getStoryText, getStorySignature } from "../actions/io";
import LinkPage from "./LinkPage";
import { Link } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import { isEmpty } from "lodash";
import auth from "../actions/auth";
import { getStory, checkIsUserParticipant, checkIsUserSubmitted } from "../actions/io";
import { grantUserStoryEditAccess } from "../actions/functions";

export default class EditStory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      story: null,
      storyId: null,
      isUserParticipant: false,
      checkIsUserSubmitted: true,
    };
  }

  componentDidMount = async () => {
    auth.onAuthStateChanged((user) => {
      this.setState({ user });
    });

    const {
      match: { params },
    } = this.props;
    const storyId = params.storyId;
    this.setState({ storyId });
    const story = await getStory(storyId);
    // check iuser exists
    const isUserParticipant = checkIsUserParticipant(story, this.state.user.uid);
    const isUserSubmitted = checkIsUserSubmitted(story, this.state.user.uid);
    this.setState({ story, isUserParticipant, isUserSubmitted });
  };

  handleChange(event) {
    let fieldName = event.target.name;
    let fleldVal = event.target.value;
    this.setState({ ...this.state, [fieldName]: fleldVal });
  }

  handleEditRequest = async () => {
    const { uid, displayName } = this.state.user;
    const requestSucess = await grantUserStoryEditAccess(this.state.storyId, { uid, displayName });
    console.log(requestSucess);
    this.setState({ requestSucess });
  };

  render() {
    const {
      user,
      submitSuccess,
      isUserParticipant,
      isUserSubmitted,
      story,
      hintText,
      // nextParticipant,
    } = this.state;

    if (!user) return <div className="w-100 text-center my-5 py-5">Loading...</div>;
    if (!story) return <div className="w-100 text-center my-5 py-5">Story Loading...</div>;

    return (
      <div className="edit-story">
        <Row className="">
          <Col sm={2}></Col>

          <Col sm={8} className="h-100">
            <div className="paper-story">
              <h2>{story.title}</h2>

              {/* TODO display only hint */}
              <p>{story.description}</p>
              <br />
              <p className="signature ml-auto">
                {story.createdBy.displayName && story.createdBy.displayName}
              </p>
            </div>

            {isUserParticipant ? (
              <>
                {isUserSubmitted ? (
                  <div className="d-flex flex-column align-items-center">
                    You already submitted
                    <Button onClick={this.handleEditRequest}>Want again?</Button>
                  </div>
                ) : (
                  <Form className="create-form" onSubmit={this.handleSubmit}>
                    <Form.Group>
                      <Form.Label>Continue the story!</Form.Label>
                      <Form.Control
                        required
                        as="textarea"
                        placeholder="Continue the adventure..."
                        rows="10"
                        name="storyText"
                        onChange={this.handleChange.bind(this)}
                      />
                    </Form.Group>
                    <br />
                    <Button className="go-btn-cs-false" type="submit">
                      Submit
                    </Button>
                  </Form>
                )}
              </>
            ) : (
              <div className="d-flex flex-column align-items-center">
                You want to participate?
                <Button onClick={this.handleEditRequest}>Request Access</Button>
              </div>
            )}
          </Col>
          <Col sm={2}></Col>
        </Row>
        <Row className="my-4"></Row>
      </div>
    );
  }
}
