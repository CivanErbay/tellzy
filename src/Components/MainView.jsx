import React, { Component } from "react";
import { Col } from "react-bootstrap";
import { Row } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import StoryList from "./Reusable/StoryList";
import "../styling/mainview.css";

export default class MainView extends Component {
    render() {
        return (
            <Row className="first-part w-100 h-100 text-center">
                <Col md>
                    <Link to="/">
                        <Button className="btn-home">Home</Button>
                    </Link>
                </Col>
                <Col sm={7}>
                    <div className="list-wrap">
                        <h2>Active</h2>
                        <div>
                            <StoryList
                                heading="Active"
                                stories={[
                                    { title: "There Was a Cat!" },
                                    { title: "Loli alone at home" },
                                ]}
                            />
                        </div>
                    </div>
                    <div className="list-wrap">
                        <h2>Finished Storys</h2>
                        <div>
                            <StoryList
                                heading="Active"
                                stories={[
                                    { title: "There Was a Cat!" },
                                    { title: "Loli alone at home" },
                                ]}
                            />
                        </div>
                    </div>
                </Col>
                <Col md className="text-left">
                    <Link to="/story">
                        <Button>New Story</Button>
                    </Link>
                </Col>
            </Row>
        );
    }
}
