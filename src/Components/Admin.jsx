import React, { Component } from "react";
import { getStory } from "../actions/io";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { signIn, signOut } from "../actions/auth";
import { auth } from "../config/firebaseConfig";
import { Container, Row, Col } from "react-bootstrap";

export default class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedStory: null,
      user: null,
      credentials: {
        email: "",
        password: "",
      },
    };
  }

  componentDidMount = () => {
    auth.onAuthStateChanged((userAuth) => {
      this.setState({ user: userAuth });
    });
  };

  async getStory(storyId) {
    let storyRef = getStory(storyId);
  }

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
    const { selectedStory, user } = this.state;

    return (
      <div className="admin my-5">
        <Row className="w-100">
          <Col></Col>
          <Col md={8}>
            <div className="d-flex flex-column align-items-center">
              {user ? (
                <>
                  <h2> Admin page </h2>
                  <Row className="w-100">
                    <Col md={4} className="d-flex flex-column align-items-center">
                      <div
                        className="stories-list"
                        style={{ width: "100%", height: "100%", backgroundColor: "blue" }}
                      >
                        <div
                          className="filter mx-auto"
                          style={{ width: "80%", height: "100px", backgroundColor: "orange" }}
                        >
                          Filter settings
                        </div>
                        <h4>Stories List</h4>
                        <ul className="p-5 mx-auto">
                          <li> Story 1</li>
                          <li> Story 2</li>
                          <li> Story 3</li>
                          <li> Story 4</li>
                        </ul>
                      </div>
                    </Col>
                    <Col md={8} className="d-flex flex-column align-items-center">
                      <div
                        className="stats"
                        style={{ width: "100%", height: "200px", backgroundColor: "blue" }}
                      >
                        Stats
                        <div
                          className="participants"
                          style={{ width: "100%", height: "25%", backgroundColor: "orange" }}
                        >
                          Participants
                        </div>
                        <div
                          className="actions mt-auto"
                          style={{ width: "80%", height: "25%", backgroundColor: "pink" }}
                        >
                          Actions
                        </div>
                      </div>
                      <div className="paper-story">
                        <h2>My story title!</h2>
                        <p>bla bla bla... dsaufbifb df sd fs df sd f sd fs dgf sd g sdg sd sdgsdgsdgsd gs</p>
                      </div>
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
