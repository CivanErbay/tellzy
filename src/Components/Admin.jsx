import React, { Component } from "react";
import {
    getStoryRef,
    queryAllStories,
    getStoryText,
    getStorySignature,
} from "../actions/io";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { signIn, signOut } from "../actions/auth";
import { isEmpty } from "lodash";
import auth from "../actions/auth";
import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import ListGroup from "react-bootstrap/ListGroup";
import Modal from "react-bootstrap/Modal";
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
            showDeleteModal: false,
        };
    }

    componentDidMount = async () => {
        auth.onAuthStateChanged((userAuth) => {
            this.setState({ user: userAuth });
        });

        let querySrotyIds = await queryAllStories();
        this.setState({ querySrotyIds });
        this.selectStory(querySrotyIds[0]);
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
        this.setState({
            credentials: { ...this.state.credentials, [fieldName]: fleldVal },
        });
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        signIn(this.state.credentials);
    };

    handleClose = () => {
        this.setState({ showDeleteModal: false });
    };

    handleShow = () => {
        this.setState({ showDeleteModal: true });
    };

    handleDelete = () => {
        // TODO
    };

    render() {
        const {
            selectedStoryId,
            selectedStory,
            user,
            querySrotyIds,
            showDeleteModal,
        } = this.state;

        return (
            <div className="my-5">
                <Row className="w-100">
                    <Col className="text-right">
                        <Link to="/">
                            <Button className="btn-home sm">Home</Button>
                        </Link>
                    </Col>
                    <Col md={8}>
                        <div className="d-flex flex-column align-items-center">
                            {user ? (
                                <>
                                    <div className="d-flex justify-content-center w-100">
                                        <h2> Admin page </h2>
                                    </div>
                                    <Row className="admin w-100">
                                        <Col
                                            md={3}
                                            className="d-flex flex-column align-items-center p-3"
                                        >
                                            <div
                                                className="w-100"
                                                style={{
                                                    backgroundColor: "blue",
                                                }}
                                            >
                                                <div
                                                    className="filter mx-auto"
                                                    style={{
                                                        width: "80%",
                                                        height: "80px",
                                                        backgroundColor:
                                                            "orange",
                                                    }}
                                                >
                                                    <h3>Filter settings</h3>
                                                </div>
                                                <h3>Stories List</h3>
                                                <ListGroup className="stories-list">
                                                    {querySrotyIds &&
                                                        querySrotyIds.map(
                                                            (storyId) => (
                                                                <ListGroup.Item
                                                                    className="mx-2"
                                                                    action
                                                                    active={
                                                                        storyId ===
                                                                        selectedStoryId
                                                                    }
                                                                    key={
                                                                        storyId
                                                                    }
                                                                    onClick={() =>
                                                                        this.selectStory(
                                                                            storyId
                                                                        )
                                                                    }
                                                                >
                                                                    {storyId}
                                                                </ListGroup.Item>
                                                            )
                                                        )}
                                                </ListGroup>
                                            </div>
                                        </Col>
                                        <Col className="d-flex flex-column align-items-center px-4">
                                            {!isEmpty(selectedStory) && (
                                                <>
                                                    <div className="stats">
                                                        <h3 className="text-center">
                                                            Stats
                                                        </h3>
                                                        <div className="participants">
                                                            <h4>
                                                                Participants
                                                            </h4>
                                                            <ListGroup
                                                                horizontal
                                                            >
                                                                {selectedStory.participants.map(
                                                                    (
                                                                        participant
                                                                    ) => (
                                                                        <ListGroup.Item
                                                                            key={
                                                                                participant.secret
                                                                            }
                                                                            className="d-flex flex-column align-items-center"
                                                                        >
                                                                            <p>
                                                                                {
                                                                                    participant.email
                                                                                }
                                                                            </p>
                                                                            <p>
                                                                                {participant.submittedOn
                                                                                    ? new Date(
                                                                                          participant.submittedOn.seconds
                                                                                      ).toString()
                                                                                    : " - "}
                                                                            </p>
                                                                            {/* {Object.keys(participant).map((key) => (
                                      <span>
                                        {key}: {participant[key]}
                                      </span>
                                    ))} */}
                                                                        </ListGroup.Item>
                                                                    )
                                                                )}
                                                            </ListGroup>
                                                        </div>

                                                        <h4>Actions</h4>
                                                        <div
                                                            className="actions mt-auto"
                                                            style={{
                                                                width: "80%",
                                                                height: "25%",
                                                            }}
                                                        >
                                                            <Button
                                                                variant="danger"
                                                                onClick={
                                                                    this
                                                                        .handleShow
                                                                }
                                                            >
                                                                Delete
                                                            </Button>
                                                            <Modal
                                                                show={
                                                                    showDeleteModal
                                                                }
                                                                onHide={
                                                                    this
                                                                        .handleClose
                                                                }
                                                            >
                                                                <Modal.Header
                                                                    closeButton
                                                                >
                                                                    <Modal.Title>
                                                                        Sure you
                                                                        want to
                                                                        delete?
                                                                    </Modal.Title>
                                                                </Modal.Header>
                                                                {/* <Modal.Body></Modal.Body> */}
                                                                <Modal.Footer>
                                                                    <Button
                                                                        variant="secondary"
                                                                        onClick={
                                                                            this
                                                                                .handleDelete
                                                                        }
                                                                    >
                                                                        Delete
                                                                    </Button>
                                                                </Modal.Footer>
                                                            </Modal>
                                                        </div>
                                                    </div>
                                                    <div className="paper-story">
                                                        <h2>
                                                            {
                                                                selectedStory.storyTitle
                                                            }
                                                        </h2>
                                                        <p>
                                                            {getStoryText(
                                                                selectedStory
                                                            )}
                                                        </p>
                                                        <p className="signature">
                                                            {getStorySignature(
                                                                selectedStory
                                                            )}
                                                        </p>
                                                    </div>
                                                </>
                                            )}
                                        </Col>
                                    </Row>
                                </>
                            ) : (
                                <>
                                    <h1 className="h1 my-4">Tellzy</h1>
                                    <Form
                                        className=""
                                        onSubmit={this.handleSubmit}
                                    >
                                        <Form.Group>
                                            <Form.Label>
                                                Admin E-Mail
                                            </Form.Label>
                                            <Form.Control
                                                required
                                                type="email"
                                                placeholder="name@example.com"
                                                name="email"
                                                onChange={this.handleChange.bind(
                                                    this
                                                )}
                                            />
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label>Password</Form.Label>
                                            <Form.Control
                                                required
                                                type="password"
                                                name="password"
                                                onChange={this.handleChange.bind(
                                                    this
                                                )}
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
                    <Col>
                        <Button onClick={signOut}>Log Out</Button>
                    </Col>
                </Row>
            </div>
        );
    }
}
