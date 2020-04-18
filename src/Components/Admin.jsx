import React, { Component } from "react";
import { getStoryRef, queryAllStories, getStoryText, getStorySignature } from "../actions/io";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { signIn, signOut } from "../actions/auth";
import { isEmpty } from "lodash";
import { auth } from "../config/firebaseConfig";
import { Row, Col } from "react-bootstrap";
import ListGroup from "react-bootstrap/ListGroup";
import "../styling/admin.css";

export default class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedStoryId: "",
      selectedStory: {},
      querySrotyIds: [],
      user: {},
      credentials: {
        email: "",
        password: "",
      },
    };
  }

  componentDidMount = async () => {
    auth.onAuthStateChanged((userAuth) => {
      this.setState({ user: userAuth });
    });

    let querySrotyIds = await queryAllStories();
    this.setState({ querySrotyIds });
  };

  selectStory = async (selectedStoryId) => {
    let storyRef = await getStoryRef(selectedStoryId);
    if (storyRef.exists) {
      let selectedStory = storyRef.data();
      this.setState({ selectedStoryId, selectedStory });
    }
  };

  handleChange(event) {
    let fieldName = event.target.name;
    let fleldVal = event.target.value;
    this.setState({ credentials: { ...this.state.credentials, [fieldName]: fleldVal } });
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    signIn(this.state.credentials);
  };

  render() {
    const { selectedStoryId, selectedStory, user, querySrotyIds } = this.state;

    return (
      <div className="my-5">
        <Row className="w-100">
          <Col></Col>
          <Col md={8}>
            <div className="d-flex flex-column align-items-center">
              {user ? (
                <>
                  <div className="d-flex justify-content-center w-100">
                    <h2> Admin page </h2>
                    <Button onClick={signOut} className="ml-auto h-50">
                      Log Out
                    </Button>
                  </div>
                  <Row className="admin w-100">
                    <Col md={3} className="d-flex flex-column align-items-center">
                      <div className="w-100" style={{ backgroundColor: "blue" }}>
                        <div
                          className="filter mx-auto"
                          style={{ width: "80%", height: "80px", backgroundColor: "orange" }}
                        >
                          <h3>Filter settings</h3>
                        </div>
                        <h3>Stories List</h3>
                        <ListGroup className="stories-list">
                          {querySrotyIds &&
                            querySrotyIds.map((storyId) => (
                              <ListGroup.Item
                                className="mx-2"
                                action
                                active={storyId === selectedStoryId}
                                key={storyId}
                                onClick={() => this.selectStory(storyId)}
                              >
                                {storyId}
                              </ListGroup.Item>
                            ))}
                        </ListGroup>
                      </div>
                    </Col>
                    <Col className="d-flex flex-column align-items-center px-4">
                      {!isEmpty(selectedStory) && (
                        <>
                          <div className="stats">
                            <h3 className="text-center">Stats</h3>
                            <div
                              className="participants"
                              // style={{ width: "100%", height: "25%", backgroundColor: "orange" }}
                            >
                              <h4>Participants</h4>
                              <ListGroup horizontal>
                                {selectedStory.participants.map((participant) => (
                                  <ListGroup.Item
                                    key={participant.secret}
                                    className="d-flex flex-column align-items-center"
                                  >
                                    <p>{participant.email}</p>
                                    <p>
                                      {participant.submittedOn
                                        ? new Date(participant.submittedOn.seconds).toString()
                                        : " - "}
                                    </p>
                                    {/* {Object.keys(participant).map((key) => (
                                      <span>
                                        {key}: {participant[key]}
                                      </span>
                                    ))} */}
                                  </ListGroup.Item>
                                ))}
                              </ListGroup>
                            </div>
                            <div
                              className="actions mt-auto"
                              style={{ width: "80%", height: "25%", backgroundColor: "pink" }}
                            >
                              Actions
                            </div>
                          </div>
                          <div className="paper-story">
                            <h2>{selectedStory.storyTitle}</h2>
                            <p>{getStoryText(selectedStory)}</p>
                            <p className="signature">{getStorySignature(selectedStory)}</p>
                          </div>
                        </>
                      )}
                    </Col>
                  </Row>
                </>
              ) : (
                <>
                  <h1 className="h1 my-4">Tellzy</h1>
                  <Form className="" onSubmit={this.handleSubmit}>
                    <Form.Group>
                      <Form.Label>Admin E-Mail</Form.Label>
                      <Form.Control
                        required
                        type="email"
                        placeholder="name@example.com"
                        name="email"
                        onChange={this.handleChange.bind(this)}
                      />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        required
                        type="password"
                        name="password"
                        onChange={this.handleChange.bind(this)}
                      />
                    </Form.Group>

                    <Button className="" type="submit">
                      Log In
                    </Button>
                  </Form>
                </>
              )}
            </div>
          </Col>
          <Col></Col>
        </Row>
      </div>
    );
  }
}
