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
      credentials: {
        email: "",
        password: "",
      },
    };
  }

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
    const user = auth.currentUser;

    return (
      <Container>
        <Row className="w-100">
          <Col md={3}></Col>
          <Col md={6}>
            <div className="d-flex flex-column align-items-center">
              {user ? (
                <div> Hey </div>
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
          <Col md={3}></Col>
        </Row>
      </Container>
    );
  }
}
