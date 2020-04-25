import React, { Component } from "react";
import { Col } from "react-bootstrap";
import { Row } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import auth from "../actions/auth";
import { getUserData } from "../actions/io";
import StoryList from "./Reusable/StoryList";
import ProgressInfo from "./Reusable/ProgressInfo";
import "../styling/mainview.css";

export default class MainView extends Component {
    state = {
        user: null,
        userData: null,
    };

    componentDidMount = () => {
        auth.onAuthStateChanged(async (user) => {
            if (user) {
                this.setState({ user });
                let userData = await getUserData(user.uid);
                this.setState({ userData });
            } else {
                this.setState({ user, userData: null });
            }
        });
    };

    render() {
        const { user, userData } = this.state;

        if (!user) return <div className="w-100 text-center">Loading...</div>;

        return (
            <Row className="first-part w-100 h-100 text-center">
                <Col md>
                    <Link to="/">
                        <Button className="btn-home">Home</Button>
                    </Link>
                </Col>
                <Col sm={7}>
                    <ProgressInfo />
                    <div className="list-wrap">
                        {/* <h2>Active Storys</h2> */}

                        <StoryList
                            heading="Active Stories"
                            stories={[
                                { title: "There Was a Cat!" },
                                { title: "Loli alone at home" },
                            ]}
                        />
                    </div>
                    <div className="list-wrap">
                        {/* <h2>Finished Storys</h2> */}

                        <StoryList
                            heading="Finished Stories"
                            stories={[
                                { title: "There Was a Cat!" },
                                { title: "Loli alone at home" },
                            ]}
                        />
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
